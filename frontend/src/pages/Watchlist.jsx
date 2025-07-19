import React, { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../utils/watchlist";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWatchlist(id);
    setWatchlist(getWatchlist());
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold">📺 Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-400">No movies in your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="bg-[#1e1e1e] p-3 rounded shadow">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded w-full h-[360px] object-cover"
              />
              <h3 className="mt-2 text-md font-semibold">{movie.title}</h3>
              <button
                onClick={() => handleRemove(movie.id)}
                className="mt-2 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm"
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
