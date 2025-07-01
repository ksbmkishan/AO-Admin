import * as actionTypes from "../action-types";

const initialState = {
  rechargeServicesHistory: null,
//   firstRechareOfferData: null
};

const rechargeServicesHistory = (state = initialState, actions) => {
  const { payload, type } = actions;

  console.log("CHECK Payload and Type", payload, type)

  switch (type) {
    case actionTypes.SET_RECHARGE_SERVICES_HISTORY: {
      return {
        ...state,
        rechargeServicesHistory: payload,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default rechargeServicesHistory;
