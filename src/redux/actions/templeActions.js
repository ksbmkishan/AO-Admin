import * as actionTypes from "../action-types";

export const getTempleFoundation = payload => ({
    type: actionTypes.GET_TEMPLE_FOUNDATION, payload
});

export const setTempleFoundation = payload => ({
    type: actionTypes.SET_TEMPLE_FOUNDATION, payload
});

export const createTempleFoundation = payload => ({
    type: actionTypes.CREATE_TEMPLE_FOUNDATION, payload
});

export const updateTempleFoundation = payload => ({
    type: actionTypes.UPDATE_TEMPLE_FOUNDATION, payload
});

export const deleteTempleFoundation = payload => ({
    type: actionTypes.DELETE_TEMPLE_FOUNDATION, payload
});