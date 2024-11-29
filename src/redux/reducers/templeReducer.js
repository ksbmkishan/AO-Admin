import * as actionTypes from "../action-types";

const initialState = {
    templedata:null
};

const templeReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_ADD_TEMPLE:
            return { 
                ...state, 
                templedata: payload 
            };

       

        default: {
            return state;
        }
    }
};

export default templeReducer;