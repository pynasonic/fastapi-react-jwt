import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Hi from './pages/Hi';
import ProtectedPage from './pages/Protected';

function App() {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/protected" element={<ProtectedPage />} />
      <Route path="/hi" element={<Hi />} />
      </Routes>
    </Router>
  );
}

export default App;
