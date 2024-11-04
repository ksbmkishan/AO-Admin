import { call, put, race, takeEvery } from "redux-saga/effects";
import {
  add_review,
  api_url,
  delete_review,
  get_review,
  update_review,
  verify_review,
} from "../../utils/api-routes";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import * as actionTypes from "../action-types";
import Swal from "sweetalert2";
import { Color } from "../../assets/colors";


function* addAstrologersReviews(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_review,
      header: "json",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: response?.message,
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({ type: actionTypes.GET_ASTROLOGERS_REVIEWS, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: response?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getAstrologersReviews() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    console.log(api_url + get_review);
    const response = yield ApiRequest.getRequest({
      url: api_url + get_review,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGERS_REVIEWS,
        payload: response.review.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getAppReviews() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + "",
      header: "json",
      data: {},
    });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* verifyAstrologerReview(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + verify_review,
      header: "json",
      data: {
        review_id: payload?.reviewId,
        is_verified: payload?.isVerify,
      },
    });

    yield put({ type: actionTypes.GET_ASTROLOGERS_REVIEWS });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteAstrologerReview(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({ title: `Are you sure?`, text: "You want to delete!!!", icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: "red", confirmButtonText: "Delete", })
    if (result.isConfirmed) {
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_review,
        header: "json",
        data: {
          reviewId: payload,
        },
      });

      if (response?.success) {
        Swal.fire({ icon: "success", title: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
      } else {
        Swal.fire({ title: "Failed", text: "Failed to Delete Review", icon: "error", });
      }
      yield put({ type: actionTypes.GET_ASTROLOGERS_REVIEWS });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateAstrologerReivew(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_review,
      header: 'json',
      data: payload?.data
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Review Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      // yield put({ type: actionTypes.GET_ALL_REMEDIES, payload: null })
      // yield call(payload?.reset())
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Review Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}


export default function* reviewSaga() {
  yield takeEvery(actionTypes.GET_ASTROLOGERS_REVIEWS, getAstrologersReviews);
  yield takeEvery(actionTypes.SET_APP_REVIEWS, getAppReviews);
  yield takeEvery(actionTypes.UPDATE_ASTROLOER_REVIEW_STATUS, verifyAstrologerReview);
  yield takeEvery(actionTypes.DELETE_ASTROLOGER_REVIEW, deleteAstrologerReview);
  yield takeEvery(actionTypes.ADD_ASTROLOGERS_REVIEWS, addAstrologersReviews);
  yield takeEvery(actionTypes.UPDATE_ASTROLOGER_REVIEW, updateAstrologerReivew);
}
