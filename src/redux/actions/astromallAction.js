import * as actionTypes from "../action-types";

export const getAstromallCategory = (payload) => ({
    type: actionTypes.GET_ASTRO_MALL_CATEGORY,
    payload,
});

export const setAstromallCategory = (payload) => ({
    type: actionTypes.SET_ASTRO_MALL_CATEGORY,
    payload,
});

export const createAstromallCategory = (payload) => ({
    type: actionTypes.CREATE_ASTRO_MALL_CATEGORY,
    payload,
});

export const updateAstromallCategory = (payload) => ({
    type: actionTypes.UPDATE_ASTRO_MALL_CATEGORY,
    payload,
});

export const deleteAstromallCategory = (payload) => ({
    type: actionTypes.DELETE_ASTRO_MALL_CATEGORY,
    payload,
});

export const getAstromallProduct = (payload) => ({
    type: actionTypes.GET_ASTRO_MALL_PRODUCT,
    payload,
});

export const setAstromallProduct = (payload) => ({
    type: actionTypes.SET_ASTRO_MALL_PRODUCT,
    payload,
});

export const createAstromallProduct = (payload) => ({
    type: actionTypes.CREATE_ASTRO_MALL_PRODUCT,
    payload,
});

export const updateAstromallProduct = (payload) => ({
    type: actionTypes.UPDATE_ASTRO_MALL_PRODUCT,
    payload,
});

export const deleteAstromallProduct = (payload) => ({
    type: actionTypes.DELETE_ASTRO_MALL_PRODUCT,
    payload,
});

//! All Product Api 
export const getAllProducts = (payload) => ({
    type: actionTypes.GET_ALL_PRODUCTS,
    payload,
});

export const setAllProducts = (payload) => ({
    type: actionTypes.SET_ALL_PRODUCTS,
    payload,
});


export const getOrderHistory = (payload) => ({
    type: actionTypes.GET_ORDER_HISTORY,
    payload,
});
export const setOrderHistory = (payload) => ({
    type: actionTypes.SET_ORDER_HISTORY,
    payload,
});

export const changeOrderStatus = (payload) => ({
    type: actionTypes.CHANGE_ORDER_STATUS,
    payload,
});
