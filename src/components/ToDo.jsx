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
  Typography,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import { useDispatch } from "react-redux";
import { updateCheckBox } from "../redux/CRUD/EditValue";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import EditProgress from "./EditProgress";

function ToDo({ row, index }) {
  const [markAsRead, setmarkAsRead] = useState(false);
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [updateEditvalue, setupdateEditvalue] = useState("");
  const [hoverPin, sethoverPin] = useState(false);
  const [progressDialog, setprogressDialog] = useState(false);
  const [pinValue, setpinValue] = useState(false);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setupdateEditvalue(row.description);
    setChecked(row.completed);
  }, [row]);

  const activeProgress = () => {
    if(row.progress === 'Completed'){
      return 'green'
    }
    if(row.progress === 'Not yet'){
      return 'dimgrey'
    }
    if(row.progress === 'Ongoing'){
      return 'red'
    }
  }




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
                    return newChecked;
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
              style={{ textDecoration: markAsRead ? "line-through" : "none"}}
            >
              <Button fullWidth onClick={() => setprogressDialog(true)} 
                style={{ color: activeProgress()}}
                
              >
                {row.progress}
              </Button>
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

              <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                setopenDeleteDialog={setopenDeleteDialog}
                id={row.id}
              />

              <EditDialog
                openEditDialog={openEditDialog}
                setopenEditDialog={setopenEditDialog}
                id={row.id}
                updateEditvalue={updateEditvalue}
                setupdateEditvalue={setupdateEditvalue}
              />

              <EditProgress 
                progressDialog={progressDialog}
                setprogressDialog ={setprogressDialog}
                id ={row.id}
                progressValue={row.progress}
              />

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
