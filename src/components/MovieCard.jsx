import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function MovieCard({ movie, onDelete }) {
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isAdmin = user?.role === "admin";

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      layout
      key={`movie-${movie.id}-${movie.genre}`} // KEY UNIK DENGAN GENRE
      whileHover={{ scale: 1.02 }}
      className="card rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900"
    >
      {/* Card clickable untuk semua user */}
      <Link to={`/movies/${movie.id}`}>
        <div className="relative">
          {/* Image dengan loading state */}
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-full h-full"></div>
              </div>
            )}
            
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
              </div>
            ) : (
              <motion.img
                src={movie.poster}
                alt={movie.title}
                className={`w-full h-64 object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                initial={{ scale: 0.98 }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.5 }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            )}
          </div>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Title */}
          <h3 className="absolute left-4 bottom-4 text-white font-bold text-lg drop-shadow-lg line-clamp-2">
            {movie.title}
          </h3>
        </div>
      </Link>

      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {movie.year} • {movie.genre}
          </p>
          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(movie.rating || 0) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({movie.rating || 0})
            </span>
          </div>
        </div>

        {/* ADMIN ONLY — bukan user biasa */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/edit/${movie.id}`}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <FiEdit className="text-blue-500" />
            </Link>

            <button
              onClick={() => onDelete && onDelete(movie.id)}
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition text-red-500"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}