const WATCHLIST_KEY = "watchlist_movies";

export function getWatchlist() {
  const stored = localStorage.getItem(WATCHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToWatchlist(movie) {
  const list = getWatchlist();
  const exists = list.find((item) => item.id === movie.id);
  if (!exists) {
    list.push(movie);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  }
}

export function removeFromWatchlist(movieId) {
  const list = getWatchlist().filter((item) => item.id !== movieId);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}
