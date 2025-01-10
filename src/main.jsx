import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Meals from './Meals';
import Bank from './Banks';
import Cocktails from './Cocktails';
import Potter from './Potter';
import Github from './github'

const Main = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200">

        <nav className="sticky top-0 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-500 shadow-lg rounded-b-lg">
          <ul className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 p-4 text-lg font-bold text-white">
            <li className="transform hover:scale-110 transition duration-300">
              <Link to="/meals" className="hover:text-gray-100">Meals</Link>
            </li>
            <li className="transform hover:scale-110 transition duration-300">
              <Link to="/banks" className="hover:text-gray-100">Banks</Link>
            </li>
            <li className="transform hover:scale-110 transition duration-300">
              <Link to="/cocktails" className="hover:text-gray-100">Cocktails</Link>
            </li>
            <li className="transform hover:scale-110 transition duration-300">
              <Link to="/potter" className="hover:text-gray-100">Potter</Link>
            </li>
            <li className="transform hover:scale-110 transition duration-300">
              <Link to="/github" className="hover:text-gray-100">Github</Link>
            </li>
          </ul>
        </nav>


        <header className="relative flex flex-col items-center justify-center text-center min-h-[70vh] px-8 py-12 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900?magic,nature')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 fade-in">Welcome to the Ultimate Explorer</h1>
          <p className="relative text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl fade-in">
            Explore meals, banks, cocktails, and magical Harry Potter details all in one place!
          </p>
          <Link
            to="/meals"
            className="relative px-6 py-3 text-white bg-blue-500 rounded-full font-semibold hover:bg-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Exploring
          </Link>
        </header>


        <section className="px-6 py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-bold text-blue-500 mb-4">Meals</h3>
              <p className="text-gray-600 dark:text-gray-300">Discover delicious meals with recipes and cooking instructions.</p>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-bold text-purple-500 mb-4">Banks</h3>
              <p className="text-gray-600 dark:text-gray-300">Access important bank details and find financial information.</p>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-bold text-pink-500 mb-4">Cocktails</h3>
              <p className="text-gray-600 dark:text-gray-300">Explore refreshing cocktail recipes with full instructions.</p>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">Potter</h3>
              <p className="text-gray-600 dark:text-gray-300">Dive into the world of Harry Potter characters, spells, and houses.</p>
            </div>
          </div>
        </section>


        <main className="p-6">
          <Routes>
            <Route path="/meals" element={<Meals />} />
            <Route path="/banks" element={<Bank />} />
            <Route path="/cocktails" element={<Cocktails />} />
            <Route path="/potter" element={<Potter />} />
            <Route path="/github" element={<Github />} />
          </Routes>
        </main>


        <footer className="text-center p-4 bg-gray-800 text-gray-200">
          <p>&copy; {new Date().getFullYear()} Ultimate Explorer | Made with React & ❤️</p>
        </footer>
      </div>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
