import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/pages/home';
import Devices from './components/pages/devices';
import Login from './components/pages/login';
import Records from './components/pages/records';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/login" element={<Login />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}

export default App;
