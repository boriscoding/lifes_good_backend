import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';

export const buildWhatsAppMessage = async (
  templateName: string,
  variables: Record<string, string>
): Promise<string> => {
  const templatePath = path.join(__dirname, '../templates/whatsapp', `${templateName}.hbs`);
  
  try {
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = handlebars.compile(templateContent);
    return template(variables);
  } catch {
    // Fallback si template absent
    return Object.entries(variables)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
};