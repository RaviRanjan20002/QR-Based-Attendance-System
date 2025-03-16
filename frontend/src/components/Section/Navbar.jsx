// import React from "react";

// import "../../Styles/Navbar.css";
// import logo from "../../assets/dott.png";
// import { Link } from "react-router-dom";
// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="navbar-logo">
//         <img
//           src={logo}
//           alt="DOT Logo"
//         />
//       </div>
      
//       <div className="navbar-links">
//       <Link to={"/"}>GenerateQRCode</Link>
//       <Link to={"/scan"}>ScanQRCode</Link>
//       <Link to={"/attendance"}>AttendanceDashboard</Link>
//       <Link to={"/attendancehistory"}>StudentAttendanceHistory</Link>
//       </div>
      
//     </div>
//   );
// };

// export default Navbar;
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
        <Link to="/attendancehistory" onClick={toggleMenu}>Student Attendance History</Link>
      </div>
    </nav>
  );
};

export default Navbar;
