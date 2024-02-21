import { configureStore } from "@reduxjs/toolkit";
import AuthStore from "./Auth/AuthStore.jsx";
import ToDoApp from './ToDoApp/ToDoStore.jsx';
export default configureStore({
    reducer:{
        AuthStore: AuthStore,
        ToDoApp: ToDoApp
    }
});