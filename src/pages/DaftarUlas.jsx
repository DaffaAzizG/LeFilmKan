import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadRatedMovies,
  deleteRatedMovie,
} from "../store/action/ratedMovieAction"; // Import delete action

const DaftarUlas = () => {
  const dispatch = useDispatch();
  const ratedMovies = useSelector((state) => state.ratedMovies.ratedMovies);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    if (savedMovies.length > 0) {
      dispatch(loadRatedMovies(savedMovies));
    }
  }, [dispatch]);

  // Fungsi untuk menghapus film
  const handleDelete = (movieId) => {
    const updatedMovies = ratedMovies.filter((movie) => movie.id !== movieId);

    // Update Local Storage
    localStorage.setItem("ratedMovies", JSON.stringify(updatedMovies));

    // Update Redux store
    dispatch(deleteRatedMovie(movieId));
  };

  return (
    <div className="mx-auto w-full px-8 py-6 bg-white dark:bg-black ">
      <h2 className="text-3xl font-semibold text-Black dark:text-white mb-6">
        Daftar Ulas
      </h2>
      {ratedMovies.length > 0 ? (
        <div className="carousel w-full gap-5">
          {ratedMovies.map((movie) => (
            <div
              key={movie.id}
              className="carousel-item w-64 transform hover:scale-105 transition-transform"
            >
              <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <Link to={`/detail/${movie.id}`}>
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <div className="absolute bottom-0 bg-black bg-opacity-50 p-2 text-white w-full text-sm">
                  {movie.title}
                  <p className="text-yellow-400">
                    Your Rating: {movie.userRating}
                  </p>
                  {/* Tombol Delete */}
                  <button
                    className="text-red-500 mt-2"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-black dark:text-white">No reviews yet!</p>
      )}
    </div>
  );
};

export default DaftarUlas;
