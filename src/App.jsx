import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Booking from './components/Booking';
import ServiceRequests from './components/serviceRequests';
import Rooms from './components/Rooms';
import Chekin from './components/Chekin';
import HouseKeeping from './components/HouseKeeping';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        {/* Header */}
        <Header />

        {/* Routes for different components */}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/booking" element={<Booking />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path='/checkin' element={<Chekin />} />
            <Route path="/services" element={<ServiceRequests />} />
            <Route path="/housekeeping" element={<HouseKeeping />} />
          </Route>
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
