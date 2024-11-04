import * as actionTypes from "../action-types";

export const getExpertise = (payload) => ({
  type: actionTypes.GET_EXPERTISE, payload
});

export const setExpertise = (payload) => ({
  type: actionTypes.SET_EXPERTISE, payload
});

export const createExpertise = (payload) => ({
  type: actionTypes.CREATE_EXPERTISE, payload
});

export const updateExpertise = (payload) => ({
  type: actionTypes.UPDATE_EXPERTISE, payload
});

export const deleteExpertise = (payload) => ({
  type: actionTypes.DELETE_EXPERTISE, payload
});

export const getMainExpertise = (payload) => ({
  type: actionTypes.GET_MAIN_EXPERTISE, payload
});

export const setMainExpertise = (payload) => ({
  type: actionTypes.SET_MAIN_EXPERTISE, payload
});

export const createMainExpertise = (payload) => ({
  type: actionTypes.CREATE_MAIN_EXPERTISE, payload
});

export const updateMainExpertise = (payload) => ({
  type: actionTypes.UPDATE_MAIN_EXPERTISE, payload
});

export const deleteMainExpertise = (payload) => ({
  type: actionTypes.DELETE_MAIN_EXPERTISE, payload
});