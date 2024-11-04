import * as actionTypes from "../action-types";

const initialState = {
    giftData: null,
};

const gift = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_ALL_GIFT: {
            return {
                ...state,
                giftData: payload,
            };
        }

        default: {
            return state;
        }
    }
};

export default gift;