import * as actionTypes from "../action-types";

export const getTempleDarshan = payload => ({
    type: actionTypes.GET_TEMPLE_DARSHAN, payload
});

export const setTempleDarshan = payload => ({
    type: actionTypes.SET_TEMPLE_DARSHAN, payload
});

export const getTempleDarshanById = payload => ({
    type: actionTypes.GET_TEMPLE_DARSHAN_BY_ID, payload
});

export const setTempleDarshanById = payload => ({
    type: actionTypes.SET_TEMPLE_DARSHAN_BY_ID, payload
});

export const createTempleDarshan = payload => ({
    type: actionTypes.CREATE_TEMPLE_DARSHAN, payload
});

export const updateTempleDarshan = payload => ({
    type: actionTypes.UPDATE_TEMPLE_DARSHAN, payload
});

export const deleteTempleDarshan = payload => ({
    type: actionTypes.DELETE_TEMPLE_DARSHAN, payload
});

//! Asset Category
export const getTempleAssetCategory = payload => ({
    type: actionTypes.GET_TEMPLE_ASSET_CATEGORY, payload
});

export const setTempleAssetCategory = payload => ({
    type: actionTypes.SET_TEMPLE_ASSET_CATEGORY, payload
});

export const createTempleAssetCategory = payload => ({
    type: actionTypes.CREATE_TEMPLE_ASSET_CATEGORY, payload
});

export const updateTempleAssetCategory = payload => ({
    type: actionTypes.UPDATE_TEMPLE_ASSET_CATEGORY, payload
});

export const deleteTempleAssetCategory = payload => ({
    type: actionTypes.DELETE_TEMPLE_ASSET_CATEGORY, payload
});

//! Asset Sub Category
export const getTempleAssetSubCategory = payload => ({
    type: actionTypes.GET_TEMPLE_ASSET_SUB_CATEGORY, payload
});

export const setTempleAssetSubCategory = payload => ({
    type: actionTypes.SET_TEMPLE_ASSET_SUB_CATEGORY, payload
});

export const createTempleAssetSubCategory = payload => ({
    type: actionTypes.CREATE_TEMPLE_ASSET_SUB_CATEGORY, payload
});

export const updateTempleAssetSubCategory = payload => ({
    type: actionTypes.UPDATE_TEMPLE_ASSET_SUB_CATEGORY, payload
});

export const deleteTempleAssetSubCategory = payload => ({
    type: actionTypes.DELETE_TEMPLE_ASSET_SUB_CATEGORY, payload
});


// export const addTemple = payload => ({
//     type: actionTypes.GET_ADD_TEMPLE, payload
// })

// export const getTemple = payload => ({
//     type: actionTypes.GET_TEMPLE, payload
// });

// export const setTemple = payload => ({
//     type: actionTypes.SET_TEMPLE, payload
// });

// export const deleteTempleCategory = (id) => ({
//     type: actionTypes.DELETE_TEMPLE_CATEGORY,
//     id,
// });