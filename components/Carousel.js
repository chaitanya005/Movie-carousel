import Image from "next/image";
import React, { useCallback, useRef } from "react";
import MovieCard from "./MovieCard";

const Carousel = ({ topRatedMovies }) => {
  const carouselRef = useRef(null);
  const handleClick = useCallback((direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="w-56 my-6 text-lg font-semibold text-zinc-300 transition duration-200 md:text-2xl">
        {"Top Rated Movies"}
      </h2>

      <div className="group relative md:ml-2 lg:h-[30vh]">
        <button
          className="absolute top-0 lg:-top-[5rem] bottom-0 left-2 z-40 m-auto cursor-pointer opacity-0 transition hover:scale-150 group-hover:opacity-100"
          onClick={() => handleClick("left")}
        >
          &lt;
        </button>

        <div
          ref={carouselRef}
          className="flex h-full space-x-3 no-scrollbar overflow-x-scroll overflow-y-hidden"
        >
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          className="absolute top-0 lg:-top-[5rem] bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-150 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
