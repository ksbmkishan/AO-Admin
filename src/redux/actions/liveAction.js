import * as actionTypes from '../action-types';

export const getLive = payload => ({
    type: actionTypes?.GET_LIVE, payload
});

export const setLive = payload => ({
    type: actionTypes?.SET_LIVE, payload
});

export const deleteLive = payload => ({
    type: actionTypes?.DELETE_LIVE, payload
});
