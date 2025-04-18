import React, { useContext, useRef, useState } from "react";
import "./Register.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { ExpesesContext } from "../context/ExpesesProvider";

function Register() {
  const { setUser } = useContext(ExpesesContext);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConPassword] = useState("");
  const navigator = useNavigate();
  
  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (password == confirmPassword) {
      try {
        const user = { username, email, password };
        if (user) {
          const response = await axios.post(
            `http://127.0.0.1:4000/users/register`,
            user
          );
          if (response.status == 200) {
            navigator(`/home/${username}`);
            localStorage.setItem("user", username);
          }
        }
      } catch (err) {
        console.log(err);
        alert("Failed to register. Please try again.");
      }
    } else {
      alert("Passwords do not match");
    }
    setName("");
    setEmail("");
    setPassword("");
    setConPassword("");
  };
  return (
    <div className="container">
      <div className="register-page">
        <h1>Registration</h1>
        <form onSubmit={HandleSubmit}>
          <input
            value={username}
            type="text"
            placeholder="Username"
            onChange={(event) => setName(event.target.value)}
            required
            minLength={6}
          />
          <input
            value={email}
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
          />
          <input
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => setConPassword(event.target.value)}
            required
          />
          <input type="submit" value={"Submit"} />
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;
