import React from "react";

export default function GenreChips({ genres, selectedIds, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {genres.map((g) => {
        const active = selectedIds.includes(g.id);
        return (
          <button
            key={g.id}
            onClick={() => onToggle(g.id)}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm transition
              ${active
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-red-700"}
            `}
          >
            {g.name}
          </button>
        );
      })}
    </div>
  );
}
