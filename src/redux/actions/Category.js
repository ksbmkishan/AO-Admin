import axiosInstance from "../../utils/axios";
const axios = axiosInstance;
export const newCategory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "categoryRequest" });
    const response = await axios.post("/admin/categories/new", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("categories data");

    dispatch({ type: "newCategorySuccess", payload: response.data.message });
  } catch (error) {
    dispatch({ type: "newCategoryFail", payload: error.response.data.message });
  }
};

export const getAllCategories = () => async (dispatch) => {
    try {
      dispatch({ type: "allCategoryRequest" });
      const response = await axios.get("/admin/categories");
      console.log("data",response)
      dispatch({ type: "allCategorySuccess", payload: response.data.categories });
    } catch (error) {

      dispatch({ type: "allCategoryFail", payload: error.response.data.message });
    }
  };