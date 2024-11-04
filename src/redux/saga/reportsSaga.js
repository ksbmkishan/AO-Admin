import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import {
  api_url,
  get_admin_earnig_history,
  get_wallet_payments,
} from "../../utils/api-routes";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import * as actionTypes from "../action-types";

function* getAdminEarnings() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_admin_earnig_history,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_ADMIN_EARNINGS,
        payload: response.history.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getRecieptSummary() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_wallet_payments,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_RECIEPT_SUMMARY,
        payload: response.payementData.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

export default function* reportSaga() {
  yield takeLeading(actionTypes.GET_ADMIN_EARNINGS, getAdminEarnings);
  yield takeLeading(actionTypes.GET_RECIEPT_SUMMARY, getRecieptSummary);
}
