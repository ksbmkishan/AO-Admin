import * as actionTypes from "../action-types";

const initialState = {
   templeFoundation:   [],

};

const templeFoundationReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_TEMPLE_FOUNDATION:
            return { ...state, templeFoundation: payload };
        default: {
            return state;
        }
    }
};

export default templeFoundationReducer;