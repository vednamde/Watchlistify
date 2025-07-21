import React from "react";

export default function HeroBanner({ movie }) {
  return (
    <div className="hero-banner bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{movie.title || movie.name}</h2>
      <p>{movie.overview}</p>
    </div>
  );
}
