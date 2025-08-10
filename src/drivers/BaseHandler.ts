import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer';
import { getPuppeteerOptions } from '../config/puppeteer.js'; 
import { CustomError } from '../errors/error_types/CustomError.js'; 

export class BaseHandler {
  private async launchBrowser(): Promise<Browser> {
    try {
      const options: LaunchOptions = await getPuppeteerOptions();
      return await puppeteer.launch(options);
    } catch (err) {
      throw new CustomError('Browser launch failed', ['Unable to start headless browser']);
    }
  }
}
