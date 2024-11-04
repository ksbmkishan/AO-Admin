import * as actionTypes from '../action-types';

const initialState = {
    chatHistoryData: [],
    callHistoryData: [],
    videoCallHistoryData: [],
    liveHistoryData: [],
    giftHistoryData: []
}

const historyReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_CHAT_HISTORY:
            return { ...state, chatHistoryData: payload };

        case actionTypes.SET_CALL_HISTORY:
            return { ...state, callHistoryData: payload };

        case actionTypes.SET_VIDEO_CALL_HISTORY:
            return { ...state, videoCallHistoryData: payload };

        case actionTypes.SET_LIVE_HISTORY:
            return { ...state, liveHistoryData: payload };

        case actionTypes.SET_GIFT_HISTORY:
            return { ...state, giftHistoryData: payload };

        default:
            return state;
    }
};

export default historyReducer;