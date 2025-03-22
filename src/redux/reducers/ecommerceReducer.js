import * as actionTypes from "../action-types";

const initialState = {
    ecommerceCategoryData: [],
    ecommerceProductData: [],
    orderHistoryData: [],
};

const ecommerceReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_ECOMMERCE_CATEGORY:
            return { ...state, ecommerceCategoryData: payload };

        case actionTypes.SET_ECOMMERCE_PRODUCT:
            return { ...state, ecommerceProductData: payload };

        case actionTypes.SET_ORDER_HISTORY:
            return { ...state, orderHistoryData: payload };

        default:
            return state;
    }
};

export default ecommerceReducer;
