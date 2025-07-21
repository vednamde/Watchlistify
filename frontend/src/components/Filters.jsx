import React, { useState, useEffect } from "react";

const movieTypes = [
  { label: "Movie", value: "movie" },
  { label: "TV Show", value: "tv" },
  { label: "Documentary", value: "documentary" },
  { label: "Short", value: "short" },
];

const languages = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  // Add more languages as needed
];

const smartFilters = [
  { label: "Feel-Good", value: "feel-good" },
  { label: "Hidden Gems", value: "hidden-gems" },
  // Add more smart filters as needed
];

export default function Filters({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (name, value) => {
    const updatedFilters = { ...localFilters, [name]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(name, value);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md space-y-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Release Year */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Release Year
          </label>
          <input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={localFilters.releaseYear || ""}
            onChange={(e) => handleChange("releaseYear", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g. 2022"
          />
        </div>

        {/* IMDb / TMDB Rating */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Minimum Rating
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={localFilters.minRating || ""}
            onChange={(e) => handleChange("minRating", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g. 7.0"
          />
        </div>

        {/* Popularity / Trending */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Sort By
          </label>
          <select
            value={localFilters.sortBy || ""}
            onChange={(e) => handleChange("sortBy", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Default</option>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
          </select>
        </div>

        {/* Runtime */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Runtime (mins)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="0"
              value={localFilters.runtimeMin || ""}
              onChange={(e) => handleChange("runtimeMin", e.target.value)}
              className="w-1/2 px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Min"
            />
            <input
              type="number"
              min="0"
              value={localFilters.runtimeMax || ""}
              onChange={(e) => handleChange("runtimeMax", e.target.value)}
              className="w-1/2 px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Language
          </label>
          <select
            value={localFilters.language || ""}
            onChange={(e) => handleChange("language", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Any</option>
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Movie Type */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Movie Type
          </label>
          <select
            value={localFilters.movieType || ""}
            onChange={(e) => handleChange("movieType", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Any</option>
            {movieTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Country / Region */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Country / Region
          </label>
          <input
            type="text"
            value={localFilters.country || ""}
            onChange={(e) => handleChange("country", e.target.value)}
            placeholder="e.g. USA, India"
            className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Keywords / Themes */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Keywords / Themes
          </label>
          <input
            type="text"
            value={localFilters.keywords || ""}
            onChange={(e) => handleChange("keywords", e.target.value)}
            placeholder="e.g. space, love, war"
            className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Smart Filters */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Smart Filters
          </label>
          <select
            value={localFilters.smartFilter || ""}
            onChange={(e) => handleChange("smartFilter", e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">None</option>
            {smartFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClearFilters}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
