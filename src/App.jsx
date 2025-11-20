import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddEditMovie from './pages/AddEditMovie';
import MovieDetail from './pages/MovieDetail';

function App(){
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <div className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddEditMovie />} />
            <Route path="/edit/:id" element={<AddEditMovie />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
