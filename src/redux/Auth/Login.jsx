import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../config/firebase";
import { Navigate } from "react-router-dom";

export const Login = async (data) => {
  const { email, password } = data;
  try {
    await signInWithEmailAndPassword(Auth, email, password).then(() => {
      return <Navigate to="/" />;
    });
  } catch (err) {
    return err.message;
  }
};
