// Action types
export const ADD_RATED_MOVIE = "ADD_RATED_MOVIE";

// Action creator
export const addRatedMovie = (movie) => {
  return {
    type: "ADD_RATED_MOVIE",
    payload: movie,
  };
};

export const loadRatedMovies = (movies) => {
  return {
    type: "LOAD_RATED_MOVIES",
    payload: movies,
  };
};

// Action untuk menghapus film
export const deleteRatedMovie = (movieId) => {
  return {
    type: "DELETE_RATED_MOVIE",
    payload: movieId,
  };
};
