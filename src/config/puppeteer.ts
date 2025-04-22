import puppeteer, { LaunchOptions } from 'puppeteer';
import chromium from '@sparticuz/chromium';

export async function getPuppeteerOptions(): Promise<LaunchOptions> {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    return {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };
  } else {
    return {
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1280, height: 800 },
    };
  }
}
