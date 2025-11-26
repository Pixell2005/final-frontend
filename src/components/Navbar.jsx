import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import DropdownGenre from "../pages/DropdownGenre";
import SearchBar from "./SearchBar";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // --- HIDE NAVBAR ON LOGIN PAGE ---
  if (location.pathname === "/login") return null;

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    window.dispatchEvent(new CustomEvent("global-search", { detail: value }));
  };

  // Genre
  const handleGenreChange = (genre) => {
    window.dispatchEvent(
      new CustomEvent("global-genre-filter", { detail: genre })
    );
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setSearchQuery("");
      window.dispatchEvent(new CustomEvent("global-search", { detail: "" }));
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return (
    <nav className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-900 shadow">
      <Link to="/" className="text-2xl font-bold dark:text-white">
        🎬 MovieApp
      </Link>

      <div className="w-full md:w-auto md:flex-1 md:max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search movies by title..."
        />
      </div>

      <div className="flex items-center gap-4">
        <DropdownGenre
          onGenreChange={handleGenreChange}
          className="hidden md:block"
        />

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "light" ? (
            <FiMoon className="text-gray-700" />
          ) : (
            <FiSun className="text-yellow-300" />
          )}
        </button>

        {user ? (
          <>
            <span className="text-gray-700 dark:text-gray-300 hidden md:inline">
              {user.username}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
