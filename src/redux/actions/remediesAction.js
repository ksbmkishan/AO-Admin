import * as actionTypes from "../action-types";

export const getRemedies = (payload) => ({
  type: actionTypes.GET_REMEDIES, payload
});

export const setRemedies = (payload) => ({
  type: actionTypes.SET_REMEDIES, payload
});

export const createRemedies = payload => ({
  type: actionTypes.CREATE_REMEDIES, payload
})

export const updateRemedies = payload => ({
  type: actionTypes.UPDATE_REMEDIES, payload
})

export const deleteRemedies = payload => ({
  type: actionTypes.DELETE_REMEDIES, payload
})
