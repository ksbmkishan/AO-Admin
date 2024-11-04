import * as actionTypes from "../action-types";

export const getTermsAndCondition = payload => ({
    type: actionTypes.GET_TERMS_AND_CONDITION, payload
});

export const setTermsAndCondition = payload => ({
    type: actionTypes.SET_TERMS_AND_CONDITION, payload
});

export const createTermsAndCondition = payload => ({
    type: actionTypes.CREATE_TERMS_AND_CONDITION, payload
});

export const getPrivacyPolicy = payload => ({
    type: actionTypes.GET_PRIVACY_POLICY, payload
});

export const setPrivacyPolicy = payload => ({
    type: actionTypes.SET_PRIVACY_POLICY, payload
});

export const createPrivacyPolicy = payload => ({
    type: actionTypes.CREATE_PRIVACY_POLICY, payload
});

export const getAboutUs = payload => ({
    type: actionTypes.GET_ABOUT_US, payload
});

export const setAboutUs = payload => ({
    type: actionTypes.SET_ABOUT_US, payload
});

export const createAboutUs = payload => ({
    type: actionTypes.CREATE_ABOUT_US, payload
});