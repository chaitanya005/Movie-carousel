import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MovieDetails from "./MovieDetails";

const MovieCard = ({ movie }) => {
  const [movieId, setMovieId] = useState(null);

  const handleModalClose = () => {
    setMovieId(null);
  };

  return (
    <div>
      <div className="flex relative" onClick={() => setMovieId(movie?.id)}>
        <div
          className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-40 md:min-w-[260px] md:hover:scale-105 hover:rounded-t-md`}
        >
          <Image
            className="relative rounded-sm object-cover md:rounded delay-300 hover:rounded-t-md"
            src={`https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`}
            fill
            alt={movie.title}
          />
          <div className="transition duration-200 h-40 transform translate-y-8 opacity-0 hover:opacity-100">
            <div className="absolute top-[120px] h-20 min-w-[180px] md:min-w-[260px] bg-zinc-800 border-slate-900 rounded-b-md">
              <div className="m-3 mt-2 text-[#e5e5e5]">
                <div className="text-md">{movie.title.slice(0, 25)}...</div>
                <div className="mt-1 text-xs text-gray-500">
                  {movie.overview.slice(0, 70)}...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MovieDetails
        movieId={movieId}
        setMovieId={setMovieId}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};

export default MovieCard;
