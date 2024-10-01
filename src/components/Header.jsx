import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>HOTEL MANAGEMENT SYSTEM</h1>
      <nav>
        <Link to="/"></Link>
      </nav>
    </header>
  );
};

export default Header;
