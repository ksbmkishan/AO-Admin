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