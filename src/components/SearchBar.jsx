import React from 'react';

export default function SearchBar({ value, onChange, placeholder = "Search movies by title..." }) {
  return (
    <div className="mb-0">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
}