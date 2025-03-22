import * as actionTypes from "../action-types";

export const getEcommerceCategory = (payload) => ({
    type: actionTypes.GET_ECOMMERCE_CATEGORY,
    payload,
});

export const setEcommerceCategory = (payload) => ({
    type: actionTypes.SET_ECOMMERCE_CATEGORY,
    payload,
});

export const createEcommerceCategory = (payload) => ({
    type: actionTypes.CREATE_ECOMMERCE_CATEGORY,
    payload,
});

export const updateEcommerceCategory = (payload) => ({
    type: actionTypes.UPDATE_ECOMMERCE_CATEGORY,
    payload,
});

export const deleteEcommerceCategory = (payload) => ({
    type: actionTypes.DELETE_ECOMMERCE_CATEGORY,
    payload,
});

export const getEcommerceProduct = (payload) => ({
    type: actionTypes.GET_ECOMMERCE_PRODUCT,
    payload,
});

export const setEcommerceProduct = (payload) => ({
    type: actionTypes.SET_ECOMMERCE_PRODUCT,
    payload,
});

export const createEcommerceProduct = (payload) => ({
    type: actionTypes.CREATE_ECOMMERCE_PRODUCT,
    payload,
});

export const updateEcommerceProduct = (payload) => ({
    type: actionTypes.UPDATE_ECOMMERCE_PRODUCT,
    payload,
});

export const deleteEcommerceProduct = (payload) => ({
    type: actionTypes.DELETE_ECOMMERCE_PRODUCT,
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
