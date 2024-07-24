"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/reducers/authSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const signInHandler = async (e) => {
    e.preventDefault();
    console.log("Credentials :", loginCredential);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: loginCredential.email,
        password: loginCredential.password,
      });
      
      if (response.status === 200) {
        dispatch(setAuth({ user: loginCredential }));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onFieldChange = (e) => {
    const { value, name } = e.target;
    setLoginCredential((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="w-full h-[100vh] px-20 flex justify-center items-center">
      <form onSubmit={signInHandler}>
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Sign up to get free account</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Enter email</Label>
              <Input
                onChange={onFieldChange}
                type="email"
                placeholder="Enter Email"
                name="email"
                id="email"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={onFieldChange}
                placeholder="password"
                name="password"
                type="password"
                id="password"
              />
            </div>
            <Link href="/sign-up">goto Sign Up</Link>
          </CardContent>
          <CardFooter>
            <Button className="m-2" type="submit">
              Sign Up
            </Button>
            <Button className="m-2" type="submit">
              Google
            </Button>
            <Button className="m-2" onClick={()=>signIn("github")}>
              Github
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SignIn;
