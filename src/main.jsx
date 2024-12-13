import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Corrected import for Routes
import './App.css';
import Meals from './Meals';
import Bank from './Banks';
import Cocktails from './Cocktails';
import Potter from './Potter';

const Main = () => {
  return (
    <Router>
      <div>
        <nav className="flex">
          <ul className='flex w-full text-center justify-center items-center gap-8 sticky top-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition duration-300 ease-in-out rounded-lg shadow-lg md:gap-12 lg:gap-16 xl:gap-20 p-4'>
            <li><Link to="/meals">Meals</Link></li>
            <li><Link to="/banks">Banks</Link></li>
            <li><Link to="/cocktails">Cocktails</Link></li>
            <li><Link to="/potter">Potter</Link></li>
          </ul>
        </nav>
        <Routes> 
          <Route path="/meals" element={<Meals />} />
          <Route path="/banks" element={<Bank />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/potter" element={<Potter />} />
        </Routes>
      </div>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
