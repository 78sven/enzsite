import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Person from "./Person.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Person" element={<Person />} />
          <Route path="/person/:name" element={<Person/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
