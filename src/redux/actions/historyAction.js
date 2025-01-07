import * as actionTypes from "../action-types";

export const getChatHistory = payload => ({
    type: actionTypes.GET_CHAT_HISTORY, payload
});

export const setChatHistory = payload => ({
    type: actionTypes.SET_CHAT_HISTORY, payload
});

export const getCallHistory = payload => ({
    type: actionTypes.GET_CALL_HISTORY, payload
});

export const setCallHistory = payload => ({
    type: actionTypes.SET_CALL_HISTORY, payload
});

export const getVideoCallHistory = payload => ({
    type: actionTypes.GET_VIDEO_CALL_HISTORY, payload
});

export const setVideoCallHistory = payload => ({
    type: actionTypes.SET_VIDEO_CALL_HISTORY, payload
});

export const getLiveHistory = payload => ({
    type: actionTypes.GET_LIVE_HISTORY, payload
});

export const setLiveHistory = payload => ({
    type: actionTypes.SET_LIVE_HISTORY, payload
});

export const getGiftHistory = payload => ({
    type: actionTypes.GET_GIFT_HISTORY, payload
});

export const setGiftHistory = payload => ({
    type: actionTypes.SET_GIFT_HISTORY, payload
});

export const getMudraHistory = payload => ({
    type: actionTypes.GET_MUDRA_HISTORY, payload
});

export const setMudraHistory = payload => ({
    type: actionTypes.SET_MUDRA_HISTORY, payload
});

export const getMudraRequestHistory = payload => ({
    type: actionTypes.GET_MUDRA_REQUEST_HISTORY, payload
});

export const setMudraRequestHistory = payload => ({
    type: actionTypes.SET_MUDRA_REQUEST_HISTORY, payload
});