"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Delete, Edit, Save } from "@mui/icons-material";

interface DataRow {
  id: number;
  name: string;
  price: number;
  isEditing: boolean;
}

const initialData: DataRow[] = [
  { id: 1, name: "iPhone 15 pro max", price: 1500, isEditing: false },
  { id: 2, name: "iPhone 15 pro", price: 1000, isEditing: false },
];

const TableComponent: React.FC = () => {
  const [rows, setRows] = useState<DataRow[]>(initialData);
  const [modifiedRows, setModifiedRows] = useState<number[]>([]); // Track modified row IDs
  console.log(rows);
  const handleAddRow = (id: number) => {
    const newRow: DataRow = {
      id: rows.length + 1, // Assign the next ID based on the current length of rows
      name: "",
      price: 0,
      isEditing: true,
    };

    // Find the index of the row with the specified ID
    const rowIndex = rows.findIndex((row) => row.id === id);

    // Insert the new row after the specified row
    const newRows = [...rows];
    newRows.splice(rowIndex + 1, 0, newRow);

    // Update the rows state with the new array
    setRows(newRows);
  };

  const handleDeleteRow = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setModifiedRows((prevModifiedRows) =>
      prevModifiedRows.filter((rowId) => rowId !== id)
    );
  };

  const handleEditRow = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  const handleInputChange = (
    id: number,
    field: keyof DataRow,
    value: string | number
  ) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    if (!modifiedRows.includes(id)) {
      setModifiedRows((prevModifiedRows) => [...prevModifiedRows, id]);
    }
  };

  const handleSaveChanges = (id: number) => {
    const updatedRow = rows.find((row) => row.id === id);

    if (updatedRow) {
      // Example of posting only the last updated row
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
            row.id === id ? { ...row, isEditing: false } : row
          )
        );
        setModifiedRows((prevModifiedRows) =>
          prevModifiedRows.filter((rowId) => rowId !== id)
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
        prevRows.map((row) => ({ ...row, isEditing: false }))
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                {row.isEditing ? (
                  <TextField
                    value={row.name}
                    onChange={(e) =>
                      handleInputChange(row.id, "name", e.target.value)
                    }
                    fullWidth
                  />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                {row.isEditing ? (
                  <TextField
                    type="number"
                    value={row.price}
                    onChange={(e) =>
                      handleInputChange(row.id, "price", Number(e.target.value))
                    }
                    fullWidth
                  />
                ) : (
                  row.price
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    row.isEditing
                      ? handleSaveChanges(row.id)
                      : handleEditRow(row.id)
                  }
                >
                  {row.isEditing ? <Save /> : <Edit />}
                </IconButton>
                <IconButton onClick={() => handleDeleteRow(row.id)}>
                  <Delete />
                </IconButton>
                <IconButton onClick={() => handleAddRow(row.id)}>
                  <Add />
                </IconButton>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        direction={"row"}
        width={"fit-content"}
        m={3}
        ml={"auto"}
      >
        <Button
          onClick={handleSaveAllChanges}
          variant="contained"
          color="primary"
          disabled={modifiedRows.length === 0}
        >
          Save
        </Button>
      </Stack>
    </TableContainer>
  );
};

export default TableComponent;
