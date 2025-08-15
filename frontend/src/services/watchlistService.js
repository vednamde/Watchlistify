import api from './api';

// Watchlist service
export const watchlistService = {
  // Get user's watchlist
  getWatchlist: async () => {
    try {
      const response = await api.get('/watchlist');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch watchlist' };
    }
  },

  // Add movie to watchlist
  addToWatchlist: async (movieData) => {
    try {
      const response = await api.post('/watchlist/add', movieData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add to watchlist' };
    }
  },

  // Remove movie from watchlist
  removeFromWatchlist: async (movieId) => {
    try {
      const response = await api.delete(`/watchlist/remove/${movieId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove from watchlist' };
    }
  },
};

export default watchlistService;
