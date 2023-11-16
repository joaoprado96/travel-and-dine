import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ComerPage from './pages/ComerPage';
import ViajarPage from './pages/ViajarPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comer" element={<ComerPage />} />
        <Route path="/viajar" element={<ViajarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
