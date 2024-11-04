import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import {
  api_url,
  create_language,
  delete_language,
  update_language,
  get_expertise,
  get_language,
} from "../../utils/api-routes";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* createLanguage(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_language,
      header: "json",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Language added successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({ type: actionTypes.GET_ALL_LANGUAGE, payload: null });
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

function* updateLanguage(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_language,
      header: "json",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({ type: actionTypes.GET_ALL_LANGUAGE, payload: null });
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

function* deleteLanguage(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure ?`,
      text: "You want to delete this language!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_language,
        header: "json",
        data: {
          langId: payload?.langId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Language deleted successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_LANGUAGE, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: response?.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getLanguage() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_language,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_ALL_LANGUAGE,
        payload: response?.languageData,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

export default function* languageSaga() {
  yield takeLeading(actionTypes.GET_ALL_LANGUAGE, getLanguage);
  yield takeLeading(actionTypes.CREATE_LANGUAGE, createLanguage);
  yield takeLeading(actionTypes.UPDATE_LANGUAGE, updateLanguage);
  yield takeLeading(actionTypes.DELETE_LANGUAGE, deleteLanguage);
}
