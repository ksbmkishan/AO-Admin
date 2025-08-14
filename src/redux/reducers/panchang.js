import * as actionTypes from "../action-types";

const initialState = {
  panchang: null,
  panchangVivah: null,
  panchangVaahan: null,
  panchangSampatti: null,
  panchangGrahPravesh: null,
};
 
const panchangReducer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_PANCHANG: {
      return {
        ...state,
        panchang: payload,
      };
    }

    case actionTypes.SET_PANCHANG_VIVAH: {
        return {
            ...state,
            panchangVivah: payload,
        };
    }

    case actionTypes.SET_PANCHANG_MUHURAT_VAAHAN: {
        return {
            ...state,
            panchangVaahan: payload,
        };
      }

    case actionTypes.SET_PANCHANG_MUHURAT_SAMPATTI: {
        return {
            ...state,
            panchangSampatti: payload,
        };
      }

    case actionTypes.SET_PANCHANG_GRAHPRAVESH: {
        return {
            ...state,
            panchangGrahPravesh: payload,
        };
      }
    default: { 
      return state;
    }
  }
};

export default panchangReducer;
