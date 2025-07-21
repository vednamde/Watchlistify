import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getGenres } from "./services/genres";

export default function App() {
  const location = useLocation();
  const [genres, setGenres] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  // New filter states
  const [filters, setFilters] = useState({
    minRating: "",
    releaseYear: "",
    sortBy: "",
    runtimeMin: "",
    runtimeMax: "",
    language: "",
    movieType: "",
    country: "",
    keywords: "",
    smartFilter: "",
  });

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchGenresData = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchGenresData();
  }, []);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setResults([]);
      return;
    }
    setLoading(true);

    const params = {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      with_genres: selectedIds.join(","),
      page: page,
    };

    if (filters.minRating) {
      params["vote_average.gte"] = filters.minRating;
    }
    if (filters.releaseYear) {
      params["primary_release_year"] = filters.releaseYear;
    }
    if (filters.sortBy) {
      params["sort_by"] = filters.sortBy;
    }
    if (filters.runtimeMin) {
      params["with_runtime.gte"] = filters.runtimeMin;
    }
    if (filters.runtimeMax) {
      params["with_runtime.lte"] = filters.runtimeMax;
    }
    if (filters.language) {
      params["with_original_language"] = filters.language;
    }
    if (filters.movieType) {
      params["with_type"] = filters.movieType;
    }
    if (filters.country) {
      params["region"] = filters.country;
    }
    if (filters.keywords) {
      params["with_keywords"] = filters.keywords;
    }
    if (filters.smartFilter) {
      // Custom handling for smart filters can be added here
      // For now, no direct API param mapping
    }

    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: params,
      })
      .then((response) => {
        if (page === 1) {
          setResults(response.data.results);
        } else {
          setResults((prev) => [...prev, ...response.data.results]);
        }
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      })
      .finally(() => setLoading(false));
  }, [selectedIds, page, filters]);

  const toggleGenre = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
    setPage(1);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  return (
    <div className="bg-gradient-to-b from-[#000000] via-[#870000] to-[#000000] min-h-screen text-white">
      <Navbar
        genres={genres}
        selectedIds={selectedIds}
        onToggle={toggleGenre}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <FadeWrapper>
                  <Home
                    results={searchResults.length > 0 ? searchResults : results}
                    loading={loading}
                    onLoadMore={() => setPage((prev) => prev + 1)}
                    setSearchResults={setSearchResults}
                    selectedIds={selectedIds}
                    toggleGenre={toggleGenre}
                    genres={genres}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={() => setFilters({
                      minRating: "",
                      releaseYear: "",
                      sortBy: "",
                      runtimeMin: "",
                      runtimeMax: "",
                      language: "",
                      movieType: "",
                      country: "",
                      keywords: "",
                      smartFilter: "",
                    })}
                  />
                </FadeWrapper>
              }
            />
            <Route path="/watchlist" element={<FadeWrapper><Watchlist /></FadeWrapper>} />
            <Route path="/movie/:id" element={<FadeWrapper><MovieDetail /></FadeWrapper>} />
            <Route path="/login" element={<FadeWrapper><Login /></FadeWrapper>} />
            <Route path="/signup" element={<FadeWrapper><Signup /></FadeWrapper>} />
          </Routes>
        </AnimatePresence>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

function FadeWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
