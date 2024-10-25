import axios from "axios";
export const SET_DETAIL = "SET_DETAIL";

export const setDetail = (detail) => {
  return {
    type: SET_DETAIL,
    payload: detail,
  };
};

export const setFilm = (id) => {
  return async (dispatchDetail) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a5cd991ac31663b6218651adacb93b30&language=en-US`
    );
    const detail = response.data.detail;
    dispatchDetail(setDetail(detail));
  };
};
