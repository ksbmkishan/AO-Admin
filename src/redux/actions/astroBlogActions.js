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

//! Category
export const getAstroblogCategory = payload => ({
  type: actionTypes.GET_ASTRO_BLOG_CATEGORY, payload
});

export const setAstroblogCategory = payload => ({
  type: actionTypes.SET_ASTRO_BLOG_CATEGORY, payload
});

export const createAstroblogCategory = payload => ({
  type: actionTypes.CREATE_ASTRO_BLOG_CATEGORY, payload
});

export const updateAstroblogCategory = payload => ({
  type: actionTypes.UPDATE_ASTRO_BLOG_CATEGORY, payload
});

export const deleteAstroblogCategory = payload => ({
  type: actionTypes.DELETE_ASTRO_BLOG_CATEGORY, payload
});

