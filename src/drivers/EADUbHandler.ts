import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer';
import { CustomError } from '@errors/error_types/CustomError';
import { BaseHandler } from './BaseHandler';
import { PuppeteerResult } from '../types/puppeteer';
import { logger } from '@config/logger';
import { UBProfile } from '../types/eadUb';
export class EADUbHandler extends BaseHandler {
    private urls = {
        login: 'https://ead.unibalsas.edu.br/login/index.php',
        profile: 'https://ead.unibalsas.edu.br/user/profile.php',
        tasks: 'https://ead.unibalsas.edu.br/calendar/view.php?view=upcoming',
    }

    private async webLogin(login: string, password: string): Promise<PuppeteerResult> {
        logger.info({ login }, 'Iniciando login no EAD UB');

        const browser: Browser = await this['launchBrowser']();
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        );
        await page.goto(this.urls.login, { waitUntil: 'networkidle2', timeout: 3000 });

        await page.type('input[name="username"]', login);
        await page.type('input[name="password"]', password);
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 3000 });

        if (page.url().includes('login')) {
            logger.warn('Credenciais inválidas, fechando browser');
            await browser.close();
            throw new CustomError('Unauthorized', 'Invalid login credentials', 401);
        }

        logger.info('Login realizado com sucesso', { url: page.url() });
        return { browser, page };
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

            const imgSrc = await page.$eval(
                '.page-header-image img, .instructor_thumb img',
                (img: HTMLImageElement) => img.src
            );

            const [first, second, ...rest] = details;
            const name = `${first} ${second}`;
            const initials = [first, second].length >= 2
                ? first[0] + second[0]
                : name.slice(0, 2);

            const data = {
                name,
                email: details[5] || '',
                language: details[2] || '',
                user_initials: initials.toUpperCase(),
                user_picture: imgSrc,
            };

            logger.info({ data }, 'Dados de perfil formatados');
            return data;
        } catch (err) {
            logger.error({ err }, 'Erro ao buscar perfil');
            throw new CustomError('Profile fetch failed', 'Unable to parse profile data');
        } finally {
            await browser.close();
            logger.info('Browser fechado após busca de perfil');
        }
    }
}

