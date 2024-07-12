"use client";
import React, { useState } from "react";
import { DataRow } from "../shared/types";
import CountryTable from "./CountryTable";
import {
  handleAddRows,
  handleAddRow,
  handleDeleteRow,
  handleEditRow,
  handleCancelEdit,
  handleInputChange,
  handleFileChange,
  hasRowChanged,
  anyRowChanged,
} from "../shared/tableHandler";

const initialData: DataRow[] = [
  { id: 1, logo: "", country: "USA", isEditing: false, isNew: false },
  { id: 2, logo: "", country: "Canada", isEditing: false, isNew: false },
];

const Country: React.FC = () => {
  const [rows, setRows] = useState<DataRow[]>(initialData);
  const [modifiedRows, setModifiedRows] = useState<number[]>([]);
  const [originalData, setOriginalData] = useState<DataRow[]>([]);

  const handleSaveChanges = (id: number) => {
    const updatedRow = rows.find((row) => row.id === id);

    if (updatedRow) {
      fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedRow.id,
          newData: updatedRow,
        }),
      }).then(() => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isEditing: false, isNew: false } : row
          )
        );
        setModifiedRows((prevModifiedRows) =>
          prevModifiedRows.filter((rowId) => rowId !== id)
        );
        setOriginalData((prevData) =>
          prevData.filter((data) => data.id !== id)
        );
      });
    }
  };

  const handleSaveAllChanges = () => {
    const rowsToSave = rows.filter((row) => modifiedRows.includes(row.id));

    fetch("/api/updateAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modifiedRows: rowsToSave,
      }),
    }).then(() => {
      setModifiedRows([]);
      setRows((prevRows) =>
        prevRows.map((row) => ({ ...row, isEditing: false, isNew: false }))
      );
      setOriginalData([]);
    });
  };

  return (
    <CountryTable
      rows={rows}
      handleAddRows={() => handleAddRows(rows, setRows)}
      handleAddRow={(id) => handleAddRow(id, rows, setRows)}
      handleDeleteRow={(id) =>
        handleDeleteRow(id, rows, setRows, setModifiedRows, setOriginalData)
      }
      handleEditRow={(id) => handleEditRow(id, rows, setRows, setOriginalData)}
      handleSaveChanges={handleSaveChanges}
      handleCancelEdit={(id) =>
        handleCancelEdit(id, rows, setRows, setModifiedRows, setOriginalData)
      }
      handleInputChange={(id, field, value) =>
        handleInputChange(
          id,
          field,
          value,
          rows,
          setRows,
          modifiedRows,
          setModifiedRows
        )
      }
      handleFileChange={(id, file) =>
        handleFileChange(id, file, (id: number, field: any, value: any) =>
          handleInputChange(
            id,
            field,
            value,
            rows,
            setRows,
            modifiedRows,
            setModifiedRows
          )
        )
      }
      hasRowChanged={(row) => hasRowChanged(row, originalData)}
      anyRowChanged={() => anyRowChanged(rows, originalData, hasRowChanged)}
      handleSaveAllChanges={handleSaveAllChanges}
    />
  );
};

export default Country;
