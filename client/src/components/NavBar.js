import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link" activeclassname="active">Home</NavLink>
      <NavLink to="/profile" className="nav-link" activeclassname="active">Profile</NavLink>
      <NavLink to="/library" className="nav-link" activeclassname="active">Library</NavLink>
      <NavLink to="/books/upload" className="nav-link" activeclassname="active">Upload Book</NavLink>
    </nav>
  );
};

export default NavBar;
