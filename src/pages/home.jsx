import React, { useEffect, useState } from 'react';
import { getMovies, deleteMovie } from '../services/api';
import MovieCard from '../components/MovieCard';
import Hero from '../components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownGenre from '../pages/DropdownGenre';

export default function Home() {
  const [allMovies, setAllMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchAllMovies() {
    setLoading(true);
    try {
      const res = await getMovies();
      setAllMovies(res.data || []);
    } catch (err) {
      console.error(err);
    } finally { 
      setLoading(false); 
    }
  }

  useEffect(() => { 
    fetchAllMovies(); 
  }, []);

  useEffect(() => {
    function onSearch(e) {
      setQuery(e.detail || '');
    }
    window.addEventListener('global-search', onSearch);
    return () => window.removeEventListener('global-search', onSearch);
  }, []);

  useEffect(() => {
    function onGenreFilter(e) {
      setSelectedGenre(e.detail || '');
    }
    window.addEventListener('global-genre-filter', onGenreFilter);
    return () => window.removeEventListener('global-genre-filter', onGenreFilter);
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this movie?')) return;
    try {
      await deleteMovie(id);
      setAllMovies(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  }

  const filteredMovies = allMovies.filter(movie => {
    const matchesGenre = selectedGenre ? movie.genre === selectedGenre : true;
    const matchesSearch = query ? 
      movie.title.toLowerCase().includes(query.toLowerCase()) : true;
    return matchesGenre && matchesSearch;
  });

  const gridVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div 
      className="theme-fade relative min-h-screen transition-all duration-300 overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end))`,
        color: "var(--text-primary)"
      }}
    >

      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[420px] h-[420px] 
                        bg-blue-300 dark:bg-blue-600 opacity-25 
                        rounded-full blur-[130px]"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] 
                        bg-purple-300 dark:bg-purple-600 opacity-20 
                        rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10">
        <Hero />

        <div className="container mx-auto px-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Movies
            </h2>

            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <DropdownGenre 
                  selectedGenre={selectedGenre}
                  onGenreChange={setSelectedGenre}
                />
              </div>

              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {filteredMovies.length} {filteredMovies.length === 1 ? 'item' : 'items'}
                {selectedGenre && ` in ${selectedGenre}`}
                {query && ` matching "${query}"`}
              </p>
            </div>
          </div>

          {/* Search Info */}
          {query && (
            <div 
              className="mb-4 p-3 rounded-lg glass-panel"
            >
              <p style={{ color: "var(--text-secondary)" }}>
                Showing results for: <strong>"{query}"</strong>
              </p>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading ? (
            <div className="
              grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
              max-w-7xl mx-auto px-4
            ">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="animate-pulse rounded-2xl h-64 glass-panel"
                />
              ))}
            </div>
          ) : (
            <motion.div 
              key={`movies-grid-${selectedGenre}-${query}`}
              initial="hidden" 
              animate="show" 
              variants={gridVariants} 
              className="
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
                max-w-7xl mx-auto px-4
              "
            >
              <AnimatePresence>
                {filteredMovies.map(m => (
                  <motion.div 
                    key={`${m.id}-${selectedGenre}`}
                    variants={itemVariants}
                    layout
                  >
                    <MovieCard movie={m} onDelete={handleDelete} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredMovies.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: "var(--text-secondary)" }} className="text-lg">
                {query && selectedGenre 
                  ? `No matches found for "${query}" in ${selectedGenre} genre`
                  : query 
                  ? `No matches found for "${query}"`
                  : selectedGenre 
                  ? `No movies found in ${selectedGenre} genre`
                  : 'No movies found'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
