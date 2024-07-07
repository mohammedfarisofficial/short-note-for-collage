import "./style.scss";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { useState } from "react";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const adminLogin = () => {
    if (username !== "mohammedfaris") {
      console.log("wrong username");
      return;
    }
    if (password !== "123faris") {
      console.log("wrong password");
      return;
    }

    console.log("login");
  };
  return (
    <div className="container">
      <div className="inner-container admin-form">
        <h2>Admin panel</h2>
        <p className="desc">Only for admin</p>
        <InputBox
          value={username}
          setValue={setUsername}
          label="Username"
          placeholder="Enter username..."
        />
        <InputBox
          value={password}
          setValue={setPassword}
          label="Password"
          placeholder="Enter password..."
          type="password"
        />
        <Button onClick={adminLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Admin;
