// components/Genres.js
import React, { useEffect, useState } from 'react';
import { getAllGenres } from '../services/genres';
import GenreChips from './GenreChips';

const Genres = ({ selectedGenres, setSelectedGenres }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getAllGenres();
      if (data && data.genres) {
        setGenres(data.genres);
      }
    };

    fetchGenres();
  }, []);

  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2">
      <GenreChips
        genres={genres}
        selectedIds={selectedGenres}
        onToggle={toggleGenre}
      />
    </div>
  );
};

export default Genres;
