import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
    <div className="menu">
        <Link to="/booking">
          <button className="menu-button">1. Booking</button>
        </Link>
        <Link to="/rooms">
          <button className="menu-button">2. Rooms</button>
        </Link>
        <Link to="/services">
          <button className="menu-button">3. Service Requests</button>
        </Link>
        <Link to="/housekeeping">
          <button className="menu-button">4. House Keeping</button>
        </Link>
        <Link to="/housekeeping">
          <button className="menu-button">5. Check in</button>
        </Link>
        <Link to="/housekeeping">
          <button className="menu-button">6. Check out</button>
        </Link>
      </div>
    <div className="content">
     <Outlet />
   </div>
    </div>
  );
};
export default Home;
