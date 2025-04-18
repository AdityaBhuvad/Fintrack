import React, { useContext } from "react";
import { ExpesesContext } from "../context/ExpesesProvider";
import "./Profile.css"; // Import the CSS file

function Profile() {
  const { logout } = useContext(ExpesesContext);
  const user = localStorage.getItem("user");

  return (
    <div className="container">
      <div id="user-profile">
        <h2>User Profile</h2>
        <p>
          <strong>Username:</strong> {user ? user : "Guest"}
        </p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
