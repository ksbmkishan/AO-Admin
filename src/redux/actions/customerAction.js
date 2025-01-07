import * as actionTypes from '../action-types';

export const getCustomer = payload => ({
    type: actionTypes?.GET_CUSTOMER, payload
});

export const setCustomer = payload => ({
    type: actionTypes?.SET_CUSTOMER, payload
});

export const getCustomerById = payload => ({
    type: actionTypes?.GET_CUSTOMER_BY_ID, payload
});

export const setCustomerById = payload => ({
    type: actionTypes?.SET_CUSTOMER_BY_ID, payload
});

export const createCustomer = payload => ({
    type: actionTypes?.CREATE_CUSTOMER, payload
});

export const updateCustomerById = payload => ({
    type: actionTypes?.UPDATE_CUSTOMER_BY_ID, payload
});

export const deleteCustomerById = payload => ({
    type: actionTypes?.DELETE_CUSTOMER_BY_ID, payload
});

export const changeCustomerBannedUnbannedStatus = payload => ({
    type: actionTypes?.CHANGE_CUSTOMER_BANNED_UNBANNED_STATUS, payload
});

export const updateWalletByCustomerId = payload => ({
    type: actionTypes?.UPDATE_WALLET_BY_CUSTOMER_ID, payload
});

export const getChatHistoryByCustomerId = payload => ({
    type: actionTypes?.GET_CHAT_HISTORY_BY_CUSTOMER_ID, payload
});

export const setChatHistoryByCustomerId = payload => ({
    type: actionTypes?.SET_CHAT_HISTORY_BY_CUSTOMER_ID, payload
});

export const getCallHistoryByCustomerId = payload => ({
    type: actionTypes?.GET_CALL_HISTORY_BY_CUSTOMER_ID, payload
});

export const setCallHistoryByCustomerId = payload => ({
    type: actionTypes?.SET_CALL_HISTORY_BY_CUSTOMER_ID, payload
});

export const getVideoCallHistoryByCustomerId = payload => ({
    type: actionTypes?.GET_VIDEO_CALL_HISTORY_BY_CUSTOMER_ID, payload
});

export const setVideoCallHistoryByCustomerId = payload => ({
    type: actionTypes?.SET_VIDEO_CALL_HISTORY_BY_CUSTOMER_ID, payload
});

export const getLiveHistoryByCustomerId = payload => ({
    type: actionTypes?.GET_LIVE_HISTORY_BY_CUSTOMER_ID, payload
});

export const setLiveHistoryByCustomerId = payload => ({
    type: actionTypes?.SET_LIVE_HISTORY_BY_CUSTOMER_ID, payload
});

export const getPujaHistoryByCustomerId = payload => ({
    type: actionTypes?.GET_PUJA_HISTORY_BY_CUSTOMER_ID, payload
});

export const setPujaHistoryByCustomerId = payload => ({
    type: actionTypes?.SET_PUJA_HISTORY_BY_CUSTOMER_ID, payload
});

export const getOrderHistoryByCustomerId = payload => ({
    type: actionTypes?.GET_ORDER_HISTORY_BY_CUSTOMER_ID, payload
});

export const setOrderHistoryByCustomerId = payload => ({
    type: actionTypes?.SET_ORDER_HISTORY_BY_CUSTOMER_ID, payload
});

export const getFollowingHistoryByCustomerId = payload => ({
    type: actionTypes?.GET_FOLLOWING_HISTORY_BY_CUSTOMER_ID, payload
});

export const setFollowingHistoryByCustomerId = payload => ({
    type: actionTypes?.SET_FOLLOWING_HISTORY_BY_CUSTOMER_ID, payload
});

export const getReviewHistoryByCustomerId = payload => ({
    type: actionTypes.GET_REVIEW_HISTORY_BY_CUSTOMER_ID, payload
});

export const setReviewHistoryByCustomerId = payload => ({
    type: actionTypes.SET_REVIEW_HISTORY_BY_CUSTOMER_ID, payload
});

export const getMudraHistoryByCustomerId = payload => ({
    type: actionTypes.GET_MUDRA_HISTORY_BY_CUSTOMER_ID, payload
});

export const setMudraHistoryByCustomerId = payload => ({
    type: actionTypes.SET_MUDRA_HISTORY_BY_CUSTOMER_ID, payload
});

export const getMudraRequestHistoryByCustomerId = payload => ({
    type: actionTypes.GET_MUDRA_REQUEST_HISTORY_BY_CUSTOMER_ID, payload
});

export const setMudraRequestHistoryByCustomerId = payload => ({
    type: actionTypes.SET_MUDRA_REQUEST_HISTORY_BY_CUSTOMER_ID, payload
});