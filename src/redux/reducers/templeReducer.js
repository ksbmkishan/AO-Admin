import * as actionTypes from "../action-types";

const initialState = {
    templeDarshanData: [],
    templeDarshanByIdData: [],
    templeAssetCategoryData: [],
    templeAssetSubCategoryData: [],

};

const templeReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_TEMPLE_DARSHAN:
            return { ...state, templeDarshanData: payload };

        case actionTypes.SET_TEMPLE_DARSHAN_BY_ID:
            return { ...state, templeDarshanByIdData: payload };

        case actionTypes.SET_TEMPLE_ASSET_CATEGORY:
            return { ...state, templeAssetCategoryData: payload };

        case actionTypes.SET_TEMPLE_ASSET_SUB_CATEGORY:
            return { ...state, templeAssetSubCategoryData: payload };

        default: {
            return state;
        }
    }
};

export default templeReducer;