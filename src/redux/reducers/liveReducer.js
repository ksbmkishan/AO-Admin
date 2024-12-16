import * as actionTypes from '../action-types';

const initialState = {
    liveData: [],

};

export const liveReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_LIVE:
            console.log('Updated liveData:', payload); 
            return { ...state, liveData: payload }

       

        default:
            return state;
    }
};

export default liveReducer;