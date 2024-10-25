import { ADD_RATED_MOVIE } from "../action/ratedMovieAction";

const initialState = {
  ratedMovies: [],
};

const ratedMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RATED_MOVIE":
      return {
        ...state,
        ratedMovies: [...state.ratedMovies, action.payload],
      };
    case "LOAD_RATED_MOVIES":
      return {
        ...state,
        ratedMovies: action.payload,
      };
    case "DELETE_RATED_MOVIE":
      return {
        ...state,
        ratedMovies: state.ratedMovies.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default ratedMovieReducer;
