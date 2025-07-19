import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    // Fetch movie details
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Error fetching movie:", err));

    // Fetch cast members
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
      .then((res) => setCast(res.data.cast.slice(0, 8)))
      .catch((err) => console.error("Error fetching cast:", err));
  }, [id, API_KEY]);

  if (!movie) return <div className="text-white p-6">Loading...</div>;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="text-white p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={poster} alt={movie.title} className="w-64 rounded shadow" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-2">
            Release Date: {movie.release_date}
          </p>
          <p className="mb-2">⭐ {movie.vote_average}</p>
          <p className="mb-4">{movie.overview}</p>

          {/* 🎭 Cast Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Top Cast</h2>
            <div className="flex gap-4 overflow-x-auto">
              {cast.map((actor) => (
                <div key={actor.id} className="w-24 text-center shrink-0">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/150x225?text=No+Image"
                    }
                    alt={actor.name}
                    className="rounded-md mb-1"
                  />
                  <p className="text-xs font-medium truncate">{actor.name}</p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
