'use client';
import React from "react";
import { TableCell, TextField } from "@mui/material";
import { DataRow } from "./types";

interface InputCellProps {
  isEditing: boolean;
  country: string;
  rowId: number;
  handleInputChange: (id: number, field: keyof DataRow, value: string) => void;
}

const InputCell: React.FC<InputCellProps> = ({
  isEditing,
  country,
  rowId,
  handleInputChange,
}) => {
  return (
    <TableCell>
      {isEditing ? (
        <TextField
          value={country}
          onChange={(e) => handleInputChange(rowId, "country", e.target.value)}
          fullWidth
        />
      ) : (
        country
      )}
    </TableCell>
  );
};

export default InputCell;
