import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const generateExcel = (
  supplyEquipments: Array<Record<string, any>>,
  returnedEquipments: Array<Record<string, any>>,
  goodEquipments: Array<Record<string, any>>,
  misplacedEquipments: Array<Record<string, any>>,
  damagedEquipments: Array<Record<string, any>>,
) => {
  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();

  createSupplyEquipments(workbook, XLSX, supplyEquipments);
  createReturnedEquipments(workbook, XLSX, returnedEquipments);
  createGoodEquipments(workbook, XLSX, goodEquipments);
  createMisplacedEquipments(workbook, XLSX, misplacedEquipments);
  createDamagedEquipments(workbook, XLSX, damagedEquipments);

  // Convert the workbook to a binary Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Create a Blob from the buffer
  const excelBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Save the Blob as a file
  saveAs(excelBlob, "GYMTORY_REPORT.xlsx");
};

const createSupplyEquipments = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  supplyEquipments: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(supplyEquipments);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Supply Equipments");
};

const createReturnedEquipments = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  returnedEquipments: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(returnedEquipments);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Returned Equipments");
};

const createGoodEquipments = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  goodEquipments: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(goodEquipments);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Good Equipments");
};

const createMisplacedEquipments = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  misplacedEquipments: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(misplacedEquipments);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Misplaced Equipments");
};

const createDamagedEquipments = (
  workbook: XLSX.WorkBook,
  XLSX: any,
  damagedEquipments: Array<Record<string, any>>
) => {
  const worksheet = XLSX.utils.json_to_sheet(damagedEquipments);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Damaged Equipments");
};
