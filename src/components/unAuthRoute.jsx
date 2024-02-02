import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { Auth } from "../config/firebase";

const UnAuthRoute = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
  }, []); // Empty dependency array means the effect runs once after the initial render

  if (isUserAuthenticated === null) {
    // Still waiting for the authentication state, you might want to render a loading spinner here
    return <div>Loading</div>;
  }

  return !isUserAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default UnAuthRoute;
