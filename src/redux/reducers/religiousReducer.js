import * as actionTypes from "../action-types";

const initialState = {
    religiousCategoryData: [],
    religiousSubCategoryData: [],
};

const religiousReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_RELIGIOUS_CATEGORY: {
            return {
                ...state,
                religiousCategoryData: payload,
            };
        }
        case actionTypes.SET_RELIGIOUS_SUB_CATEGORY: {
            return {
                ...state,
                religiousSubCategoryData: payload,
            };
        }
       
       
        default: {
            return state;
        }
    }
};

export default religiousReducer;
