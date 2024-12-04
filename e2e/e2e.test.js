import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(20000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: true, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('test for input valid card', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.cardsform');
    const form = await page.$('.form');
    const input = await form.$('.input');
    const submit = await form.$('.btn');
    await input.type('2201382000000039');
    await submit.click();
    await page.waitForSelector('.cardsform .result.success');
  });

  test('test for input not valid card', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.cardsform');
    const form = await page.$('.form');
    const input = await form.$('.input');
    const submit = await form.$('.btn');
    await input.type('2201382000000038');
    await submit.click();
    await page.waitForSelector('.cardsform .result.error');
  });
});
