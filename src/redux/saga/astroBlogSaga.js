import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";
import {
  add_astro_blog,
  api_url,
  delete_astro_blogs,
  get_astro_blogs,
  update_astro_blog,

} from "../../utils/api-routes";

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
  yield takeLeading(actionTypes.ADD_ASTRO_BLOG, addAstroBlog);
  yield takeLeading(actionTypes.GET_ASTRO_BLOG, getAstroBlog);
  yield takeLeading(actionTypes.DELETE_ASTRO_BLOG, deleteBlog);
  yield takeLeading(actionTypes.UPDATE_ASTRO_BLOG, updateAstroBlog);

}