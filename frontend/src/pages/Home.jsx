import React from "react";
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import TrendingMovies from "../components/TrendingMovies";
import SkeletonCard from "../components/SkeletonCard";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import GenreDropdown from "../components/GenreDropdown";
import Filters from "../components/Filters";
import { getGenres } from '../services/genres';
import { AnimatePresence, motion } from "framer-motion";

export default function Home({ results = [], loading, onLoadMore, setSearchResults, selectedIds, toggleGenre, genres, filters, onFilterChange, onClearFilters }) {
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [randomTrailerKey, setRandomTrailerKey] = React.useState(null);

  const openMovie = (m) => setSelectedMovie(m);
  const featuredMovie = results.length > 0 ? results[0] : null;

  React.useEffect(() => {
    const fetchRandomTrailer = async () => {
      try {
        const randomMovie =
          results[Math.floor(Math.random() * results.length)];
        const response = await fetch(`YOUR_API_URL_FOR_MOVIE_VIDEOS/${randomMovie.id}`);
        if (!response.ok) throw new Error("Failed to fetch movie videos");
        const videos = await response.json();
        const trailer = videos.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setRandomTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Failed to fetch random trailer:", error);
        setRandomTrailerKey(null);
      }
    };

    if (results.length > 0) {
      fetchRandomTrailer();
      const interval = setInterval(fetchRandomTrailer, 30000);
      return () => clearInterval(interval);
    }
  }, [results]);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🎬 Hero Banner */}
      {featuredMovie && <HeroBanner movie={featuredMovie} />}

      {/* 🔍 Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <SearchBar onResults={setSearchResults} />
      </motion.div>

      {/* 🛠 Advanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <Filters
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      </motion.div>

      {/* 📂 Genre Dropdown with animation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <GenreDropdown
          genres={genres}
          selectedIds={selectedIds}
          onToggle={toggleGenre}
        />
      </motion.div>

      {/* 🎥 Random Trailer */}
      {randomTrailerKey && (
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Random Trending Trailer"
            src={`https://www.youtube.com/embed/${randomTrailerKey}?autoplay=1&mute=1&controls=1&loop=1&playlist=${randomTrailerKey}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {/* 🔥 Trending Section */}
      {results.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TrendingMovies onMovieClick={openMovie} />
        </motion.div>
      )}

      {/* 🎞 Movie Grid */}
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

      {/* ⬇️ Load More Button */}
      {!loading && results.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onLoadMore}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold"
          >
            Load More
          </button>
        </div>
      )}

      {/* 🎬 Modal */}
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
