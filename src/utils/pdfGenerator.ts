import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';

export const generatePDF = async (
  templateName: string,
  data: Record<string, unknown>
): Promise<Buffer> => {
  const templatePath = path.join(__dirname, '../templates/pdf', `${templateName}.hbs`);
  const templateContent = await fs.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(templateContent);
  const html = template(data);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, {
  waitUntil: 'domcontentloaded',
});
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
  });

  await browser.close();
  return Buffer.from(pdf);
};