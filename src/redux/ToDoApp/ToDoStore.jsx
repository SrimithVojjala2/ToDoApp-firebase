/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
// import {ChangeToDoList} from '../CRUD/addToDo'
const initialState = {
  ToDos: [],
  allselectvalue: false,
};

const ToDo = createSlice({
  name: "ToDoApp",
  initialState,
  reducers: {
    setToDos: (state,actions) => {
      state.ToDos = actions.payload.data;
    },
    handleDragEnd: (state,actions) => {
      const { source, destination, type } = actions.payload;
      if (!destination) return;
      if (
        source.dropppableId === destination.dropppableId &&
        source.index === destination.index
      )
        return;

      if (type === "group") {
        const updatedTodos = state.ToDos;
        const sourceIndex = source.index;
        const destinationIndex = destination.index;
        const [removeStore] = updatedTodos.splice(sourceIndex, 1);
        updatedTodos.splice(destinationIndex, 0, removeStore);
        state.ToDos = updatedTodos;
        // ChangeToDoList(updatedTodos)
      }
    },
    handleallselectvalue: (state,actions) =>{
      if(actions.payload !== false){
        state.allselectvalue = !state.allselectvalue
      }
      else{
        state.allselectvalue = actions.payload
      }
    }
  },
});

export const { setToDos,handleDragEnd,handleallselectvalue } = ToDo.actions;

export default ToDo.reducer;
