import React, { useEffect, useState } from 'react';
import { getMovies, deleteMovie } from '../services/api';
import MovieCard from '../components/MovieCard';
import Hero from '../components/Hero';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home(){
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchMovies(q = '') {
    setLoading(true);
    try {
      const param = q ? `?q=${encodeURIComponent(q)}` : '';
      const res = await getMovies(param);
      setMovies(res.data || []);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  }

  useEffect(() => { fetchMovies(); }, []);

  // listen global-search event from Navbar
  useEffect(() => {
    function onSearch(e) {
      const q = e.detail || '';
      setQuery(q);
      fetchMovies(q);
    }
    window.addEventListener('global-search', onSearch);
    return () => window.removeEventListener('global-search', onSearch);
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this movie?')) return;
    try {
      await deleteMovie(id);
      setMovies(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  }

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <Hero />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Movies</h2>
          <p className="text-sm text-gray-500">{movies.length} items</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse card p-6 rounded-2xl h-64" />
            ))}
          </div>
        ) : (
          <motion.div initial="hidden" animate="show" variants={gridVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {movies.map(m => (
                <motion.div key={m.id} variants={itemVariants}>
                  <MovieCard movie={m} onDelete={handleDelete} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
