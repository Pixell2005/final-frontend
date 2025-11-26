import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import DropdownGenre from "../pages/DropdownGenre";
import SearchBar from "./SearchBar";
import React, { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [animating, setAnimating] = useState(false);
  const toggleRef = useRef(null);

  // Fade overlay
  const [fadeActive, setFadeActive] = useState(false);

  // Ripple circle animation
  const [circle, setCircle] = useState({
    visible: false,
    x: 0,
    y: 0,
    size: 0,
    color: "#fff",
  });
  const [circleScale, setCircleScale] = useState(0);

  // ============================================
  // 🔥 1. DETEKSI SCROLL NAVBAR
  // ============================================
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
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
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) return null;

  return (
    <>
      {/* GLOBAL FADE */}
      <div className={`fade-overlay ${fadeActive ? "active" : ""}`} />

      <nav
        className={`
          theme-fade px-6 flex flex-col md:flex-row justify-between items-center gap-4
          fixed top-0 left-0 w-full z-50 transition-all duration-500
          
          ${scrolled 
            ? "py-2 shadow-md bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md"
            : "py-4 bg-slate-50 dark:bg-slate-900"}
        `}
      >
        <Link to="/" className="text-2xl font-bold">
          🎬 MovieApp
        </Link>

        <div className="w-full md:w-auto md:flex-1 md:max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              window.dispatchEvent(
                new CustomEvent("global-search", { detail: value })
              );
            }}
            placeholder="Search movies by title..."
          />
        </div>

        <div className="flex items-center gap-4">
          <DropdownGenre
            onGenreChange={(genre) =>
              window.dispatchEvent(
                new CustomEvent("global-genre-filter", { detail: genre })
              )
            }
            className="hidden md:block"
          />

          {/* TOGGLE THEME */}
          <button
            ref={toggleRef}
            onClick={handleThemeToggle}
            className="relative w-14 h-8 flex items-center p-1 rounded-full transition-all duration-300"
          >
            <span
              className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                theme === "dark" ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />

            <span
              className={`absolute left-1 top-1 text-white text-xs transition-all duration-500 ${
                theme === "dark" ? "opacity-100" : "opacity-0"
              }`}
            >
              <FiMoon />
            </span>

            <span
              className={`absolute right-1 top-1 text-yellow-300 text-xs transition-all duration-500 ${
                theme === "dark" ? "opacity-0" : "opacity-100"
              }`}
            >
              <FiSun />
            </span>

            <span
              className={`relative w-6 h-6 rounded-full bg-white dark:bg-yellow-300 shadow transform transition-all duration-500 ${
                theme === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          {/* RIPPLE EFFECT */}
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

          {user ? (
            <>
              <span className="hidden md:inline">{user.username}</span>
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
    </>
  );
}
