import { SET_DETAIL } from "../action/detailFilmAction";

const nilaiDefault = {
  detail: {},
};

const detailFilmReducer = (state = nilaiDefault, action) => {
  switch (action.type) {
    case SET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
};
export default detailFilmReducer;
