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
  create_recharge_plan,
  get_recharge_plans,
  delete_recharge_plans,
  update_recharge_plan_status,
  add_first_recharge_offer,
  get_first_recharge_offer,
  delete_first_recharge_offer,
  update_first_recharge_offer,
} from "../../utils/api-routes";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* createRechargePlan(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_recharge_plan,
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
      yield put({ type: actionTypes.GET_RECHARGE_PLAN, payload: null });
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

function* getRechargePlan() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_recharge_plans,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_RECHARGE_PLAN,
        payload: response?.allRechargePlan,
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
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: response?.message,
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
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateRechargePlanStatus(actions) {
  try {
    const { payload } = actions;
    console.log(payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_recharge_plan_status,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: response?.message,
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_RECHARGE_PLAN, payload: null });
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

function* deleteRechargePlan(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure, you want to delete this plan?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_recharge_plans,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: response?.message,
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_RECHARGE_PLAN, payload: null });
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

function* createFirstRechargeOffer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_first_recharge_offer,
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
      yield put({ type: actionTypes.GET_FIRST_RECHARGE_OFFER, payload: null });
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

function* getFirstRechargeOffer() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_first_recharge_offer,
    });


    if (response?.success) {
      yield put({
        type: actionTypes.SET_FIRST_RECHARGE_OFFER,
        payload: response?.allFirstRechargeOffer,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateFirstRechargeOffer(actions) {
  try {
    const { payload } = actions;
    console.log(payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_first_recharge_offer,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: response?.message,
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_FIRST_RECHARGE_OFFER, payload: null });
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

function* deleteFirstRechargeOffer(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure to delete this plan.`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_first_recharge_offer,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: response?.message,
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_FIRST_RECHARGE_OFFER, payload: null });
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



export default function* rechargeSaga() {
  yield takeLeading(actionTypes.CREATE_RECHARGE_PLAN, createRechargePlan);
  yield takeLeading(actionTypes.GET_RECHARGE_PLAN, getRechargePlan);
  yield takeLeading(actionTypes.DELETE_RECHARGE_PLAN, deleteRechargePlan);
  yield takeLeading(actionTypes.UPDATE_RECHARGE_PLAN_STATUS, updateRechargePlanStatus)
  yield takeLeading(actionTypes.CREATE_FIRST_RECHARGE_OFFER, createFirstRechargeOffer)
  yield takeLeading(actionTypes.GET_FIRST_RECHARGE_OFFER, getFirstRechargeOffer)
  yield takeLeading(actionTypes.UPDATE_FIRST_RECHARGE_OFFER, updateFirstRechargeOffer)
  yield takeLeading(actionTypes.DELETE_FIRST_RECHARGE_OFFER, deleteFirstRechargeOffer)
}
