import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-white shadow-xl rounded-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-72 object-cover"
          />

          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* title on image */}
          <h3 className="absolute bottom-4 left-4 text-white font-extrabold text-2xl drop-shadow-xl">
            {movie.title}
          </h3>
        </div>

        <div className="p-4">
          <p className="text-gray-600 text-sm">
            {movie.year} • {movie.genre}
          </p>
        </div>
      </div>
    </Link>
  );
}
