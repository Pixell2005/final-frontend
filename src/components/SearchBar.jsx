import React from 'react';
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-modern pl-10" // Menggunakan class custom dari index.css
      />
    </div>
  );
}