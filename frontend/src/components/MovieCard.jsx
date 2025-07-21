import React from "react";
import { Link } from "react-router-dom";
import { addToWatchlist } from "../utils/watchlist";
import { toast } from "react-toastify";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Image";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  // this stops <Link> navigation only for the button click
  const handleAdd = (e) => {
    e.preventDefault(); // ⛔️ keep card from navigating
    addToWatchlist(movie);
    toast.success(`${movie.title} added to your watchlist!`);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block relative group"
    >
      <div
        className="bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-lg 
             hover:shadow-red-700/40 transition-transform 
             duration-300 hover:-translate-y-1 cursor-pointer relative"
      >
        <img
          src={poster}
          alt={movie.title}
          loading="lazy"
          className="rounded-md mb-2 w-full h-[360px] object-cover"
        />
        <div className="px-3 pb-3 bg-black bg-opacity-2 backdrop-blur-md rounded-md">
          <h3 className="text-white font-semibold text-lg truncate" title={movie.title}>
            {movie.title}
          </h3>
          <p className="text-red-500 font-semibold mt-1">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
}
