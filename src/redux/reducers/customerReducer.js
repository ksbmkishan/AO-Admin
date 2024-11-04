import * as actionTypes from '../action-types';

const initialState = {
    customerData: [],
    customerByIdData: {},
    chatHistoryByCustomerIdData: [],
    callHistoryByCustomerIdData: [],
    videoCallHistoryByCustomerIdData: [],
    liveHistoryByCustomerIdData: [],
    pujaHistoryByCustomerIdData: [],
    orderHistoryByCustomerIdData: [],
    followingHistoryByCustomerIdData: [],
    reviewHistoryByCustomerIdData: [],
};

export const customerReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_CUSTOMER:
            return { ...state, customerData: payload }

        case actionTypes.SET_CUSTOMER_BY_ID:
            return { ...state, customerByIdData: payload }

        case actionTypes.SET_CHAT_HISTORY_BY_CUSTOMER_ID:
            return { ...state, chatHistoryByCustomerIdData: payload }

        case actionTypes.SET_CALL_HISTORY_BY_CUSTOMER_ID:
            return { ...state, callHistoryByCustomerIdData: payload }

        case actionTypes.SET_VIDEO_CALL_HISTORY_BY_CUSTOMER_ID:
            return { ...state, videoCallHistoryByCustomerIdData: payload }

        case actionTypes.SET_LIVE_HISTORY_BY_CUSTOMER_ID:
            return { ...state, liveHistoryByCustomerIdData: payload }

        case actionTypes.SET_PUJA_HISTORY_BY_CUSTOMER_ID:
            return { ...state, pujaHistoryByCustomerIdData: payload }

        case actionTypes.SET_ORDER_HISTORY_BY_CUSTOMER_ID:
            return { ...state, orderHistoryByCustomerIdData: payload }

        case actionTypes.SET_FOLLOWING_HISTORY_BY_CUSTOMER_ID:
            return { ...state, followingHistoryByCustomerIdData: payload }

        case actionTypes.SET_REVIEW_HISTORY_BY_CUSTOMER_ID:
            return { ...state, reviewHistoryByCustomerIdData: payload }

        default:
            return state;
    }
};

export default customerReducer;