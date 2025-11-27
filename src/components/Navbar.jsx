import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import { FiSun, FiMoon } from "react-icons/fi";
import { FaHome, FaStar, FaUser, FaTools } from "react-icons/fa";

import DropdownGenre from "../pages/DropdownGenre";
import SearchBar from "./SearchBar";

import React, { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [animating, setAnimating] = useState(false);
  const toggleRef = useRef(null);

  const [fadeActive, setFadeActive] = useState(false);

  const [circle, setCircle] = useState({
    visible: false,
    x: 0,
    y: 0,
    size: 0,
    color: "#fff",
  });

  const [circleScale, setCircleScale] = useState(0);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeToggle = () => {
    if (animating) return;
    setAnimating(true);

    setFadeActive(true);
    setTimeout(() => setFadeActive(false), 600);

    const rect = toggleRef.current?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const diameter = Math.max(
      180,
      Math.min(420, Math.hypot(window.innerWidth, window.innerHeight) / 3)
    );

    const targetBg = theme === "dark" ? "#ffffff" : "#0f172a";

    setCircle({
      visible: true,
      x: centerX,
      y: centerY,
      size: diameter,
      color: targetBg,
    });

    setTimeout(() => setCircleScale(1), 18);
    setTimeout(() => toggleTheme(), 150);

    setTimeout(() => {
      setCircleScale(0);
      setTimeout(() => setCircle((s) => ({ ...s, visible: false })), 240);
      setAnimating(false);
    }, 550);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  if (location.pathname === "/login") return null;

  // ✨ Reusable Premium Button
  const NavButton = ({ to, icon, label, highlight }) => (
    <Link
      to={to}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full 
        text-sm font-medium transition-all duration-300
        ${highlight
          ? "bg-purple-600 text-white shadow-md hover:bg-purple-700"
          : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      <div className={`fade-overlay ${fadeActive ? "active" : ""}`} />

      <nav
        className={`
          fixed top-0 left-0 w-full z-50 
          px-6 py-4
          transition-all duration-500
          flex items-center justify-between
          ${scrolled
            ? "bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg"
            : "bg-slate-50 dark:bg-slate-900"
          }
        `}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white"
        >
          🎬 MovieApp
        </Link>

        {/* Center: Navigation */}
        <div className="flex items-center gap-4">

          {/* Always HOME */}
          <NavButton to="/" icon={<FaHome />} label="Home" />

          {/* User menu */}
          {user?.role !== "admin" && (
            <>
              <NavButton to="/watchlist" icon={<FaStar />} label="Watchlist" />
              <NavButton to="/profile" icon={<FaUser />} label="Profile" />
            </>
          )}

          {/* Admin menu */}
          {user?.role === "admin" && (
            <NavButton
              to="/admin/add"
              icon={<FaTools />}
              label="Admin Panel"
              highlight
            />
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="hidden md:block md:w-64">
            <SearchBar
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                window.dispatchEvent(
                  new CustomEvent("global-search", { detail: val })
                );
              }}
              placeholder="Search movies..."
            />
          </div>

          {/* Genre Dropdown */}
          <DropdownGenre
            onGenreChange={(genre) =>
              window.dispatchEvent(
                new CustomEvent("global-genre-filter", { detail: genre })
              )
            }
            className="hidden md:block"
          />

          {/* Theme Toggle */}
          <button
            ref={toggleRef}
            onClick={handleThemeToggle}
            className="relative w-14 h-8 p-1 rounded-full"
          >
            <span
              className={`absolute inset-0 rounded-full transition-colors ${
                theme === "dark" ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />

            <span
              className={`absolute left-1 top-1 text-white text-xs transition-all ${
                theme === "dark" ? "opacity-100" : "opacity-0"
              }`}
            >
              <FiMoon />
            </span>

            <span
              className={`absolute right-1 top-1 text-yellow-300 text-xs transition-all ${
                theme === "dark" ? "opacity-0" : "opacity-100"
              }`}
            >
              <FiSun />
            </span>

            <span
              className={`relative w-6 h-6 rounded-full bg-white dark:bg-yellow-300 shadow transform transition-all ${
                theme === "dark" ? "translate-x-6" : ""
              }`}
            />
          </button>

          {/* Ripple Animation */}
          {circle.visible && (
            <div
              aria-hidden="true"
              style={{
                position: "fixed",
                left: circle.x - circle.size / 2,
                top: circle.y - circle.size / 2,
                width: circle.size,
                height: circle.size,
                borderRadius: "50%",
                background: circle.color,
                transform: `scale(${circleScale})`,
                transition: "transform 0.55s ease, opacity 0.4s ease",
                zIndex: 30,
                pointerEvents: "none",
                opacity: circleScale > 0 ? 0.6 : 0,
              }}
            />
          )}

          {/* Auth */}
          {user ? (
            <>
              <span className="hidden md:inline font-medium capitalize text-gray-700 dark:text-gray-200">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
