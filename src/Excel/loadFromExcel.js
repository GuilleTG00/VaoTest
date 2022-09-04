import { read, utils } from "xlsx";

const readExcelFile = async () => {
    const path = './Excel/inputvalues.xlsx';
    // We take the xlsx file into a arrayBuffer, so the xlsx's read method can return the workbook.
    const workBook = await fetch(path)
        .then(resp => resp.arrayBuffer())
        .then(buffer => read(buffer))
        .catch(err => console.error(err))
        console.log("testing", parseWorkBook(workBook))
    return parseWorkBook(workBook);
}

const parseWorkBook = (excelElements) => {
    //Obtain the sheetNames of the XLSX file
    const sheetNames = excelElements.SheetNames;
    // Since we only have one sheet, we parse the sheet to a JSON File.
    return utils.sheet_to_json(excelElements.Sheets[sheetNames[0]]);
}

export default readExcelFile;