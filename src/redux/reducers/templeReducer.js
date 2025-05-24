import * as actionTypes from "../action-types";

const initialState = {
    templeDarshanData: [],
    templeDarshanByIdData: [],
    templeAssetsData: [],
    templeAssetsItemsByAssetsIdData: [],
    templeLiveLinkData: [],
    templeMandir: [],

};

const templeReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_TEMPLE_DARSHAN:
            return { ...state, templeDarshanData: payload };

        case actionTypes.SET_TEMPLE_DARSHAN_BY_ID:
            return { ...state, templeDarshanByIdData: payload };

        case actionTypes.SET_TEMPLE_ASSETS:
            return { ...state, templeAssetsData: payload };

        case actionTypes.SET_TEMPLE_ASSETS_ITEMS_BY_ASSETS_ID:
            return { ...state, templeAssetsItemsByAssetsIdData: payload };

        case actionTypes.SET_TEMPLE_LIVE_LINK:
            return { ...state, templeLiveLinkData: payload };

        case actionTypes.SET_TEMPLE_MANDIR:
            return { ...state, templeMandir: payload };
        default: {
            return state;
        }
    }
};

export default templeReducer;