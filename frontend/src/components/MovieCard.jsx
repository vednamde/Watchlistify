import React from "react";
import { Link } from "react-router-dom";
import { addToWatchlist } from "../utils/watchlist";
import { toast } from "react-toastify";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  // this stops <Link> navigation only for the button click
  const handleAdd = (e) => {
    e.preventDefault();          // ⛔️ keep card from navigating
    addToWatchlist(movie);
    toast.success(`${movie.title} added to your watchlist!`);
  };

  return (
    <Link           /* Link guarantees navigation to the detail page */
      to={`/movie/${movie.id}`}
      className="block"
    >
      <div
        onClick={() => onClick?.()}
        className="bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-lg 
             hover:shadow-red-700/40 transition-transform 
             duration-300 hover:-translate-y-1 cursor-pointer"
      >
        <img
          src={poster}
          alt={movie.title}
          className="rounded-md mb-2 w-full h-[360px] object-cover"
        />
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-400">{releaseYear}</p>
        <p className="text-yellow-400 mb-2">⭐ {movie.vote_average || "N/A"}</p>

        <button
          onClick={handleAdd}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
        >
          ➕ Add to Watchlist
        </button>
      </div>
    </Link>
  );
}
