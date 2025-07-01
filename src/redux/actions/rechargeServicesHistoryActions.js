import * as actionTypes from "../action-types";

export const getRechargeServicesHistory = payload =>({
    type: actionTypes.GET_RECHARGE_SERVICES_HISTORY,
    payload
})

export const setRechargeServicesHistory = payload =>({
    type: actionTypes.SET_RECHARGE_SERVICES_HISTORY,
    payload
})