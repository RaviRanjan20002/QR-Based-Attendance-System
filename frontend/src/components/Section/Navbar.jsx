
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Navbar.css";
import logo from "../../assets/dott.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={logo} alt="DOT Logo" />
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Generate QR Code</Link>
        <Link to="/scan" onClick={toggleMenu}>Scan QR Code</Link>
        <Link to="/attendance" onClick={toggleMenu}>Attendance Dashboard</Link>
        <Link to="/datehistory" onClick={toggleMenu}>Check History For Specific Date</Link>
        <Link to="/attendancehistory" onClick={toggleMenu}>Student Attendance History</Link>
      </div>
    </nav>
  );
};

export default Navbar;
