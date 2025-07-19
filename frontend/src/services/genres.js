import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchGenres = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return res.data.genres;
  } catch (err) {
    console.error("Error fetching genres:", err);
    return [];
  }
};
