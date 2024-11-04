import React from 'react';
import Home from './pages/Home';
import './styles/main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterDetail from './components/CharacterDetail';

function App() {
  
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/champion/:championId" element={<CharacterDetail />} />
        </Routes>
    </Router>
  );
}

export default App;
