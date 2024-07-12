import { DataRow } from "../shared/types";
import { Dispatch, SetStateAction } from "react";

export const handleAddRows = (
  rows: DataRow[],
  setRows: Dispatch<SetStateAction<DataRow[]>>
) => {
  const newRow: DataRow = {
    id: rows.length + 1,
    logo: "",
    country: "",
    isEditing: true,
    isNew: true,
  };
  setRows((prevRows) => [...prevRows, newRow]);
};

export const handleAddRow = (
  id: number,
  rows: DataRow[],
  setRows: Dispatch<SetStateAction<DataRow[]>>
) => {
  const newRow: DataRow = {
    id: rows.length + 1,
    logo: "",
    country: "",
    isEditing: true,
    isNew: true,
  };

  const rowIndex = rows.findIndex((row) => row.id === id);
  const newRows = [...rows];
  newRows.splice(rowIndex + 1, 0, newRow);
  setRows(newRows);
};

export const handleDeleteRow = (
  id: number,
  rows: DataRow[],
  setRows: Dispatch<SetStateAction<DataRow[]>>,
  setModifiedRows: Dispatch<SetStateAction<number[]>>,
  setOriginalData: Dispatch<SetStateAction<DataRow[]>>
) => {
  setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  setModifiedRows((prevModifiedRows) =>
    prevModifiedRows.filter((rowId) => rowId !== id)
  );
  setOriginalData((prevData) => prevData.filter((data) => data.id !== id));
};

export const handleEditRow = (
  id: number,
  rows: DataRow[],
  setRows: Dispatch<SetStateAction<DataRow[]>>,
  setOriginalData: Dispatch<SetStateAction<DataRow[]>>
) => {
  const originalRow = rows.find((row) => row.id === id);
  if (originalRow) {
    setOriginalData((prevData) => [
      ...prevData,
      { ...originalRow, isEditing: true },
    ]);
  }
  setRows((prevRows) =>
    prevRows.map((row) => (row.id === id ? { ...row, isEditing: true } : row))
  );
};

export const handleCancelEdit = (
  id: number,
  rows: DataRow[],
  setRows: Dispatch<SetStateAction<DataRow[]>>,
  setModifiedRows: Dispatch<SetStateAction<number[]>>,
  setOriginalData: Dispatch<SetStateAction<DataRow[]>>
) => {
  const originalRow = rows.find((data) => data.id === id) as DataRow;
  if (originalRow) {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...originalRow, isEditing: false } : row
      )
    );
    setModifiedRows((prevModifiedRows) =>
      prevModifiedRows.filter((rowId) => rowId !== id)
    );
    setOriginalData((prevData) => prevData.filter((data) => data.id !== id));
  }
};

export const handleInputChange = (
  id: number,
  field: keyof DataRow,
  value: string,
  rows: DataRow[],
  setRows: Dispatch<SetStateAction<DataRow[]>>,
  modifiedRows: number[],
  setModifiedRows: Dispatch<SetStateAction<number[]>>
) => {
  setRows((prevRows) =>
    prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
  );
  if (!modifiedRows.includes(id)) {
    setModifiedRows((prevModifiedRows) => [...prevModifiedRows, id]);
  }
};

export const handleFileChange = (
  id: number,
  file: File,
  handleInputChange: (id: number, field: keyof DataRow, value: string) => void
) => {
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.result) {
      handleInputChange(id, "logo", reader.result as string);
    }
  };
  reader.readAsDataURL(file);
};

export const hasRowChanged = (row: DataRow, originalData: DataRow[]): any => {
  const originalRow = originalData.find((data) => data.id === row.id);
  return (
    (row.isNew && row.country && row.logo) ||
    (originalRow &&
      (originalRow.logo !== row.logo || originalRow.country !== row.country))
  );
};

export const anyRowChanged = (
  rows: DataRow[],
  originalData: DataRow[],
  hasRowChanged: (row: DataRow, originalData: DataRow[]) => boolean
): boolean => {
  return rows.some(
    (row) => hasRowChanged(row, originalData) && (row.country || row.logo)
  );
};
