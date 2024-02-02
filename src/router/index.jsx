import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import AuthRoute from "../components/protectedRoute";
import UnAuthRoute from "../components/unAuthRoute";
import ToDoApp from "../views/ToDoApp";

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthRoute />}>
          <Route path='/' element={<Navigate to="/ToDo" />} />
          <Route path="/ToDo" element={<ToDoApp />} />
      </Route>
      <Route element={<UnAuthRoute />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
    </>
  )
);
