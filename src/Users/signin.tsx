import { useState } from "react";
import { User } from "./client";
import { useNavigate } from "react-router";
import * as client from "./client";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="d-flex flex-column w-50">
        <h1>
          Signin <FaSignInAlt />
        </h1>
        <input
          className="mb-2"
          placeholder="username"
          onChange={(e) => {
            setCredentials({ ...credentials, username: e.target.value });
          }}
        />
        <input
          className="mb-2"
          type={"password"}
          placeholder="password"
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
        />
        <button className="btn btn-primary btn-sm mb-1 mt-1" onClick={signin}>
          Signin
        </button>
        <Link className="btn btn-warning btn-sm" to="/Kanbas/Account/Signup">
          Signup
        </Link>
      </div>
    </div>
  );
}
