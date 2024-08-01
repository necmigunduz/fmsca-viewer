import * as XLSX from 'xlsx';

export const loadDataFromExcel = async (file, startRow, endRow, filters) => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  const filteredData = jsonData.filter(row => {
    return Object.keys(filters).every(key => {
      return row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  const paginatedData = filteredData.slice(startRow, startRow + endRow);

  return { paginatedData, totalRows: filteredData.length };
};
