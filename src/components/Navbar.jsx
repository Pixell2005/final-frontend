import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="px-10 py-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow">
      <Link to="/" className="text-2xl font-bold dark:text-white">
        🎬 MovieApp
      </Link>

      <div className="flex items-center gap-4">
        {/* DARK MODE BUTTON */}
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
            <span className="text-gray-700 dark:text-gray-300">
              {user.username}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
