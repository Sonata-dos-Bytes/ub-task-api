import { LaunchOptions } from 'puppeteer';
import chromium from '@sparticuz/chromium';

export async function getPuppeteerOptions(): Promise<LaunchOptions> {
  return {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  };
}
