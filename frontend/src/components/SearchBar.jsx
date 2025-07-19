import React, { useState } from "react";
import { searchMovies } from "../services/tmdb";

export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const results = await searchMovies(query);
      onResults(results);
    } catch (err) {
      setError("Failed to fetch results. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col items-center gap-2 p-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          className="px-4 py-2 rounded-md w-72 text-white bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-red-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
