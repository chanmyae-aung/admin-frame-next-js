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
  Avatar,
} from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  FileUploadRounded,
  Save,
  Cancel,
} from "@mui/icons-material";

interface DataRow {
  id: number;
  logo: string; // URL of the logo image
  country: string;
  isEditing: boolean;
  isNew: boolean;
}

const initialData: DataRow[] = [
  { id: 1, logo: "", country: "USA", isEditing: false, isNew: false },
  { id: 2, logo: "", country: "Canada", isEditing: false, isNew: false },
];

const Country: React.FC = () => {
  const [rows, setRows] = useState<DataRow[]>(initialData);
  const [modifiedRows, setModifiedRows] = useState<number[]>([]);
  const [originalData, setOriginalData] = useState<DataRow[]>([]);

  const handleAddRows = () => {
    const newRow: DataRow = {
      id: rows.length + 1,
      logo: "",
      country: "",
      isEditing: true,
      isNew: true,
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleAddRow = (id: number) => {
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

  const handleDeleteRow = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setModifiedRows((prevModifiedRows) =>
      prevModifiedRows.filter((rowId) => rowId !== id)
    );
    setOriginalData((prevData) => prevData.filter((data) => data.id !== id));
  };

  const handleEditRow = (id: number) => {
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

  const handleCancelEdit = (id: number) => {
    const originalRow = originalData.find((data) => data.id === id) as DataRow;
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

  const handleInputChange = (
    id: number,
    field: keyof DataRow,
    value: string
  ) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    if (!modifiedRows.includes(id)) {
      setModifiedRows((prevModifiedRows) => [...prevModifiedRows, id]);
    }
  };

  const handleFileChange = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        handleInputChange(id, "logo", reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

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

  const hasRowChanged = (row: DataRow) => {
    const originalRow = originalData.find((data) => data.id === row.id);
    return (
      (row.isNew && row.country && row.logo) ||
      (originalRow &&
        (originalRow.logo !== row.logo || originalRow.country !== row.country))
    );
  };

  const anyRowChanged = () => {
    return rows.some((row) => hasRowChanged(row) && (row.country || row.logo));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Logo</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                {row.isEditing ? (
                  <label htmlFor={`imageUpload-${row.id}`}>
                    <input
                      type="file"
                      id={`imageUpload-${row.id}`}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileChange(row.id, file);
                        }
                      }}
                    />
                    {row.logo ? (
                      <Avatar
                        src={row.logo}
                        alt="Logo Preview"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      <Stack
                        sx={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          borderStyle: "dashed",
                          borderWidth: 2,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FileUploadRounded />
                      </Stack>
                    )}
                  </label>
                ) : (
                  <Avatar
                    src={row.logo}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </TableCell>
              <TableCell>
                {row.isEditing ? (
                  <TextField
                    value={row.country}
                    onChange={(e) =>
                      handleInputChange(row.id, "country", e.target.value)
                    }
                    fullWidth
                  />
                ) : (
                  row.country
                )}
              </TableCell>
              <TableCell>
                {row.isEditing ? (
                  <>
                    <IconButton
                      onClick={() => handleSaveChanges(row.id)}
                      disabled={!hasRowChanged(row)}
                    >
                      <Save />
                    </IconButton>
                    {!row.isNew && (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack direction={"row"} width={"fit-content"} m={3} ml={"auto"}>
        <Button onClick={handleAddRows} variant="contained" color="primary">
          Add
        </Button>
        <Button
          onClick={handleSaveAllChanges}
          variant="contained"
          color="primary"
          disabled={!anyRowChanged()}
        >
          Save
        </Button>
      </Stack>
    </TableContainer>
  );
};

export default Country;
