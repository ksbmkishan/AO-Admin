import * as actionTypes from "../action-types";

const initialState = {
    templedata:null,
    templeget:null
};

const templeReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_ADD_TEMPLE:
            return { 
                ...state, 
                templedata: payload 
            };

        case actionTypes.SET_TEMPLE:
            return { 
                ...state, 
                templeget: payload 
            };
       

        default: {
            return state;
        }
    }
};

export default templeReducer;