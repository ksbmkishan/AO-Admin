import * as actionTypes from "../action-types";

export const addTemple = payload => ({
    type: actionTypes.GET_ADD_TEMPLE,
    payload
})

export const getTemple = payload => ({
    type: actionTypes.GET_TEMPLE,
     payload
});

export const setTemple = payload => ({
    type: actionTypes.SET_TEMPLE,
     payload
});

export const deleteTempleCategory = (id) => ({
    type: actionTypes.DELETE_TEMPLE_CATEGORY,
    id,
});