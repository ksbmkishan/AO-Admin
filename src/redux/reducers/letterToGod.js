import * as actionTypes from '../action-types/index';

const initialState = {
    letterPrompt: null,
}

const letterToGodReducer = (state = initialState,  actions) => {
    const { payload, type } = actions;
    
      switch (type) { 
        case actionTypes.SET_UPDATE_PROMPT: {
          return {
            ...state,
            letterPrompt: payload,
          };
        }
    
        default: {
          return state;
        }
      }
}

export default letterToGodReducer;