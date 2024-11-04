import * as actionTypes from "../action-types";

const initialState = {
    termsAndConditionData: '',
    privacyPolicyData: '',
    aboutUsData: '',
};

const staticPageReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_TERMS_AND_CONDITION:
            return { ...state, termsAndConditionData: payload };

        case actionTypes.SET_PRIVACY_POLICY:
            return { ...state, privacyPolicyData: payload };


        case actionTypes.SET_ABOUT_US:
            return { ...state, aboutUsData: payload };

        default: {
            return state;
        }
    }
};

export default staticPageReducer;