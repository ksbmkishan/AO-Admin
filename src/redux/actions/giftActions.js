import * as actionTypes from "../action-types";

export const createGift = payload => ({
    type: actionTypes.CREATE_GIFT,
    payload
})

export const getGiftData = payload => ({
    type: actionTypes.GET_ALL_GIFT,
    payload
})

export const setGiftData = payload => ({
    type: actionTypes.SET_ALL_GIFT,
    payload
})

export const updateGift = payload => ({
    type: actionTypes.UPDATE_GIFT,
    payload
})

export const deleteGift = payload => ({
    type: actionTypes.DELETE_GIFT,
    payload
})