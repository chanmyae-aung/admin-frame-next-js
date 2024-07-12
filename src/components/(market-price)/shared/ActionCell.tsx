import React from "react";
import { TableCell, IconButton } from "@mui/material";
import { Delete, Edit, Save, Cancel, Add } from "@mui/icons-material";
import { DataRow } from "./types";

interface ActionCellProps {
  isEditing: boolean;
  isNew: boolean;
  row: DataRow;
  handleAddRow: (id: number) => void;
  handleDeleteRow: (id: number) => void;
  handleEditRow: (id: number) => void;
  handleSaveChanges: (id: number) => void;
  handleCancelEdit: (id: number) => void;
  hasRowChanged: (row: DataRow) => boolean;
}

const ActionCell: React.FC<ActionCellProps> = ({
  isEditing,
  isNew,
  row,
  handleAddRow,
  handleDeleteRow,
  handleEditRow,
  handleSaveChanges,
  handleCancelEdit,
  hasRowChanged,
}) => {
  return (
    <TableCell>
      {isEditing ? (
        <>
          <IconButton
            onClick={() => handleSaveChanges(row.id)}
            disabled={!hasRowChanged(row)}
          >
            <Save />
          </IconButton>
          {!isNew && (
            <IconButton onClick={() => handleCancelEdit(row.id)}>
              <Cancel />
            </IconButton>
          )}
        </>
      ) : (
        <IconButton onClick={() => handleEditRow(row.id)}>
          <Edit />
        </IconButton>
      )}
      <IconButton onClick={() => handleDeleteRow(row.id)}>
        <Delete />
      </IconButton>
      <IconButton onClick={() => handleAddRow(row.id)}>
        <Add />
      </IconButton>
    </TableCell>
  );
};

export default ActionCell;
