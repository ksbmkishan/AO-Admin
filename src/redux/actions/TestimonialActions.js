import * as actionTypes from "../action-types";

export const getTestimonial = payload => ({
    type: actionTypes.GET_TESTIMONIAL, payload
});

export const setTestimonial = payload => ({
    type: actionTypes.SET_TESTIMONIAL, payload
});

export const createTestimonial = payload => ({
    type: actionTypes.CREATE_TESTIMONIAL, payload
});

export const updateTestimonial = payload => ({
    type: actionTypes.UPDATE_TESTIMONIAL, payload
});

export const deleteTestimonial = payload => ({
    type: actionTypes.DELETE_TESTIMONIAL, payload
});