import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface prop {
  content: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}

const DeleteDiloag = ({ content, open, setOpen, handleDelete }: prop) => {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="outlined" onClick={() => setOpen(true)} color="error">
          Delete
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">{`Delete ${content}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure want to delete this ${content}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDiloag;
