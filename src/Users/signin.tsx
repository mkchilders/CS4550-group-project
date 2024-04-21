import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import { setCurrentUser } from "./userReducer";
import { useDispatch } from "react-redux";

export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
    dob: "",
    email: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signin = async () => {
    try {
      await client.signin(credentials);
      dispatch(setCurrentUser(credentials));
      navigate("/Kanbas/Account/Profile");
    } catch (error) {
      alert("Try again!");
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        placeholder="Username"
        className="mb-1 mt-3"
      />
      <br />
      <input
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        placeholder="Password"
      />
      <div className="mt-3">
        <button className="btn btn-primary me-1" onClick={signin}>
          Sign In
        </button>
        <Link className="btn btn-success" to="/Kanbas/Account/Signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
