import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getMovieCastDetails, getMovieDetails } from "../pages/api/tmdb";

const MovieDetails = ({ movieId, handleModalClose }) => {
  const [movieData, setMovieData] = useState({
    movieDetails: null,
    castDetails: null,
    loading: true,
  });
  const modalRef = useRef();

  useEffect(() => {
    if (!!movieId) {
      const fetchData = async () => {
        try {
          const [movieResponse, castResponse] = await Promise.all([
            getMovieDetails(movieId),
            getMovieCastDetails(movieId),
          ]);

          const allCast = castResponse?.cast?.map(
            (item) => item.original_name + ", "
          );

          setMovieData({
            movieDetails: movieResponse,
            castDetails: allCast,
            loading: false,
          });
        } catch (error) {
          console.error("Error fetching movie details:", error);
          setMovieData((prevData) => ({ ...prevData, loading: false }));
        }
      };
      fetchData();
    }
  }, [movieId]);

  const durationTime = useMemo(() => {
    return (
      "" +
      Math.floor(movieData?.movieDetails?.runtime / 60) +
      "h " +
      (Math.floor(movieData?.movieDetails?.runtime % 60) <= 9 ? +"0" : "") +
      Math.floor(movieData?.movieDetails?.runtime % 60) +
      "m"
    );
  }, [movieData?.movieDetails]);

  const releasedDate = useMemo(() => {
    return new Date(movieData?.movieDetails?.release_date).toDateString();
  }, [movieData?.movieDetails]);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleModalClose();
    }
  };

  if (!!movieId && movieData?.loading) {
    return (
      <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
        <div className="relative w-auto mx-auto max-w-3xl rounded-lg overflow-hidden">
          <div
            className={`scale-100 transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
          >
            <div className="animate-pulse p-5 w-[600px]">
              <div className="flex flex-row">
                <div>
                  <div className="opacity-60 object-cover w-[300px] h-[150px] bg-zinc-700 max-w-[300px] rounded mt-3"></div>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  </div>
                </div>
                <div className="flex-1 space-y-6 py-1 m-3">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        !!movieId ? "visible " : "invisible translate-y-96 transform ease-in"
      } z-50 transition duration-300 bg-black bg-opacity-90 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0`}
      onClick={handleOutsideClick}
    >
      <div
        className={`${
          !!movieId
            ? "translate-y-0 transform ease-out"
            : "translate-y-96 transform ease-in"
        } max-md:m-5 relative transition-all w-auto mx-auto max-w-3xl rounded-lg overflow-hidden md:m-0
        `}
        ref={modalRef}
      >
        <div
          className={`scale-100 transition duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative flex flex-col md:flex-row max-md:max-w-[400px]">
            <div className="w-full md:m-5">
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  movieData?.movieDetails?.backdrop_path ||
                  movieData?.movieDetails?.poster_path
                }`}
                alt={movieData?.movieDetails?.title}
                className="object-cover md:max-w-[300px] md:rounded"
              />

              <div className="relative mt-2 max-md:mx-5 text-sm text-zinc-300 flex flex-row justify-between">
                <p>{releasedDate}</p>
                <p>{durationTime}</p>
              </div>
            </div>
            <div className="relative m-5">
              <>
                <p className="text-2xl lg:text-3xl font-bold mb-4 text-zinc-300">
                  {movieData?.movieDetails?.title}
                </p>
                <p className="text-sm text-zinc-500">
                  {movieData?.movieDetails?.overview}
                </p>

                <div className="mt-5">
                  <span className="text-zinc-500">Cast: </span>
                  {movieData?.castDetails?.slice(0, 8)?.map((item, i) => (
                    <span className="headerLink" key={i}>
                      {i == 7 ? item.split(",") : item}
                    </span>
                  ))}
                </div>
              </>
            </div>
            <button className="absolute right-1 m-3">
              <Image
                className="p-1 cursor-pointer bg-slate-300 rounded-full"
                src="/close-icon.svg"
                height={24}
                width={24}
                alt={"close-icon"}
                onClick={handleModalClose}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
