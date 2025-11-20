import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function MovieCard({ movie, onDelete }) {
  const { user } = useAuth(); // Ambil role user

  const isAdmin = user?.role === "admin";

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className="card rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900"
    >
      {/* Card clickable untuk semua user */}
      <Link to={`/movies/${movie.id}`}>
        <div className="relative">
          <motion.img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover"
            initial={{ scale: 0.98 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5 }}
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Title */}
          <h3 className="absolute left-4 bottom-4 text-white font-bold text-lg drop-shadow-lg">
            {movie.title}
          </h3>
        </div>
      </Link>

      <div className="p-4 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {movie.year} • {movie.genre}
        </p>

        {/* ADMIN ONLY — bukan user biasa */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/edit/${movie.id}`}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <FiEdit />
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
