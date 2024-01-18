import React from 'react';
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navContainer">
            <span className="logo">BookMe</span>
            <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Sign in</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
