import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/tmdb";
import MovieCard from "./MovieCard";

export default function TrendingMovies({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">🔥 Trending Today</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
        ))}
      </div>
    </div>
  );
}
