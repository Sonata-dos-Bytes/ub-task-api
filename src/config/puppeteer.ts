import puppeteer, { LaunchOptions } from 'puppeteer';
import chromium from '@sparticuz/chromium';
import { logger } from './logger.js';

export async function getPuppeteerOptions(): Promise<LaunchOptions> {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    logger.info('Running in production mode, using Chromium');

    return {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };
  } else {
    logger.info('Running in development mode, using default Puppeteer');

    return {
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1280, height: 800 },
    };
  }
}
