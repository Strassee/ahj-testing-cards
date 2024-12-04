import puppeteer from 'puppeteer';

jest.setTimeout(15000); // default puppeteer timeout

describe('Page start', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('test for input valid card', async () => {
    await page.goto('http://localhost:8080');
    await page.waitForSelector('.cardsform');
    const form = await page.$('.form');
    const input = await form.$('.input');
    const submit = await form.$('.btn');
    await input.type('2201382000000039');
    await submit.click();
    await page.waitForSelector('.cardsform .result.success');
  });

  test('test for input not valid card', async () => {
    await page.goto('http://localhost:8080');
    await page.waitForSelector('.cardsform');
    const form = await page.$('.form');
    const input = await form.$('.input');
    const submit = await form.$('.btn');
    await input.type('2201382000000038');
    await submit.click();
    await page.waitForSelector('.cardsform .result.error');
  });

  afterAll(async () => {
    await browser.close();
  });
});