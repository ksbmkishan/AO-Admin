import * as actionTypes from "../action-types";

export const getAdminEarnings = payload =>({
    type: actionTypes.GET_ADMIN_EARNINGS,
    payload
})

export const setAdminEarnings = payload =>({
    type: actionTypes.SET_ADMIN_EARNINGS,
    payload
})

export const getRecieptSummary = payload =>({
    type: actionTypes.GET_RECIEPT_SUMMARY,
    payload
})

export const setRceciptSummary = payload =>({
    type: actionTypes.SET_RECIEPT_SUMMARY,
    payload
})