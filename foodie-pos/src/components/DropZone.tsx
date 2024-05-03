import { Box } from "@mui/material";
import exp from "constants";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface props {
  onDrop: (file: File[]) => void;
}

function DropZone({ onDrop }: props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        px: 1,
        cursor: "pointer",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Box>
  );
}

export default DropZone;
