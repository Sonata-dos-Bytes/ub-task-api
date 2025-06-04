import { TaskDeadlineInfo } from '../types/enum';
import { getTaskDeadlineInfo, parsePortugueseDate } from '@utils/formattedDate';
import { Page } from 'puppeteer';

export async function extractCommonFields(page: Page): Promise<{ title: string, matter: string, matterUrl: string }> {
    const title = await page.$eval(
        '.page-context-header .page-header-headings h1.h2.ccnMdlHeading',
        (el: HTMLElement) => (el as HTMLElement).textContent?.trim() || 'Tarefa sem título'
    );

    const matter = await page.$eval(
        'h4.breadcrumb_title',
        (el: HTMLElement) => (el as HTMLElement).textContent?.trim() || 'Tarefa sem máteria'
    );

    const matterUrl = await page.$eval(
        'li.breadcrumb-item:nth-child(3) a',
        (a: HTMLAnchorElement) => a.href
    );

    return { title, matter, matterUrl };
}

export async function extractTaskFields(page: Page): Promise<{rawStart: string, rawEnd: string, dateStartObj: Date | null, dateEndObj: Date | null, dateDetails: TaskDeadlineInfo | null, dateDetailsInPortuguese: string, taskDetails: string}> {
    const [rawStart, rawEnd] = await page.$$eval(
        '.description-inner > div',
        divs => divs.map(div => div.textContent?.trim() || '')
    );

    const taskDetails = await page.$eval(
        '.box.py-3.generalbox.boxaligncenter',
        el => (el as HTMLElement).outerHTML
    );

    const submissionSummaryTable = await page.$$eval(
        '.cell.c1.lastcol',
        els => els.map(el => (el as HTMLElement).textContent?.trim() || '')
    );

    const isCompleted = !submissionSummaryTable[0].includes('Nenhum envio foi feito ainda');

    const dateDetailsInPortuguese = submissionSummaryTable[2];

    const dateStartObj = parsePortugueseDate(rawStart);
    const dateEndObj = parsePortugueseDate(rawEnd);

    const dateDetails = dateEndObj ? getTaskDeadlineInfo(dateEndObj, isCompleted) : null;

    return {
        rawStart,
        rawEnd,
        dateStartObj,
        dateEndObj,
        dateDetails,
        dateDetailsInPortuguese,
        taskDetails
    };
}

export async function extractQuestionnaireFields(page: Page): Promise<{rawEnd: string, dateEndObj: Date | null, dateDetails: TaskDeadlineInfo | null, taskDetails: string}> {
    const [rawEnd] = await page.$$eval(
        '.description-inner > div',
        divs => divs.map(div => div.textContent?.trim() || '')
    );

    const taskDetails = await page.$eval(
        '.activity-description',
        el => (el as HTMLElement).outerHTML
    );

    const submission = await page.$('.lastrow');
    const isCompleted = submission !== null;

    const dateEndObj = parsePortugueseDate(rawEnd);
    const dateDetails = dateEndObj ? getTaskDeadlineInfo(dateEndObj, isCompleted) : null;

    return {
        rawEnd,
        dateEndObj,
        dateDetails,
        taskDetails
    }
}