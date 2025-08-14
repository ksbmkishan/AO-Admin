import * as actionTypes from "../action-types";

export const getPanchang = payload =>({
    type: actionTypes.GET_PANCHANG,
    payload
})

export const onPanchang = payload =>({
    type: actionTypes.ON_PANCHANG,
    payload
})

export const getPanchangVivah = payload =>({
    type: actionTypes.GET_PANCHANG_VIVAH,
    payload
})

export const onPanchangVivah = payload =>({
    type: actionTypes.ON_PANCHANG_VIVAH,
    payload
})

export const getPanchangSampatti = payload =>({
    type: actionTypes.GET_PANCHANG_MUHURAT_SAMPATTI,
    payload
})

export const onPanchangSampatti = payload =>({
    type: actionTypes.ON_PANCHANG_MUHURAT_SAMPATTI,
    payload
})

export const getPanchangVaahan = payload =>({
    type: actionTypes.GET_PANCHANG_MUHURAT_VAAHAN,
    payload
})

export const onPanchangVaahan = payload =>({
    type: actionTypes.ON_PANCHANG_MUHURAT_VAAHAN,
    payload
})

export const getPanchangGrahPravesh = payload =>({
    type: actionTypes.GET_PANCHANG_GRAHPRAVESH,
    payload
})

export const onPanchangGrahPravesh = payload =>({
    type: actionTypes.ON_PANCHANG_GRAHPRAVESH,
    payload
})