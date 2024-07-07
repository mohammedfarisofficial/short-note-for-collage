import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const isLogged = true;

  if (!isLogged) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default AuthRoute;
