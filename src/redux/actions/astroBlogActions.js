import * as actionTypes from "../action-types";

export const addAstroBlog = payload =>({
    type: actionTypes.ADD_ASTRO_BLOG,
    payload
  })

export const getAstroBlog = payload =>({
  type: actionTypes.GET_ASTRO_BLOG,
  payload
})

export const setAstroBlog = payload =>({
  type: actionTypes.SET_ASTRO_BLOG,
  payload
})

export const deleteAstroBlog = payload =>({
  type: actionTypes.DELETE_ASTRO_BLOG,
  payload
})

export const updateAstroBlog = payload =>({
  type: actionTypes.UPDATE_ASTRO_BLOG,
  payload
})

