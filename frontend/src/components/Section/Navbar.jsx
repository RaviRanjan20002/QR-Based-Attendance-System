import React from "react";

import "../../Styles/Navbar.css";
import logo from "../../assets/dott.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img
          src={logo}
          alt="DOT Logo"
        />
      </div>
      
      <div className="navbar-links">
      <Link to={"/"}>GenerateQRCode</Link>
      <Link to={"/scan"}>ScanQRCode</Link>
      <Link to={"/attendance"}>AttendanceDashboard</Link>
      <Link to={"/attendancehistory"}>StudentAttendanceHistory</Link>
      </div>
      
    </div>
  );
};

export default Navbar;
