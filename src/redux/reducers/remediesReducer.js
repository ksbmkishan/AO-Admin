import * as actionTypes from "../action-types";

const initialState = {
  remediesData: [],
};

const remediesReducer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_REMEDIES:
      return { ...state, remediesData: payload };

    default: {
      return state;
    }
  }
};

export default remediesReducer;