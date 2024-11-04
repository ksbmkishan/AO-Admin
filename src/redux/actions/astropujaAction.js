import * as actionTypes from "../action-types";

export const getPuja = payload => ({
    type: actionTypes.GET_PUJA, payload
});

export const setPuja = payload => ({
    type: actionTypes.SET_PUJA, payload
});

export const createPuja = payload => ({
    type: actionTypes.CREATE_PUJA, payload
});

export const updatePuja = payload => ({
    type: actionTypes.UPDATE_PUJA, payload
});

export const deletePuja = payload => ({
    type: actionTypes.DELETE_PUJA, payload
});

export const getPujaRequest = payload => ({
    type: actionTypes.GET_PUJA_REQUEST, payload
});

export const setPujaRequest = payload => ({
    type: actionTypes.SET_PUJA_REQUEST, payload
});

export const assignPuja = payload => ({
    type: actionTypes.ASSIGN_PUJA, payload
});

export const changePujaStatus = payload => ({
    type: actionTypes.CHANGE_PUJA_STATUS, payload
});

export const getPujaBooked = payload => ({
    type: actionTypes.GET_PUJA_BOOKED, payload
});

export const setPujaBooked = payload => ({
    type: actionTypes.SET_PUJA_BOOKED, payload
});

export const getPujaHistory = payload => ({
    type: actionTypes.GET_PUJA_HISTORY, payload
});