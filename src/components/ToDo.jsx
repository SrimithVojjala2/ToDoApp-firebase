/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  TableRow,
  TableCell,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Typography,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import { useDispatch } from "react-redux";
import { EditValue, updateCheckBox } from "../redux/CRUD/EditValue";
import { DeleteToDo } from "../redux/CRUD/DeleteToDo";

function ToDo({ row, index }) {
  const [markAsRead, setmarkAsRead] = useState(false);
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [updateEditvalue, setupdateEditvalue] = useState("");
  const [hoverPin, sethoverPin] = useState(false);
  const [pinValue, setpinValue] = useState(false);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setupdateEditvalue(row.description);
    setChecked(row.completed);
  }, [row]);

  return (
    <>
      <Draggable
        draggableId={row.id}
        key={row.id}
        index={index}
        isDragDisabled={pinValue}
      >
        {(provided) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <TableCell align="left" style={{ width: "30px" }}>
              <Checkbox
                checked={checked}
                onChange={() => {
                  setChecked((prev) => {
                    const newChecked = !prev;
                    updateCheckBox(row.id, newChecked);
                    return newChecked
                  });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0",
                  padding: "0",
                }}
              />
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="left"
              width={"65px"}
              onMouseOver={() => sethoverPin(true)}
              onMouseOut={() => sethoverPin(false)}
              style={{ textDecoration: markAsRead ? "line-through" : "none" }}
            >
              <Typography
                variant="body1"
                style={{
                  display: !hoverPin ? "flex" : "none",
                  alignItems: "center",
                }}
              >
                {index + 1}
              </Typography>
              <Checkbox
                icon={
                  <PushPinOutlinedIcon style={{ transform: "rotate(50deg)" }} />
                }
                checkedIcon={
                  <PushPinIcon
                    style={{ color: "steelblue", transform: "rotate(50deg)" }}
                  />
                }
                checked={pinValue}
                onChange={() => {
                  setpinValue((prev) => !prev);
                  if (pinValue !== true) {
                    null;
                  }
                }}
                style={{
                  display: hoverPin ? "flex" : "none",
                  margin: "0",
                  padding: "0",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              />
            </TableCell>
            <TableCell
              style={{
                paddingLeft: "15px",
                textDecoration: markAsRead ? "line-through" : "none",
              }}
            >
              <Typography variant="body1">{row.description}</Typography>
            </TableCell>
            <TableCell
              align="center"
              width={"50px"}
              style={{ textDecoration: markAsRead ? "line-through" : "none" }}
            >
              <Typography variant="body1">{row.progress}</Typography>
            </TableCell>
            <TableCell align="center" width={"200px"}>
              <Button
                style={{ color: "steelblue" }}
                onClick={() => setopenEditDialog(true)}
              >
                <EditIcon />
              </Button>
              <Button
                style={{ color: "steelblue" }}
                onClick={() => setopenDeleteDialog(true)}
              >
                <DeleteIcon />
              </Button>

              <div className="Delete-Dialog">
                <Dialog
                  open={openDeleteDialog}
                  onClose={() => setopenDeleteDialog(false)}
                >
                  <DialogContent>
                    <DialogContentText>
                      Are you sure want to Delete?
                    </DialogContentText>
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
                        DeleteToDo(row.id);
                        setopenDeleteDialog(false);
                      }}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

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
                        EditValue(row.id, updateEditvalue);
                        setupdateEditvalue("");
                        setopenEditDialog(false);
                      }}
                    >
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </TableCell>
            <TableCell align="center" width={"150px"}>
              <Checkbox
                icon={<MarkAsUnreadOutlinedIcon />}
                checkedIcon={<MarkunreadIcon style={{ color: "steelblue" }} />}
                checked={markAsRead}
                onChange={() => setmarkAsRead((prev) => !prev)}
              />
            </TableCell>
          </TableRow>
        )}
      </Draggable>
    </>
  );
}

export default ToDo;
