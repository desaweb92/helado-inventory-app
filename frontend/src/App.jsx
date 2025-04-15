import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HeladoApp from './HeladoApp';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/helados" element={<HeladoApp />} />
      </Routes>
    </Router>
  );
};
export default App;
