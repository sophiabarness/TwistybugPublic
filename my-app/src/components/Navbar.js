// src/components/Navbar.js
import React, { useState } from 'react';
import './navbar.css';
import TwistybugLogo from './twistybug.svg';

const Navbar = () => {
  const [isMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <img src={TwistybugLogo} alt="Twistybug Logo"/> {/* Adjust width and height as needed */}
        <span>Twistybug's Brain Club</span>
      </div>
      {/* <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="toggle-icon"></span>
        <span className="toggle-icon"></span>
        <span className="toggle-icon"></span>
      </button> */}
      <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        {/* <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a> */}
      </div>
    </nav>
  );
};

export default Navbar;
