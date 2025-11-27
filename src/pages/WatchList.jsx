import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";

export default function WatchList() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    function load() {
      try {
        const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
        setWatchlist(saved);
      } catch {
        setWatchlist([]);
      }
    }

    load();
    window.addEventListener("watchlist-updated", load);
    return () => window.removeEventListener("watchlist-updated", load);
  }, []);

  const handleRemove = (id) => {
    const updated = (watchlist || []).filter((m) => String(m.id) !== String(id));
    localStorage.setItem("watchlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("watchlist-updated"));
    setWatchlist(updated);
  };

  return (
    <div className="min-h-screen px-6 pt-28 pb-12 theme-fade transition-all duration-500
                    bg-white dark:bg-[#0a0f24] text-black dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-20 text-gray-600 dark:text-gray-300">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-lg">Your watchlist is empty. Add movies to save them here.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {watchlist.map((m) => (
              <MovieCard key={m.id} movie={m} onDelete={handleRemove} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
