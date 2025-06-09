import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer';
import { CustomError } from '@errors/error_types/CustomError';
import { BaseHandler } from './BaseHandler';
import { PuppeteerResult } from '../types/puppeteer';
import { logger } from '@config/logger';
import { UBMatter, UBProfile, UBTask } from '../types/eadUB';
import { getTaskDeadlineInfo, parsePortugueseDate } from '@utils/formattedDate';
import { extractCommonFields, extractQuestionnaireFields, extractTaskFields } from '@services/eadUbTaskService';
import { url } from 'inspector';
export class EADUbHandler extends BaseHandler {
    private urls = {
        login: 'https://ead.unibalsas.edu.br/login/index.php',
        profile: 'https://ead.unibalsas.edu.br/user/profile.php',
        tasks: 'https://ead.unibalsas.edu.br/calendar/view.php?view=upcoming',
        matters: 'https://ead.unibalsas.edu.br/my/',
    }

    private async webLogin(login: string, password: string): Promise<PuppeteerResult> {
        logger.info({ login }, 'Iniciando login no EAD UB');
        const browser: Browser = await this['launchBrowser']();
        let page: Page | undefined;

        try {
            page = await browser.newPage();
            await page.setUserAgent(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            );
            await page.goto(this.urls.login, { waitUntil: 'networkidle2', timeout: 15000 });

            await page.type('input[name="username"]', login);
            await page.type('input[name="password"]', password);

            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }),
                page.click('button[type="submit"]'),
            ]);

            if (page.url().includes('login')) {
                logger.warn('Credenciais inválidas, fechando browser');
                throw new CustomError('Unauthorized', ['Invalid login credentials'], 401);
            }

            logger.info('Login realizado com sucesso', { url: page.url() });
            return { browser, page };
        } catch (err) {
            logger.error('Erro no fluxo de login', err);
            throw err;
        } finally {
            if (!page || page.url().includes('login')) {
                await browser.close();
            }
        }
    }


    public async getProfile(login: string, password: string): Promise<UBProfile> {
        const { browser, page } = await this.webLogin(login, password);
        try {
            logger.info('Navegando para perfil do usuário', { url: this.urls.profile });
            await page.goto(this.urls.profile, { waitUntil: 'domcontentloaded' });

            const details = await page.$$eval(
                '.selected_filter_widget i',
                els => els.map(el => el.textContent?.trim() || '')
            );

            const [first, second, ...rest] = details;
            const name = `${first} ${second}`;
            const initials = [first, second].length >= 2
                ? first[0] + second[0]
                : name.slice(0, 2);

            const imgSrc = await page.$eval(
                '.page-header-image img, .instructor_thumb img',
                (img: HTMLImageElement) => img.src
            );

            const imgResponse = await page.goto(imgSrc, {
                waitUntil: 'networkidle2',
                timeout: 15000
            });
            if (!imgResponse || !imgResponse.ok()) {
                throw new CustomError('ImageFetchError', ['Não foi possível baixar a imagem']);
            }

            const buffer = await imgResponse.buffer();
            const contentType = imgResponse.headers()['content-type'] || 'image/png';
            const base64 = buffer.toString('base64');
            const dataUri = `data:${contentType};base64,${base64}`;

            const data = {
                name,
                email: details[5] || '',
                language: details[2] || '',
                userInitials: initials.toUpperCase(),
                userPicture: dataUri,
            };

            logger.info({ data }, 'Dados de perfil formatados');
            return data;
        } catch (err) {
            logger.error({ err }, 'Erro ao buscar perfil');
            throw new CustomError('Profile fetch failed', ['Unable to parse profile data']);
        } finally {
            await browser.close();
            logger.info('Browser fechado após busca de perfil');
        }
    }

    public async getTasks(login: string, password: string): Promise<UBTask[]> {
        const { browser, page } = await this.webLogin(login, password);
        try {
            logger.info('Navegando para tarefas do usuário', { url: this.urls.tasks });
            await page.goto(this.urls.tasks, { waitUntil: 'domcontentloaded' });

            const tasksRef = await page.$$eval('.calendarwrapper a.btn.dbxshad.btn-sm.btn-thm.circle.white', els => {
                return (els as HTMLAnchorElement[]).map(el => el.href);
            });

            const tasks: UBTask[] = [];

            for (const [index, taskUrl] of tasksRef.entries()) {
                logger.info({ url: taskUrl }, `Navegando para tarefa ${index + 1}`);

                await page.goto(taskUrl, { waitUntil: 'domcontentloaded' });

                const type = await page.$eval(
                    '.text-muted.text-uppercase.small.line-height-3',
                    el => (el as HTMLElement).textContent?.trim() || 'Tarefa sem título'
                );

                const { title, matter, matterUrl } = await extractCommonFields(page);

                if (type === 'Tarefa') {
                    const { rawStart, rawEnd, dateStartObj, dateEndObj, dateDetails, dateDetailsInPortuguese, taskDetails } = await extractTaskFields(page);

                    tasks.push({
                        title,
                        matter,
                        url: taskUrl,
                        matterUrl,
                        rawStart,
                        dateStart: dateStartObj,
                        rawEnd,
                        dateEnd: dateEndObj || null,
                        daysLeft: dateDetails?.daysLeft || null,
                        status: dateDetails?.status || null,
                        dateDetailsInPortuguese: dateDetailsInPortuguese,
                        taskDetails,
                    });
                } else if (type === 'Questionário') {
                    const { rawEnd, dateEndObj, dateDetails, taskDetails } = await extractQuestionnaireFields(page);

                    tasks.push({
                        title,
                        matter,
                        url: taskUrl,
                        matterUrl,
                        rawStart: '', 
                        dateStart: null, 
                        rawEnd,
                        dateEnd: dateEndObj,
                        daysLeft: dateDetails?.daysLeft || null,
                        status: dateDetails?.status || null,
                        dateDetailsInPortuguese: '',
                        taskDetails,
                    });
                }
            }

            logger.info('Tarefas obtidas com sucesso');
            return tasks;
        } catch (err) {
            logger.error({ err }, 'Erro ao buscar tarefas');
            throw new CustomError('Tasks fetch failed', ['Unable to parse tasks data']);
        } finally {
            await browser.close();
            logger.info('Browser fechado após busca de tarefas');
        }
    }

    public async getMatters(login: string, password: string): Promise<UBMatter[]> {
        const { browser, page } = await this.webLogin(login, password);
        try {
            logger.info('Navegando para as matérias do usuário', { url: this.urls.matters });
            await page.goto(this.urls.matters, { waitUntil: 'domcontentloaded' });
            await page.waitForSelector('.mc_content_list', { timeout: 10000 });

            const mattersRef = await page.$$eval('.mcc_view', els => {
                return (els as HTMLAnchorElement[]).map(el => el.href);
            });

            const matters: UBMatter[] = [];

            for (const [index, matterUrl] of mattersRef.entries()) {
                logger.info({ url: matterUrl }, `Navegando para matéria ${index + 1}`);
                await page.goto(matterUrl, { waitUntil: 'domcontentloaded' });

                const title = await page.$eval('.breadcrumb_title', el => (el as HTMLElement).textContent?.trim() || 'Matéria sem título');

                matters.push({
                    title,
                    url: matterUrl,
                });
            }

            logger.info('Matérias obtidas com sucesso');
            return matters;
        } catch (err) {
            logger.error({ err }, 'Erro ao buscar matérias');
            throw new CustomError('Matters fetch failed', ['Unable to parse matters data']);
        } finally {
            await browser.close();
            logger.info('Browser fechado após busca de matérias');
        }
    }
}

