import * as actionTypes from "../action-types";

const initialState = {
  languageData: null,
};

const language = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) { 
    case actionTypes.SET_ALL_LANGUAGE: {
      return {
        ...state,
        languageData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default language;
