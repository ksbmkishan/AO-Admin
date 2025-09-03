import * as actionTypes from "../action-types";

export const onUpdatePrompt = (payload) => ({
  type: actionTypes.ON_UPDATE_PROMPT,
  payload,
});

export const getUpdatePrompt = (payload) => ({
  type: actionTypes.GET_UPDATE_PROMPT,
  payload,
});


