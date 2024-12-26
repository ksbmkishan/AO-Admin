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

//! Asset
export const getTempleAssets = payload => ({
    type: actionTypes.GET_TEMPLE_ASSETS, payload
});

export const setTempleAssets = payload => ({
    type: actionTypes.SET_TEMPLE_ASSETS, payload
});

export const createTempleAssets = payload => ({
    type: actionTypes.CREATE_TEMPLE_ASSETS, payload
});

export const updateTempleAssets = payload => ({
    type: actionTypes.UPDATE_TEMPLE_ASSETS, payload
});

export const deleteTempleAssets = payload => ({
    type: actionTypes.DELETE_TEMPLE_ASSETS, payload
});

//! Assets Items
export const getTempleAssetsItemsByAssetsId = payload => ({
    type: actionTypes.GET_TEMPLE_ASSETS_ITEMS_BY_ASSETS_ID, payload
});

export const setTempleAssetsItemsByAssetsId = payload => ({
    type: actionTypes.SET_TEMPLE_ASSETS_ITEMS_BY_ASSETS_ID, payload
});

export const createTempleAssetsItems = payload => ({
    type: actionTypes.CREATE_TEMPLE_ASSETS_ITEMS, payload
});

export const updateTempleAssetsItems = payload => ({
    type: actionTypes.UPDATE_TEMPLE_ASSETS_ITEMS, payload
});

export const deleteTempleAssetsItems = payload => ({
    type: actionTypes.DELETE_TEMPLE_ASSETS_ITEMS, payload
});