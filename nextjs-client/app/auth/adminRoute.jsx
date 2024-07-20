"use client";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

const projectedRoute = (Component) => {
  return function WithAuth(props) {
    const isAuthenticated = true;
    const isAdmin = true;

    useLayoutEffect(() => {
      if (!isAuthenticated) {
        redirect("/sign-up");
        return null;
      }
      if (isAuthenticated && !isAdmin) {
        redirect("/");
        return null;
      }
    }, [isAuthenticated]);

    return <Component {...props} />;
  };
};
export default projectedRoute;
