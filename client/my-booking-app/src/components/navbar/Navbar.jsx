import React from 'react';
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    navigate("/login")
  }
  const handleClickR = async (event) => {
    event.preventDefault();
    navigate("/register")
  }

  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none"}}>
           <span className="logo">BookMe</span>
          </Link>
            <div className="navItems">
                <button onClick={handleClickR} className="navButton">Register</button>
                <button onClick={handleClick} className="navButton">Sign in</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
