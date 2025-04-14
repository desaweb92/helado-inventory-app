import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HeladoForm from './components/HeladoForm';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/helados" element={<HeladoForm />} />
      </Routes>
    </Router>
  );
};
export default App;
