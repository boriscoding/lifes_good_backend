import * as ExcelJS from 'exceljs';

export const generateExcel = async <T extends Record<string, unknown>>(
  sheetName: string,
  columns: { header: string; key: string; width?: number }[],
  data: T[]
): Promise<Buffer> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = columns;
  worksheet.addRows(data);

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
};