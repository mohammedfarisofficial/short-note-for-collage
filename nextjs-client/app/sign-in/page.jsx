"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log("Credentials :", loginCredential);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: loginCredential.email,
        password: loginCredential.password,
      });
      if (response.status === 200) {
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
    <div>
      SignUp page
      <form onSubmit={registerHandler}>
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
        <Link href="/sign-up">goto Sign Up</Link>
        <button type="submit">Sign In</button>
      </form>
        <Button className="m-20" onClick={() => signIn("github")}>Github</Button>
    </div>
  );
};

export default SignIn;
