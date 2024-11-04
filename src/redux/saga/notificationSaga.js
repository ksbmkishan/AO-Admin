import {
  call,
  put,
  race,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  api_url,
  delete_review,
  get_astrologer_notification,
  get_customer_notification,
  get_review,
  send_astrologer_notification,
  send_customer_notification,
  verify_review,
} from "../../utils/api-routes";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import * as actionTypes from "../action-types";
import Swal from "sweetalert2";

function* getCustomerNotification() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_customer_notification,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_CUSTOMER_NOTIFICATIONS,
        payload: response.notifications.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getAstrologerNotification() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_astrologer_notification,
    });
    if (response.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGER_NOTIFICATIONS,
        payload: response.notifications?.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* sendCustomerNotifications(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + send_customer_notification,
      header: "form",
      data: payload?.data,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Notification Send Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({
        type: actionTypes.GET_CUSTOMER_NOTIFICATIONS,
        payload: null,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Notification Send Failed",
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

function* sendAstrologerNotifications(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + send_astrologer_notification,
      // header: "json",
      data: payload?.data,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Notification Send Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({
        type: actionTypes.GET_ASTROLOGER_NOTIFICATIONS,
        payload: null,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Notification Send Failed",
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

export default function* notificationSaga() {
  yield takeLeading(
    actionTypes.GET_CUSTOMER_NOTIFICATIONS,
    getCustomerNotification
  );
  yield takeLeading(
    actionTypes.GET_ASTROLOGER_NOTIFICATIONS,
    getAstrologerNotification
  );

  yield takeLeading(
    actionTypes.SEND_CUSTOMER_NOTIFICATIONS,
    sendCustomerNotifications
  );
  yield takeLeading(
    actionTypes.SEND_ASTROLOGER_NOTIFICATIONS,
    sendAstrologerNotifications
  );
}
