import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import TrendingMovies from "../components/TrendingMovies";
import GenreChips from "../components/GenreChips";
import { fetchGenres } from "../services/genres";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Home() {
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: API_KEY,
          with_genres: selectedIds.join(","),
        },
      })
      .then((r) => setResults(r.data.results))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedIds]);

  const toggleGenre = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );

  const clearGenres = () => setSelectedIds([]);
  const handleSearch = (list) => setResults(list);
  const openMovie = (m) => setSelectedMovie(m);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🔍 Search Bar with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <SearchBar onResults={handleSearch} />
      </motion.div>

      {/* 🎭 Genre Chips */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <GenreChips
          genres={genres}
          selectedIds={selectedIds}
          onToggle={toggleGenre}
        />
        {selectedIds.length > 0 && (
          <button
            className="mt-2 text-sm text-red-400"
            onClick={clearGenres}
          >
            Clear filters ✖
          </button>
        )}
      </motion.div>

      {/* 🔥 Trending section */}
      {selectedIds.length === 0 && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TrendingMovies onMovieClick={openMovie} />
        </motion.div>
      )}

      {/* 🎬 Movie Results Grid */}
      <motion.div
        className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}
      >
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : results.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-shadow duration-300 rounded-lg"
              >
                <MovieCard movie={movie} onClick={() => openMovie(movie)} />
              </motion.div>
            ))}
      </motion.div>

      {/* 📽 Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
