import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchMovieVideos } from "../services/tmdb";
import { addToWatchlist } from "../utils/watchlist";
import { toast } from "react-toastify";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
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

    // Fetch trailer video key
    const getTrailer = async () => {
      try {
        const videos = await fetchMovieVideos(id);
        const trailer = videos.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    };
    getTrailer();
  }, [id, API_KEY]);

  if (!movie)
    return (
      <div className="text-white p-6 flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Image";

  return (
    <div className="text-white p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition"
      >
        &larr; Back
      </button>
      <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 shadow-lg">
        <img
          src={poster}
          alt={movie.title}
          className="max-w-full h-auto rounded shadow-lg hover:scale-105 transition-transform duration-300 object-contain"
          style={{ maxWidth: "300px" }}
        />
        <div className="flex-1 flex flex-col">
          <h1 className="text-4xl font-extrabold mb-3">{movie.title}</h1>
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
            <span>Release Date: {movie.release_date}</span>
            <span>Runtime: {movie.runtime} mins</span>
            <span>Rating: ⭐ {movie.vote_average}</span>
            <span>Genres: {movie.genres.map((g) => g.name).join(", ")}</span>
          </div>
          <button
            onClick={() => {
              addToWatchlist(movie);
              toast.success(`${movie.title} added to your watchlist!`);
            }}
            className="mb-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition"
          >
            + Add to Watchlist
          </button>
          <p className="mb-6 text-lg leading-relaxed break-words max-w-full">{movie.overview}</p>

          {/* Trailer Video */}
          {trailerKey && (
            <div className="mb-6 aspect-video rounded-lg overflow-hidden shadow-lg max-w-full">
              <iframe
                title="Trailer"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="max-w-full"
              />
            </div>
          )}

          {/* 🎭 Cast Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
            <div className="flex flex-wrap gap-6 max-w-full">
              {cast.map((actor) => (
                <div
                  key={actor.id}
                  className="w-28 text-center cursor-pointer hover:scale-105 transform transition-transform duration-300"
                  title={`${actor.name} as ${actor.character}`}
                >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "https://placehold.co/150x225?text=No+Image"
                      }
                      alt={actor.name}
                      className="rounded-md mb-2 shadow-md"
                    />
                  <p className="text-sm font-medium truncate">{actor.name}</p>
                  <p className="text-xs text-gray-400 truncate">
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
