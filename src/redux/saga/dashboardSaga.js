import * as actionTypes from "../action-types";
import { call, put, takeLeading } from "redux-saga/effects";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import {
  api_url,
  get_dashboard,
  get_dashboard_data,
  get_earning_chart,
  get_earning_graph,
} from "../../utils/api-routes";
import axios from "axios";


function* getDashboard(actions) {
  try {
    const { payload } = actions;

    const response = yield ApiRequest.getRequest({
      url: api_url + get_dashboard,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_DASHBOARD,
        payload: response?.dashboard,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getEarningGraph(action) {
  const { payload } = action;
  console.log("Payload ::: ", payload);

  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield call(axios.post, `${api_url + get_earning_graph}`, payload);
    console.log("Get Earning Graph Saga Response ::: ", data)

    if (data?.status) {
      yield put({ type: actionTypes.SET_EARNING_GRAPH, payload: data?.result });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Earning Graph Saga Error ::: ", error)
  }
}

function* getEarningChart() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield call(axios.get, `${api_url + get_earning_chart}`);
    console.log("Get Earning Chart Saga Response ::: ", data)

    if (data?.success) {
      yield put({ type: actionTypes.SET_EARNING_CHART, payload: data });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Earning Chart Saga Error ::: ", error)
  }
}

function* getDashboardData() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield call(axios.get, `${api_url + get_dashboard_data}`);
    console.log("Get Dashboard Data Saga Response ::: ", data)

    if (data?.success) {
      yield put({ type: actionTypes.SET_DASHBOARD_DATA, payload: data?.dashboard });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Dashboard Data Saga Error ::: ", error)
  }
}

export default function* dashboardSaga() {
  yield takeLeading(actionTypes.GET_DASHBOARD, getDashboard);
  yield takeLeading(actionTypes.GET_EARNING_GRAPH, getEarningGraph);
  yield takeLeading(actionTypes.GET_EARNING_CHART, getEarningChart);
  yield takeLeading(actionTypes.GET_DASHBOARD_DATA, getDashboardData);
}
