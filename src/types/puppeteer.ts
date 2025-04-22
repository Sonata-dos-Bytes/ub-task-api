import { Browser, Page } from 'puppeteer';

export interface PuppeteerResult {
  browser: Browser;
  page: Page;
}
