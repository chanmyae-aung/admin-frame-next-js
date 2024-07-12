import React from "react";
import { TableCell, Avatar, Stack } from "@mui/material";
import { FileUploadRounded } from "@mui/icons-material";

interface FileInputCellProps {
  isEditing: boolean;
  logo: string;
  rowId: number;
  handleFileChange: (id: number, file: File) => void;
}

const FileInputCell: React.FC<FileInputCellProps> = ({
  isEditing,
  logo,
  rowId,
  handleFileChange,
}) => {
  return (
    <TableCell>
      {isEditing ? (
        <label htmlFor={`imageUpload-${rowId}`}>
          <input
            type="file"
            id={`imageUpload-${rowId}`}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileChange(rowId, file);
              }
            }}
          />
          {logo ? (
            <Avatar
              src={logo}
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
          src={logo}
          alt="Logo"
          style={{ width: "50px", height: "50px" }}
        />
      )}
    </TableCell>
  );
};

export default FileInputCell;
