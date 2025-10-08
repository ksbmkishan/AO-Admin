import * as actionTypes from "../action-types";

export const sendCustomerNotification = payload =>({
    type: actionTypes.SEND_CUSTOMER_NOTIFICATIONS,
    payload
})

export const sendAstrologerNotification = payload =>({
    type: actionTypes.SEND_ASTROLOGER_NOTIFICATIONS,
    payload
})

export const getCustomerNotification = payload =>({
    type: actionTypes.GET_CUSTOMER_NOTIFICATIONS,
    payload
})

export const getAstrologerNotification = payload =>({
    type: actionTypes.GET_ASTROLOGER_NOTIFICATIONS,
    payload
})

export const onAaartiNotification = payload => ({
    type: actionTypes.ON_AARTI_NOTIFICATIONS,
    payload
})

export const getAartiNotifications = payload => ({
    type: actionTypes.GET_AARTI_NOTIFICATIONS,
    payload
})

export const deleteAartiNotification = payload => ({
    type: actionTypes.DELETE_AARTI_NOTIFICATIONS,
    payload
})

