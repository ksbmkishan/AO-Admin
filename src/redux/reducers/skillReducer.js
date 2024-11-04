import * as actionTypes from "../action-types";

const initialState = {
  skillData: [],
};

const skillReducer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_SKILL:
      return { ...state, skillData: payload };

    default: {
      return state;
    }
  }
};

export default skillReducer;