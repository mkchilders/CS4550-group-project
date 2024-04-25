import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const save = async () => {
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div className="d-flex flex-column w-50 row-gap-2">
          <Link
            to="/Kanbas/Account/Admin/Users"
            className="btn btn-warning w-100 mb-2 mt-3"
          >
            Users
          </Link>
          <label>
            Username:
            <br />
            <input
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              placeholder="Username"
            />
          </label>
          <label>
            Password:
            <br />
            <input
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
              placeholder="Password"
            />
          </label>
          <label>
            First Name:
            <br />
            <input
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              placeholder="First Name"
            />
          </label>
          <label>
            Last Name:
            <br />
            <input
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              placeholder="Last Name"
            />
          </label>
          <label>
            Date of Birth:
            <br />
            <input
              value={profile.dob?.slice(0, 10)}
              type="date"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </label>
          <label>
            Email:
            <br />
            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              placeholder="email@host.com"
            />
          </label>
          <label>
            Role:
            <br />
            <select
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </label>
          <button className="btn btn-primary mt-3" onClick={save}>
            Save
          </button>
          <button className="btn btn-danger" onClick={signout}>
            Signout
          </button>
        </div>
      )}
    </div>
  );
}
