import * as actionTypes from "../action-types";

const initialState = {
    astromallCategoryData: [],
    astromallProductData: [],
    allProductData:[],
    orderHistoryData:[],
};

const astromallReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_ASTRO_MALL_CATEGORY: {
            return {
                ...state,
                astromallCategoryData: payload,
            };
        }
        case actionTypes.SET_ASTRO_MALL_PRODUCT: {
            return {
                ...state,
                astromallProductData: payload,
            };
        }
        case actionTypes.SET_ALL_PRODUCTS: {
            return {
                ...state,
                allProductData: payload,
            };
        }
        case actionTypes.SET_ORDER_HISTORY: {
            return {
                ...state,
                orderHistoryData: payload,
            };
        }
       
        default: {
            return state;
        }
    }
};

export default astromallReducer;
