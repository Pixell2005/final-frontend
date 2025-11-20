import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiPlus } from 'react-icons/fi';

export default function Navbar() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.theme === 'dark';
    } catch { return false; }
  });
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [dark]);

  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 z-50">
      <div className="backdrop-blur-sm bg-white/70 dark:bg-black/50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileTap={{ scale: 0.98 }}>
            <Link to="/" className="text-2xl font-extrabold tracking-tight">
              <span className="text-blue-600 dark:text-blue-400">Movie</span><span className="text-gray-700 dark:text-gray-200">Verse</span>
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:inline">• cinematic reviews</span>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ y: -2 }} className="hidden sm:block">
              <input
                id="global-search"
                placeholder="Search movies..."
                className="px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white dark:bg-gray-900"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // emit custom event to let Home listen
                    window.dispatchEvent(new CustomEvent('global-search', { detail: e.target.value }));
                  }
                }}
              />
            </motion.div>

            <Link to="/add" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition">
              <FiPlus /> Add Movie
            </Link>

            <button
              onClick={() => setDark(d => !d)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              aria-label="toggle dark"
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
