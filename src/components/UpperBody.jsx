import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Popover,
  Alert,
} from "@mui/material";
import { Auth } from "../config/firebase";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { addToDo } from "../redux/CRUD/addToDo";
import { useSelector } from "react-redux";
import {DeleteAll,DeleteSelected} from '../redux/CRUD/DeleteToDo';
import { handleallselectvalue } from "../redux/ToDoApp/ToDoStore";
import { useDispatch } from "react-redux";

const UpperBody = () => {
  const [openAddToDo, setAddToDo] = useState(false);
  const ToDos = useSelector(state => state.ToDoApp.ToDos);
  const [anchorEl, setanchorEl] = useState(null);
  const [openDeleteToDo, setDeleteToDo] = useState(false);
  const allselectvalue = useSelector(state => state.ToDoApp.allselectvalue);
  const dispatch = useDispatch();

  const handleAddToDo = async () => {
    const taskValue = document.getElementById("taskValue").value;
    const userId = Auth.currentUser.uid;
    await addToDo(taskValue,userId);
    setAddToDo(false);
  };

  const oneToDoCompleted = ToDos.some((ToDo) => ToDo.completed === true);
  const isPopoverOpen = Boolean(anchorEl);

  return (
    <>
      <Box
        className="Title"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography
          variant="subtitle1"
          style={{ fontSize: "25px", fontWeight: "300" }}
          gutterBottom
        >
          TODO LIST, ADD NEW TODO
        </Typography>
      </Box>

      <Box display={"flex"} justifyContent={"flex-end"} className="Btn-group">
        <Button
          variant="contained"
          style={{
            backgroundColor: "steelblue",
            marginLeft: "auto",
            display: allselectvalue || oneToDoCompleted ? 'flex' : 'none'
          }}
          startIcon={<DeleteIcon />}
          onClick={() => {
            setDeleteToDo(true);
          }}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          style={{
            marginRight: "20px",
            backgroundColor: "steelblue",
            marginLeft: "10px",
          }}
          startIcon={<AddIcon />}
          onClick={() => setAddToDo(!openAddToDo)}
        >
          Add new Todo
        </Button>

        <div className="addToDoDialog">
          <Dialog open={openAddToDo} onClose={() => setAddToDo(false)}>
            <DialogTitle>ToDo</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter ToDo Task</DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="taskValue"
                label="Enter Task Details"
                type="text"
                style={{ width: "400px" }}
                variant="standard"
                inputProps={{
                  style: {
                    "&:focused": {
                      borderColor: "steelblue",
                    },
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "steelblue",
                  },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                style={{ backgroundColor: "steelblue" }}
                variant="contained"
                onClick={() => setAddToDo(false)}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: "steelblue" }}
                variant="contained"
                onClick={() => handleAddToDo()}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="DeleteToDoDialog">
          <Dialog open={openDeleteToDo} onClose={() => setDeleteToDo(false)}>
            <DialogTitle>ToDo</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure to delete selected ones?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => setDeleteToDo(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if(allselectvalue){
                    DeleteAll();
                    dispatch(handleallselectvalue());
                  }
                  else{
                    DeleteSelected();
                  }
                  setDeleteToDo(false);
                }}
              >
                Delete
              </Button>
              <Popover
                open={isPopoverOpen}
                anchorEl={anchorEl}
                onClose={() => setanchorEl(null)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box p={2}>
                  <Alert severity="error">No Todos available!</Alert>
                </Box>
              </Popover>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default UpperBody;
