import * as actionTypes from "../action-types";

export const getReligiousCategory = payload => ({
    type: actionTypes.GET_RELIGIOUS_CATEGORY, payload
});

export const setReligiousCategory = payload => ({
    type: actionTypes.SET_RELIGIOUS_CATEGORY, payload
});

export const createReligiousCategory = payload => ({
    type: actionTypes.CREATE_RELIGIOUS_CATEGORY, payload
});

export const updateReligiousCategory = payload => ({
    type: actionTypes.UPDATE_RELIGIOUS_CATEGORY, payload
});

export const deleteReligiousCategory = payload => ({
    type: actionTypes.DELETE_RELIGIOUS_CATEGORY, payload
});

export const getReligiousSubCategory = payload => ({
    type: actionTypes.GET_RELIGIOUS_SUB_CATEGORY, payload
});

export const setReligiousSubCategory = payload => ({
    type: actionTypes.SET_RELIGIOUS_SUB_CATEGORY, payload
});

export const createReligiousSubCategory = payload => ({
    type: actionTypes.CREATE_RELIGIOUS_SUB_CATEGORY, payload
});

export const updateReligiousSubCategory = payload => ({
    type: actionTypes.UPDATE_RELIGIOUS_SUB_CATEGORY, payload
});

export const deleteReligiouSubCategory = payload => ({
    type: actionTypes.DELETE_RELIGIOUS_SUB_CATEGORY, payload
});