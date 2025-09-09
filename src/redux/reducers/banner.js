import * as actionTypes from "../action-types";

const initialState = {
  appBannerData: null,
  appTeerthDhamData: null,
};

const banners = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_APP_BANNERS: {
      return {
        ...state,
        appBannerData: payload,
      };
    }
    case actionTypes.SET_APP_TEERTH_DHAM: {
      return {
        ...state,
        appTeerthDhamData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default banners;
