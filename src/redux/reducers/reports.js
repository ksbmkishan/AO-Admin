import * as actionTypes from "../action-types";

const initialState = {
  adminEarningData: null,
  reciptSummaryData: null,
};
 
const reports = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ADMIN_EARNINGS: {
      return {
        ...state,
        adminEarningData: payload,
      };
    }

    case actionTypes.SET_RECIEPT_SUMMARY: {
      return {
        ...state,
        reciptSummaryData: payload,
      };
    }


    default: { 
      return state;
    }
  }
};

export default reports;
