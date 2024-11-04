import * as actionTypes from '../action-types';

export const getAstrologer = payload => ({
    type: actionTypes?.GET_ASTROLOGER, payload
});

export const setAstrologer = payload => ({
    type: actionTypes?.SET_ASTROLOGER, payload
});

export const getEnquiryAstrologer = payload => ({
    type: actionTypes?.GET_ENQUIRY_ASTROLOGER, payload
});

export const setEnquiryAstrologer = payload => ({
    type: actionTypes?.SET_ENQUIRY_ASTROLOGER, payload
});

export const getAstrologerById = payload => ({
    type: actionTypes?.GET_ASTROLOGER_BY_ID, payload
});

export const setAstrologerById = payload => ({
    type: actionTypes?.SET_ASTROLOGER_BY_ID, payload
});

export const createAstrologer = payload => ({
    type: actionTypes?.CREATE_ASTROLOGER, payload
});

export const updateAstrologerById = payload => ({
    type: actionTypes?.UPDATE_ASTROLOGER_BY_ID, payload
});

export const deleteAstrologerById = payload => ({
    type: actionTypes?.DELETE_ASTROLOGER_BY_ID, payload
});

export const getChatHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_CHAT_HISTORY_BY_ASTROLOGER_ID, payload
});

export const setChatHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_CHAT_HISTORY_BY_ASTROLOGER_ID, payload
});

export const getCallHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_CALL_HISTORY_BY_ASTROLOGER_ID, payload
});

export const setCallHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_CALL_HISTORY_BY_ASTROLOGER_ID, payload
});

export const getVideoCallHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_VIDEO_CALL_HISTORY_BY_ASTROLOGER_ID, payload
});

export const setVideoCallHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_VIDEO_CALL_HISTORY_BY_ASTROLOGER_ID, payload
});

export const getLiveHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_LIVE_HISTORY_BY_ASTROLOGER_ID, payload
});

export const setLiveHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_LIVE_HISTORY_BY_ASTROLOGER_ID, payload
});

export const getGiftHistoryByAstrologerId = payload => ({
    type: actionTypes?.GET_GIFT_HISTORY_BY_ASTROLOGER_ID, payload
});

export const setGiftHistoryByAstrologerId = payload => ({
    type: actionTypes?.SET_GIFT_HISTORY_BY_ASTROLOGER_ID, payload
});

export const getReviewByAstrologerId = payload => ({
    type: actionTypes.GET_REVIEW_BY_ASTROLOGER_ID, payload
});

export const setReviewByAstrologerId = payload => ({
    type: actionTypes.SET_REVIEW_BY_ASTROLOGER_ID, payload
});

export const getTransactionHistoryByAstrologerId = payload => ({
    type: actionTypes.GET_TRANSACTION_HISTORY_BY_ASTROLOGER_ID, payload
});

export const setTransactionHistoryByAstrologerId = payload => ({
    type: actionTypes.SET_TRANSACTION_HISTORY_BY_ASTROLOGER_ID, payload
});

export const getPujaHistoryByAstrologerId = payload => ({
    type: actionTypes.GET_PUJA_HISTORY_BY_ASTROLOGER_ID, payload
});

export const setPujaHistoryByAstrologerId = payload => ({
    type: actionTypes.SET_PUJA_HISTORY_BY_ASTROLOGER_ID, payload
});

export const updateWalletByAstrologerId = payload => ({
    type: actionTypes.UPDATE_WALLET_BY_ASTROLOGER_ID, payload
});

export const verifyAstrologerProfile = payload => ({
    type: actionTypes.VERIFY_ASTROLOGER_PROFILE, payload
});

export const changeAstrologerChatStatus = payload => ({
    type: actionTypes.CHANGE_ASTROLOGER_CHAT_STATUS, payload
});

export const changeAstrologerCallStatus = payload => ({
    type: actionTypes.CHANGE_ASTROLOGER_CALL_STATUS, payload
});

export const changeAstrologerVideoCallStatus = payload => ({
    type: actionTypes.CHANGE_ASTROLOGER_VIDEO_CALL_STATUS, payload
});

export const getAstrologerWithdrawalRequest = payload => ({
    type: actionTypes.GET_ASTROLOGER_WITHDRAWAL_REQUEST, payload
});

export const setAstrologerWithdrawalRequest = payload => ({
    type: actionTypes.SET_ASTROLOGER_WITHDRAWAL_REQUEST, payload
});

export const approveAstrologerWithdrawalRequestAmount = payload => ({
    type: actionTypes.APPROVE_ASTROLOGER_WITHDRAWAL_REQUEST_AMOUNT, payload
});