import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";
import {
  add_astro_blog,
  api_url,
  create_astro_blog_category,
  delete_astro_blog_category,
  delete_astro_blogs,
  get_astro_blog_category,
  get_astro_blogs,
  update_astro_blog,
  update_astro_blog_category,

} from "../../utils/api-routes";
import { getAPI, postAPI } from "../../utils/api-function";
import { Color } from "../../assets/colors";

//! Astroblog Category
function* getAstroblogCategory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_astro_blog_category);
    console.log("Get Astroblog Category Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_ASTRO_BLOG_CATEGORY, payload: data?.categoryBlog?.reverse() });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Astroblog Category Saga Error ::: ", error);
  }
};

function* createAstroblogCategory(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_astro_blog_category, payload?.data);
    console.log("Create Astroblog Category Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Astroblog Category Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: 'Failed To Create', showConfirmButton: false, timer: 2000 });
    console.log("Create Astroblog Category Saga Error ::: ", error);
  }
};

function* updateAstroblogCategory(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_astro_blog_category, payload?.data);
    console.log("Update Astroblog Category Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Astroblog Category Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: 'Failed To Update', showConfirmButton: false, timer: 2000 });
    console.log("Update Astroblog Category Saga Error ::: ", error);
  }
};

function* deleteAstroblogCategory(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_astro_blog_category, payload);
      console.log("Delete Astroblog Category Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Astroblog Category Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_ASTRO_BLOG_CATEGORY, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Delete Astroblog Category Saga Error ::: ", error);
  }
};

function* addAstroBlog(actions) {
  try {
    const { payload } = actions;
    console.log(payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_astro_blog,
      header: "form",
      data: payload?.data,
    });
    console.log(response);
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Astroblog Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ASTRO_BLOG, payload: null });
      yield call(payload?.onComplete);
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Astroblog",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    console.log(response);

    yield put({ type: actionTypes.GET_ASTRO_BLOG });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getAstroBlog(actions) {
  try {
    const { payload } = actions;
    const response = yield ApiRequest.getRequest({
      url: api_url + get_astro_blogs,
    });

    console.log(response);
    if (response?.success) {
      yield put({
        type: actionTypes.SET_ASTRO_BLOG,
        payload: response?.blogs,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteBlog(actions) {
  try {
    const { payload } = actions;
    console.log(payload)
    const result = yield Swal.fire({
      title: `Are you sure ?`,
      text: "You want to delete this blog!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      console.log({
        blogId: payload?._id,
      })
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_astro_blogs,
        header: 'json',
        data: {
          blogId: payload?._id,
        },
      });

      if (response?.success) {
        yield put({ type: actionTypes.GET_ASTRO_BLOG, payload: null });
        Swal.fire({ icon: "success", title: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
      } else {
        Swal.fire({ title: "Failed", text: "Failed to Delete the Banner", icon: "error", });
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateAstroBlog(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_astro_blog,
      header: "form",
      data: payload?.data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Blog Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({ type: actionTypes.GET_ASTRO_BLOG, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to Updated Blog",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



export default function* astrologerSaga() {
  //! Category
  yield takeLeading(actionTypes.GET_ASTRO_BLOG_CATEGORY, getAstroblogCategory);
  yield takeLeading(actionTypes.CREATE_ASTRO_BLOG_CATEGORY, createAstroblogCategory);
  yield takeLeading(actionTypes.UPDATE_ASTRO_BLOG_CATEGORY, updateAstroblogCategory);
  yield takeLeading(actionTypes.DELETE_ASTRO_BLOG_CATEGORY, deleteAstroblogCategory);

  yield takeLeading(actionTypes.ADD_ASTRO_BLOG, addAstroBlog);
  yield takeLeading(actionTypes.GET_ASTRO_BLOG, getAstroBlog);
  yield takeLeading(actionTypes.DELETE_ASTRO_BLOG, deleteBlog);
  yield takeLeading(actionTypes.UPDATE_ASTRO_BLOG, updateAstroBlog);

}