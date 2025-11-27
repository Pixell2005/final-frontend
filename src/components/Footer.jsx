import React from "react";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-inner mt-auto">
      
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        {/* Social Links */}
        <div className="flex gap-4 text-2xl justify-center">
          <a
            href="https://instagram.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <p className="text-center mt-4 text-gray-700 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} MyMovieApp. All rights reserved.
      </p>
    </footer>
  );
}
