import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Auth, googleProvider } from "../../config/firebase";
import { Navigate } from "react-router-dom";

export const Login = async (data) => {
  const { email, password } = data;
  try {
    await signInWithEmailAndPassword(Auth, email, password).then(() => {
      return <Navigate to="/" />;
    });
  } catch (err) {
    return err.message
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const signInWithGoogle =async () =>{
  try{
    await signInWithPopup(Auth,googleProvider)
    .then(() => {
      return <Navigate to='/' />
    })
  }catch(err){
    console.error(err.message);
  }
}