import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlay } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function MovieCard({ movie, onDelete }) {
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isAdmin = user?.role === "admin";

  return (
    <motion.div
      layout
      key={`movie-${movie.id}-${movie.genre}`}
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl overflow-hidden shadow-xl 
                 bg-white/5 backdrop-blur-md border border-white/10 
                 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movies/${movie.id}`}>
        <div className="relative">
          {/* POSTER PORTRAIT */}
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

          {/* GRADIENT BAWAH */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* TITLE */}
          <h3 className="absolute left-4 bottom-4 text-white font-bold text-lg drop-shadow-lg">
            {movie.title}
          </h3>

          {/* TRAILER HOVER */}
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

      {/* INFO BAWAH */}
      <div className="p-4 flex items-center justify-between">
        <div>
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
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/edit/${movie.id}`}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <FiEdit className="text-blue-400" />
            </Link>

            <button
              onClick={() => onDelete(movie.id)}
              className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
