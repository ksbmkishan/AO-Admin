import * as actionTypes from '../action-types';

const initialState = {
    textModalData: null,
    textModalIsOpen: false,
};

export const commonReducer = (state = initialState, action) => {
    const { payload, type } = action;
    
    switch (type) {
        case actionTypes.OPEN_TEXT_MODAL:
            return { ...state, textModalIsOpen: true, textModalData: payload };

        case actionTypes.CLOSE_TEXT_MODAL:
            return { ...state, textModalIsOpen: false, textModalData: null };

        default: {
            return state;
        }
    }
};

export default commonReducer;