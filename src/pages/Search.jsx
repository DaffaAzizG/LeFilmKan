import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setSearchTerm } from "../store/reducer/filmReducer"; // Import actions
import { Link } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const { searchTerm, movies, loading } = useSelector((state) => state.movies);

  // Fetch movies saat searchTerm berubah
  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchMovies(searchTerm)); // Panggil API ketika searchTerm tidak kosong
    }
  }, [dispatch, searchTerm]);

  // Handle input perubahan untuk search
  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value)); // Simpan input ke Redux
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-5">Search Movies</h1>

      {/* Input untuk search */}
      <input
        type="text"
        placeholder="Search by title..."
        className="p-2 border border-black dark:border-gray-400 bg-white dark:bg-gray-900 rounded mb-4 w-full"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Hanya tampilkan jika searchTerm tidak kosong */}
      {searchTerm && (
        <>
          {/* Tampilkan loading jika masih fetch data */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="mx-auto w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {movies.length > 0 ? (
                movies.map((film) => (
                  <div
                    key={film.id}
                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
                  >
                    <Link to={`/detail/${film.id}`}>
                      <img
                        className="w-full h-full object-cover"
                        src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                        alt={film.title}
                      />
                      <div className="p-2">
                        <h2 className="text-white text-lg font-semibold">
                          {film.title}
                        </h2>
                      </div>
                    </Link>
                    <div className="absolute bottom-0 bg-black bg-opacity-50 p-2 text-white w-full text-sm">
                      {film?.title}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white">No movies found.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
