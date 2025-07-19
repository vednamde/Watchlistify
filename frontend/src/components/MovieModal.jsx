import React from "react";

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  console.log("Opening modal for:", movie.title); // ✅ Only once

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 
                flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 rounded-lg p-6 max-w-xl w-full relative text-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-xl hover:text-red-400"
        >
          ✖
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <img src={poster} alt={movie.title} className="w-48 rounded shadow" />
          <div>
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-2">
              Release: {movie.release_date || "N/A"}
            </p>
            <p className="mb-2">⭐ {movie.vote_average || "N/A"}</p>
            <p className="text-sm">{movie.overview || "No description."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MovieModal);
