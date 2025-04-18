import React, { useContext, useState } from "react";
import "./Navbar.css";
import Category from "./Category";
import { useNavigate } from "react-router-dom";
import { ExpesesContext } from "../context/ExpesesProvider";
function Navbar() {
  const [show, setShow] = useState(false);
  const navigator = useNavigate();
  const user  = localStorage.getItem("user");
  return (
    <>
      <div id="nav-bar">
        <div className="logo">
          <img src="/logo/Fintrack-png.png" alt="" />
        </div>
      </div>
      <div className="nav-tool">
        <button>Home</button>
        <button onClick={() => setShow(true)}>Add Category</button>
        <button>Report</button>
        <button onClick={()=> navigator(`/profile/${user}`)}>Profile</button>
      </div>
      {!show ? "" : <Category setShow={setShow}/>}
    </>
  );
}

export default Navbar;
