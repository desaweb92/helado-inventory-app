import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeladoApp from './HeladoApp';
import TasaBCV from './components/TasaBCV';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeladoApp />} />
        <Route path="/TasaBCV" element={<TasaBCV />} />
      </Routes>
    </Router>
  );
};
export default App;
