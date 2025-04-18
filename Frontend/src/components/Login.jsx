import React, { useContext, useRef, useState } from "react";
import "./Login.css";
import { createCookie, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ExpesesContext } from "../context/ExpesesProvider";

function Login() {
  const nav = useNavigate();
  const { setUser,getCategory } = useContext(ExpesesContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const HandleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    if (user) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:4000/users/login",
          user
        );
        if (response.status == 200) {
          nav(`/home/${response.data.username}`);
          setUser(response.data.username);
          localStorage.setItem("user", response.data.username);
          getCategory()
        }
      } catch (err) {
        console.error(err);
        alert("Invalid credentials");
      }
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="container">
      <div className="login-page">
        <h1>Login Form</h1>
        <form onSubmit={HandleSubmit}>
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
          />
          <input type="submit" value={"Login"} />
          <p>
            Forgot <span>Password</span>
          </p>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
