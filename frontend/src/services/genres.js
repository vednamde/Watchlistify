// src/api/genres.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetch movie genres from TMDB API
 * @returns {Promise<Array>} Array of genre objects
 */
export const getGenres = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',  // Optional: Set your preferred language
      },
    });
    return res.data.genres; // returns [{id: 28, name: 'Action'}, ...]
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return [];
  }
};
