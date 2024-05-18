import React from 'react';
import '../CSS/navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Images/toddle-logo.png'; 
import { FaLink, FaFileUpload } from 'react-icons/fa'; // Import icons from react-icons/fa

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Your Company Name" className="logo" />
        </Link>
        <div className="nav-items">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/add-link" className="nav-link">
                <FaLink className="icon" /> 
                <strong>Upload Links</strong>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/upload-files" className="nav-link">
                <FaFileUpload className="icon" /> 
                <strong>Upload Files</strong>
              </Link>
            </li>
          </ul>
        </div>
        <div className="auth-links">
        <Link to="/signin" className="nav-link auth-button signin-btn">Sign In</Link>
        <Link to="/signup" className="nav-link auth-button signup-btn">Sign Up</Link>
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
