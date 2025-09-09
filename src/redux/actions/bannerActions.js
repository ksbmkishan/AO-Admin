import * as actionTypes from "../action-types";

export const uploadAppBanners = payload => ({
    type: actionTypes.UPLOAD_APP_BANNER,
    payload
})

export const uploadWebBanners = payload => ({
    type: actionTypes.UPLOAD_WEB_BANNER,
    payload
})

export const getAppBanners = payload => ({
    type: actionTypes.GET_APP_BANNERS,
    payload
})

export const deleteBanners = payload => ({
    type: actionTypes.DELETE_BANNERS,
    payload
})

export const editBanners = payload => ({
    type: actionTypes.EDIT_BANNERS,
    payload
})

export const changeBannerStatus = payload => ({
    type: actionTypes.CHANGE_BANNER_STATUS,
    payload
});

//! Teerth_Dham
export const uploadAppTeerthDham = payload => ({
    type: actionTypes.UPLOAD_APP_TEERTH_DHAM,
    payload
})

export const uploadWebTeerthDham = payload => ({
    type: actionTypes.UPLOAD_WEB_TEERTH_DHAM,
    payload
})

export const getAppTeerthDham = payload => ({
    type: actionTypes.GET_APP_TEERTH_DHAM,
    payload
})

export const deleteTeerthDham = payload => ({
    type: actionTypes.DELETE_TEERTH_DHAM,
    payload
})

export const editTeerthDham = payload => ({
    type: actionTypes.EDIT_TEERTH_DHAM,
    payload
})

export const changeTeerthDhamStatus = payload => ({
    type: actionTypes.CHANGE_TEERTH_DHAM_STATUS,
    payload
});