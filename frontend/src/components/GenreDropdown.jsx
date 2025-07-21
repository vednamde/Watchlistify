import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const GenreDropdown = ({ genres, selectedIds = [], onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSelected = (id) => selectedIds.includes(id);

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearAll = () => {
    selectedIds.forEach((id) => onToggle(id));
  };

  return (
    <div className="relative w-64 z-50 font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full bg-gradient-to-r from-red-600 to-red-800 text-white px-5 py-3 rounded-lg shadow-lg border border-red-700 hover:from-red-700 hover:to-red-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedIds.length > 0
            ? genres
                .filter((genre) => selectedIds.includes(genre.id))
                .map((genre) => genre.name)
                .join(", ")
            : "Select Genre"}
        </span>
        <FaChevronDown className="ml-3 text-lg" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute mt-2 w-full bg-white rounded-lg shadow-xl max-h-72 overflow-auto ring-1 ring-black ring-opacity-5 focus:outline-none z-50 p-2"
            role="listbox"
          >
            <input
              type="text"
              placeholder="Search genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={clearAll}
              className="mb-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Clear All
            </button>
            <ul>
              {filteredGenres.map((genre) => (
                <li
                  key={genre.id}
                  onClick={() => {
                    onToggle(genre.id);
                  }}
                  className={`cursor-pointer select-none px-5 py-3 text-gray-800 hover:bg-red-100 ${
                    isSelected(genre.id) ? "bg-red-200 font-semibold" : ""
                  }`}
                  role="option"
                  aria-selected={isSelected(genre.id)}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenreDropdown;
