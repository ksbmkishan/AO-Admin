import * as actionTypes from "../action-types";

const initialState = {
  appBannerData: null,
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

    default: {
      return state;
    }
  }
};

export default banners;
