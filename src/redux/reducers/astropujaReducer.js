import * as actionTypes from "../action-types";

const initialState = {
    pujaData: [],
    pujaRequestData: [],
    pujaBookedData: [],
    pujaHistoryData: [],
};

const astropujaReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_PUJA:
            return { pujaData: payload }

        case actionTypes?.SET_PUJA_REQUEST:
            return { pujaRequestData: payload }

        case actionTypes?.SET_PUJA_BOOKED:
            return { pujaBookedData: payload }

        case actionTypes?.SET_PUJA_HISTORY:
            return { pujaHistoryData: payload }

        default: {
            return state;
        }
    }
};

export default astropujaReducer;