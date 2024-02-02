/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    TextField,
  } from "@mui/material";
import { EditValue } from "../redux/CRUD/EditValue";


function EditDialog({openEditDialog,setopenEditDialog,id,updateEditvalue,setupdateEditvalue}) {
  return (
    <div className="Edit-Dialog">
                <Dialog
                  open={openEditDialog}
                  onClose={() => setopenEditDialog(false)}
                >
                  <DialogContent>
                    <DialogContentText>Edit the Task Details</DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="editValue"
                      type="text"
                      value={updateEditvalue}
                      style={{ width: "400px" }}
                      variant="standard"
                      onChange={(e) => setupdateEditvalue(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "steelblue" }}
                      onClick={() => setopenEditDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "steelblue" }}
                      onClick={() => {
                        EditValue(id, updateEditvalue);
                        setupdateEditvalue("");
                        setopenEditDialog(false);
                      }}
                    >
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
  )
}

export default EditDialog