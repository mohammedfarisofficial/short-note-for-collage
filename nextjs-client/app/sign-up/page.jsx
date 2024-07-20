"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

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
    <div>
      SignUp page
      <form onSubmit={registerHandler}>
        <input
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
        />
        <Link href="/sign-in">goto Sign In</Link>
        <Button className="m-10" type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
