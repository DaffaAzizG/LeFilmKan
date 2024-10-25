import { TOOGLE_THEME } from "../action/ThemeAction";

const nilaiDefault = {
  theme: "light",
};

const themeReducer = (state = nilaiDefault, action) => {
  switch (action.type) {
    case TOOGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

export default themeReducer;
