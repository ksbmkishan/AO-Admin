import * as actionTypes from "../action-types";

const initialState = {
  customerNotificationData: [],
  astrologerNotificationData: [],
};

const notification = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_CUSTOMER_NOTIFICATIONS: {
      return {
        ...state,
        customerNotificationData: payload,
      };
    }

    case actionTypes.SET_ASTROLOGER_NOTIFICATIONS: {
      return {
        ...state,
        astrologerNotificationData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default notification;
