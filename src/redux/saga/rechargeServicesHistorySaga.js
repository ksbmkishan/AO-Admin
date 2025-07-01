import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import {
  api_url,
  get_recharge_services_history,
} from "../../utils/api-routes";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";



function* getRechargeServicesHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.getRequest({
      url: api_url + get_recharge_services_history,
    });

    console.log(response , "Response Checkkkkk")

    if (response?.success) {
      yield put({
        type: actionTypes.SET_RECHARGE_SERVICES_HISTORY,
        payload: response?.history,
      });
    }
  } catch (e) {
    console.error("Error in getRechargeServicesHistory saga:", e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}





export default function* rechargeServiceHistorySaga() {
  yield takeLeading(actionTypes.GET_RECHARGE_SERVICES_HISTORY, getRechargeServicesHistory);
  
}
