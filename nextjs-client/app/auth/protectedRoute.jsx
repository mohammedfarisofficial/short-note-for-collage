"use client";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

const protectedRoute = (Component) => {
  return function WithAuth(props) {
    const { data: session, status } = useSession();

    useLayoutEffect(() => {
      if (status === "unauthenticated") {
        redirect("/sign-up");
      }
    }, [status]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (status === "authenticated") {
      return <Component {...props} session={session} />;
    }

    // If not authenticated, render nothing (or a loading state)
    return null;
  };
};

export default protectedRoute;
