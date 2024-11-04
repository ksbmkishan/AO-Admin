import * as actionTypes from "../action-types";

export const getAllLanguage = (payload) => ({
  type: actionTypes.GET_ALL_LANGUAGE,
  payload,
});

export const setALLLANGUAGE = (payload) => ({
  type: actionTypes.SET_ALL_LANGUAGE,
  payload,
});

export const createLanguage = (payload) => ({
  type: actionTypes.CREATE_LANGUAGE,
  payload,
});

export const updateLanguage = (payload) => ({
  type: actionTypes.UPDATE_LANGUAGE,
  payload,
});

export const deleteLanguage = (payload) => ({
  type: actionTypes.DELETE_LANGUAGE,
  payload,
});
