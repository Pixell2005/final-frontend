import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlay, FiPlus, FiBookmark } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function MovieCard({ movie, onDelete }) {
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const check = () => {
      const list = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setIsInWatchlist(list.some((m) => String(m.id) === String(movie.id)));
    };

    check();
    window.addEventListener("watchlist-updated", check);
    return () => window.removeEventListener("watchlist-updated", check);
  }, [movie.id]);

  const toggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const raw = localStorage.getItem("watchlist") || "[]";
    const list = JSON.parse(raw);
    const exists = list.some((m) => String(m.id) === String(movie.id));

    let updated;
    if (exists) {
      updated = list.filter((m) => String(m.id) !== String(movie.id));
    } else {
      updated = [
        {
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          year: movie.year,
          genre: movie.genre,
        },
        ...list,
      ];
    }

    localStorage.setItem("watchlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("watchlist-updated"));
    setIsInWatchlist(!exists);
  };

  return (
    <motion.div
      layout
      key={`movie-${movie.id}`}
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl overflow-hidden shadow-xl 
                 bg-white/5 backdrop-blur-md border border-white/10 
                 transition-all duration-300 relative
                 w-full max-w-[220px] md:max-w-[260px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ----- ADMIN ADD BUTTON (FLOAT) ----- */}
      {isAdmin && (
        <Link
          to="/admin/add"
          title="Add Movie"
          className="absolute top-3 right-3 z-20
                     p-2 rounded-full bg-green-600/40 hover:bg-green-500/60
                     text-green-200 backdrop-blur-md shadow-md"
        >
          <FiPlus className="text-lg" />
        </Link>
      )}

      <Link to={`/movies/${movie.id}`}>
        <div className="relative">

          {/* POSTER */}
          <div className="w-full aspect-[2/3] bg-gray-800 relative overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 animate-pulse bg-gray-700"></div>
            )}

            {imageError ? (
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-gray-400">No Image</span>
              </div>
            ) : (
              <motion.img
                src={movie.poster}
                alt={movie.title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageLoaded(true);
                  setImageError(true);
                }}
                loading="lazy"
              />
            )}
          </div>

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {/* TITLE */}
          <h3 className="absolute left-4 bottom-5 text-white font-bold text-lg drop-shadow-xl max-w-[85%] leading-tight">
            {movie.title}
          </h3>

          {/* TRAILER BUTTON */}
          {movie.trailer && isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(movie.trailer, "_blank");
                }}
                className="flex items-center gap-2 
                  bg-gradient-to-r from-blue-500 to-purple-600
                  hover:from-blue-600 hover:to-purple-700
                  text-white px-6 py-3 rounded-full font-semibold shadow-xl"
              >
                <FiPlay className="text-xl" />
                Watch Trailer
              </motion.button>
            </motion.div>
          )}
        </div>
      </Link>

      {/* ---- INFO SECTION ---- */}
      <div className="p-4">

        {/* Rating + Genre */}
        <p className="text-sm text-gray-300">
          {movie.year} • {movie.genre}
        </p>

        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i < Math.floor(movie.rating || 0)
                  ? "text-yellow-400"
                  : "text-gray-500"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Bottom right actions */}
        <div className="flex justify-between items-center mt-4">

          {/* WATCHLIST ICON BUTTON */}
          <button
            onClick={toggleWatchlist}
            className={`p-2 rounded-xl transition 
              ${isInWatchlist ? "bg-yellow-500 text-black" : "bg-white/10 text-white hover:bg-white/20"}`}
            title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            <FiBookmark className="text-xl" />
          </button>

          {/* ADMIN ICONS */}
          {isAdmin && (
            <div className="flex items-center gap-3">
              <Link
                to={`/admin/edit/${movie.id}`}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <FiEdit className="text-blue-400 text-lg" />
              </Link>

              <button
                onClick={() => onDelete && onDelete(movie.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg"
              >
                <FiTrash2 className="text-red-400 text-lg" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
