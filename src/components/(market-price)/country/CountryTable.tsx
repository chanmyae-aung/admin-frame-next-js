"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { DataRow } from "../shared/types";
import CountryTableRow from "./CountryTableRow";

interface CountryTableProps {
  rows: DataRow[];
  handleAddRows: () => void;
  handleAddRow: (id: number) => void;
  handleDeleteRow: (id: number) => void;
  handleEditRow: (id: number) => void;
  handleSaveChanges: (id: number) => void;
  handleCancelEdit: (id: number) => void;
  handleInputChange: (id: number, field: keyof DataRow, value: string) => void;
  handleFileChange: (id: number, file: File) => void;
  hasRowChanged: (row: DataRow) => any;
  anyRowChanged: () => boolean;
  handleSaveAllChanges: () => void;
}

const CountryTable: React.FC<CountryTableProps> = ({
  rows,
  handleAddRows,
  handleAddRow,
  handleDeleteRow,
  handleEditRow,
  handleSaveChanges,
  handleCancelEdit,
  handleInputChange,
  handleFileChange,
  hasRowChanged,
  anyRowChanged,
  handleSaveAllChanges,
}) => {
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
            <CountryTableRow
              key={i}
              row={row}
              index={i}
              handleAddRow={handleAddRow}
              handleDeleteRow={handleDeleteRow}
              handleEditRow={handleEditRow}
              handleSaveChanges={handleSaveChanges}
              handleCancelEdit={handleCancelEdit}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              hasRowChanged={hasRowChanged}
            />
          ))}
        </TableBody>
      </Table>
      <Stack
        direction={"row"}
        width={"fit-content"}
        m={3}
        spacing={3}
        ml={"auto"}
      >
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

export default CountryTable;
