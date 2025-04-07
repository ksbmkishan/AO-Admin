import * as actionTypes from "../action-types";
const initialState = {
    blogData: null,
    astroblogCategoryData: [],
};

const blogs = (state = initialState, actions) => {
    const { payload, type } = actions;
    switch (type) {
        case actionTypes.SET_ASTRO_BLOG: {
            return {
               ...state,
                blogData: payload,
            };
        }
        case actionTypes.SET_ASTRO_BLOG_CATEGORY:
            return { ...state, astroblogCategoryData: payload };
        default:
            return state;
    }
};
export default blogs;