/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { Auth, db } from "../config/firebase";
import { useDispatch } from "react-redux";
import { setToDos } from "../redux/ToDoApp/ToDoStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import ToDo from "./ToDo";
import {UpdateAllcheckbox} from '../redux/CRUD/EditValue'
import { handleDragEnd,handleallselectvalue } from "../redux/ToDoApp/ToDoStore";

const MainBody = () => {
  const ToDos = useSelector(state => state.ToDoApp.ToDos);
  const allselectvalue = useSelector(state => state.ToDoApp.allselectvalue)
  const dispatch = useDispatch();

  useEffect(() => {
    const ToDosCollectionRef = collection(db, "ToDoData");
    const ToDoUserData = collection(
      doc(ToDosCollectionRef, Auth.currentUser.uid),
      "ToDos"
    );
    const unsubscribe = onSnapshot(ToDoUserData, (querySnapshot) => {
      const newTodo = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newTodo.push({
          id: doc.id,
          ...data
        });
      });
      dispatch(setToDos({ data: newTodo }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={(e) => {
        dispatch(handleDragEnd(e),console.log(ToDos))
        }}>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table aria-label="simple table">
            <TableHead
              style={{
                backgroundColor: "steelblue",
              }}
            >
              <TableRow style={{ height: "50px" }}>
                <TableCell
                  align="left"
                  style={{ padding: "5px 5px 5px 9px", width: "30px" }}
                >
                  <Checkbox
                    onChange={() => {
                      dispatch(handleallselectvalue())
                      UpdateAllcheckbox(!allselectvalue)
                    }}
                    checked={allselectvalue}
                    style={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </TableCell>
                <TableCell
                  align="left"
                  width={"65px"}
                  style={{ color: "white", margin: "0" }}
                >
                  <div>Id</div>
                </TableCell>
                <TableCell style={{ color: "white", paddingLeft: "15px" }}>
                  ToDo
                </TableCell>
                <TableCell
                  style={{ color: "white" }}
                  align="center"
                  width={"50px"}
                >
                  Progress
                </TableCell>
                <TableCell
                  style={{ color: "white" }}
                  align="center"
                  width={"200px"}
                >
                  Edit / Remove
                </TableCell>
                <TableCell
                  style={{ color: "white" }}
                  align="left"
                  width={"150px"}
                >
                  Mark as Complete
                </TableCell>
              </TableRow>
            </TableHead>

            <Droppable droppableId="ToDoList" type="group">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {ToDos.map((row, index) => (
                    <ToDo row={row} key={row.id} index={index} />
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </DragDropContext>
    </>
  );
};

export default MainBody;
