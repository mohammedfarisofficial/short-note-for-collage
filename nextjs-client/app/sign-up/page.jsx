"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
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

const SignUp = () => {
  const [registerCredential, setRegisterCredential] = useState({
    email: "",
    username: "",
    password: "",
  });

  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log("Credentials :", registerCredential);

    try {
      const response = await axios.post("/api/sign-up", {
        registerCredential,
      });
      if (response.status === 201) {
        console.log(response.status === 201);
        router.push("/sign-in");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onFieldChange = (e) => {
    const { value, name } = e.target;
    setRegisterCredential((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="w-full h-[100vh] px-20 flex justify-center items-center">
      <form onSubmit={registerHandler}>
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Sign up to get free account</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={onFieldChange}
                placeholder="Enter username"
                name="username"
                type="text"
                id="username"
              />
            </div>
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
            {/* <input
              onChange={onFieldChange}
              type="text"
              placeholder="Enter username"
              name="username"
            />
            <input
              onChange={onFieldChange}
              type="text"
              placeholder="Enter Email"
              name="email"
            />
            <input
              onChange={onFieldChange}
              type="text"
              placeholder="Enter password"
              name="password"
            /> */}
            <Link href="/sign-in">goto Sign In</Link>
          </CardContent>
          <CardFooter>
            <Button className="m-2" type="submit">
              Sign Up
            </Button>
            <Button className="m-2" type="submit">
              Google
            </Button>
            <Button className="m-2" type="submit">
              Github
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SignUp;
