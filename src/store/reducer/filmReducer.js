// src/store/reducer/filmReducer.js
const initialState = {
  searchTerm: "",
  movies: [],
  loading: false,
  error: null,
};

export const setSearchTerm = (term) => ({
  type: "SET_SEARCH_TERM",
  payload: term,
});

export const fetchMoviesSuccess = (movies) => ({
  type: "FETCH_MOVIES_SUCCESS",
  payload: movies,
});

export const fetchMoviesRequest = () => ({
  type: "FETCH_MOVIES_REQUEST",
});

export const fetchMoviesFailure = (error) => ({
  type: "FETCH_MOVIES_FAILURE",
  payload: error,
});

// Thunk untuk fetch film berdasarkan judul
export const fetchMovies = (searchTerm) => {
  return async (dispatch) => {
    if (!searchTerm) return; // Tidak fetch jika searchTerm kosong
    dispatch(fetchMoviesRequest());
    try {
      const apiKey = "a5cd991ac31663b6218651adacb93b30"; // Ganti dengan API key kamu
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );
      const data = await response.json();
      dispatch(fetchMoviesSuccess(data.results));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.toString()));
    }
  };
};

const filmReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "FETCH_MOVIES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_MOVIES_SUCCESS":
      return { ...state, loading: false, movies: action.payload };
    case "FETCH_MOVIES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default filmReducer;
