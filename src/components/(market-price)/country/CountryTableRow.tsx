import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { DataRow } from "../shared/types";
import ActionCell from "../shared/ActionCell";
import FileInputCell from "../shared/FileInputCell";
import InputCell from "../shared/InputCell";

interface CountryTableRowProps {
  row: DataRow;
  index: number;
  handleAddRow: (id: number) => void;
  handleDeleteRow: (id: number) => void;
  handleEditRow: (id: number) => void;
  handleSaveChanges: (id: number) => void;
  handleCancelEdit: (id: number) => void;
  handleInputChange: (id: number, field: keyof DataRow, value: string) => void;
  handleFileChange: (id: number, file: File) => void;
  hasRowChanged: (row: DataRow) => boolean;
}

const CountryTableRow: React.FC<CountryTableRowProps> = ({
  row,
  index,
  handleAddRow,
  handleDeleteRow,
  handleEditRow,
  handleSaveChanges,
  handleCancelEdit,
  handleInputChange,
  handleFileChange,
  hasRowChanged,
}) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <FileInputCell
        isEditing={row.isEditing}
        logo={row.logo}
        rowId={row.id}
        handleFileChange={handleFileChange}
      />
      <InputCell
        isEditing={row.isEditing}
        country={row.country}
        rowId={row.id}
        handleInputChange={handleInputChange}
      />
      <ActionCell
        isEditing={row.isEditing}
        isNew={row.isNew}
        row={row}
        handleAddRow={handleAddRow}
        handleDeleteRow={handleDeleteRow}
        handleEditRow={handleEditRow}
        handleSaveChanges={handleSaveChanges}
        handleCancelEdit={handleCancelEdit}
        hasRowChanged={hasRowChanged}
      />
    </TableRow>
  );
};

export default CountryTableRow;
