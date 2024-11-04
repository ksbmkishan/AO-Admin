import * as actionTypes from "../action-types";

export const createRechargePlan = payload =>({
    type: actionTypes.CREATE_RECHARGE_PLAN,
    payload
})

export const getRechargePlan = payload =>({
    type: actionTypes.GET_RECHARGE_PLAN,
    payload
})

export const setRechargePlan = payload =>({
    type: actionTypes.SET_RECHARGE_PLAN,
    payload
})

export const updateRechargePlan = payload =>({
    type: actionTypes.UPDATE_RECHARGE_PLAN,
    payload
})

export const deleteRechargePlan = payload =>({
    type: actionTypes.DELETE_RECHARGE_PLAN,
    payload
})

export const updateRechargePlanStatus = payload =>({
    type: actionTypes.UPDATE_RECHARGE_PLAN_STATUS,
    payload
})

export const createFirstRechargeOffer = payload =>({
    type: actionTypes.CREATE_FIRST_RECHARGE_OFFER,
    payload
})

export const getFirstRechargeOffer = payload =>({
    type: actionTypes.GET_FIRST_RECHARGE_OFFER,
    payload
})

export const deleteFirstRechargeOffer = payload =>({
    type: actionTypes.DELETE_FIRST_RECHARGE_OFFER,
    payload
})

export const updateFirstRechargeOfferStatus = payload =>({
    type: actionTypes.UPDATE_FIRST_RECHARGE_OFFER_STATUS,
    payload
})

export const updateFirstRechargeOffer = payload =>({
    type: actionTypes.UPDATE_FIRST_RECHARGE_OFFER,
    payload
})