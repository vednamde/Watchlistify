import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonCard from "./SkeletonCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieModal({ movie, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (!movie) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900 rounded-lg max-w-3xl w-full p-6 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {loading && <SkeletonCard />}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {movieDetails && (
              <>
                <h1 className="text-2xl font-bold mb-4">{movieDetails.title}</h1>
                <p>{movieDetails.overview}</p>
                {/* Add more movie details here */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 text-white text-xl font-bold"
                >
                  &times;
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
