import * as actionTypes from "../action-types";

const initialState = {
  rechargePlanData: null,
  firstRechareOfferData: null
};

const recharge = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_RECHARGE_PLAN: {
      return {
        ...state,
        rechargePlanData: payload,
      };
    }
    
    case actionTypes.SET_FIRST_RECHARGE_OFFER: {
      return {
        ...state,
        firstRechareOfferData: payload,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default recharge;
