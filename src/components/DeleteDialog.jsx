/* eslint-disable react/prop-types */
import { DeleteToDo } from "../redux/CRUD/DeleteToDo";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
  } from "@mui/material";


function DeleteDialog({openDeleteDialog,setopenDeleteDialog,id}) {
  return (
    <div className="Delete-Dialog">
      <Dialog
        open={openDeleteDialog}
        onClose={() => setopenDeleteDialog(false)}
      >
        <DialogContent>
          <DialogContentText>Are you sure want to Delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "steelblue" }}
            onClick={() => setopenDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "steelblue" }}
            onClick={() => {
              DeleteToDo(id);
              setopenDeleteDialog(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
