import * as actionTypes from "../action-types";

const initialState = {
    testimonialData: [],
};

const testimonialReducer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_TESTIMONIAL:
      return { ...state, testimonialData: payload };

    default: {
      return state;
    }
  }
};

export default testimonialReducer;