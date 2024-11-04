import * as actionTypes from "../action-types";

export const getSkill = payload => ({
    type: actionTypes.GET_SKILL, payload
});

export const setSkill = payload => ({
    type: actionTypes.SET_SKILL, payload
});

export const createSkill = payload => ({
    type: actionTypes.CREATE_SKILL, payload
});

export const updateSkill = payload => ({
    type: actionTypes.UPDATE_SKILL, payload
});

export const deleteSkill = payload => ({
    type: actionTypes.DELETE_SKILL, payload
});