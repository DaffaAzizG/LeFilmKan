import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducer/ThemeReducer";
import detailFilmReducer from "./reducer/detailFilmReducer";
import filmReducer from "./reducer/filmReducer";
import ratedMoviesReducer from "./reducer/ratedMovieReducer.js";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    detail: detailFilmReducer,
    movies: filmReducer,
    ratedMovies: ratedMoviesReducer,
  },
});

export default store;
