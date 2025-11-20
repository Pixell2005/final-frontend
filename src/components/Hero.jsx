import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero(){
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-blue-50 to-white dark:from-black/40 dark:to-black/30 py-12 rounded-xl mb-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Discover movies. Write reviews. Share feelings.</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">A minimalist cinematic review app inspired by Letterboxd — modern UI, smooth animations, and simple CRUD.</p>
          <div className="flex gap-3">
            <Link to="/add" className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">Add a Movie</Link>
            <Link to="/" className="px-5 py-3 border rounded-xl bg-white/60 dark:bg-transparent transition">Browse</Link>
          </div>
        </div>

        <motion.div className="w-full md:w-1/3">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img src="https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg" alt="hero" className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
