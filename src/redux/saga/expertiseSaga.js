import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { create_expertise, create_main_expertise, delete_expertise, delete_main_expertise, get_expertise, get_main_expertise, update_expertise, update_main_expertise } from "../../utils/api-routes";

function* getExpertise() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_expertise);
    console.log("Get Expertise Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_EXPERTISE, payload: data?.expertises?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Expertise Saga Error ::: ", error);
  }
};

function* createExpertise(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_expertise, payload?.data);
    console.log("Create Expertise Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Expertise Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Create Expertise Saga Error ::: ", error);
  }
};

function* updateExpertise(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_expertise, payload?.data);
    console.log("Update Expertise Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Expertise Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Expertise Saga Error ::: ", error);
  }
};

function* deleteExpertise(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_expertise, payload);
      console.log("Delete Expertise Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Expertise Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_EXPERTISE, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Delete Expertise Saga Error ::: ", error);
  }
};

function* getMainExpertise() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_main_expertise);
    console.log("Get Main Expertise Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_MAIN_EXPERTISE, payload: data?.mainExpertise?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Main Expertise Saga Error ::: ", error);
  }
};

function* createMainExpertise(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_main_expertise, payload?.data);
    console.log("Create Main Expertise Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Main Expertise Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Create Main Expertise Saga Error ::: ", error);
  }
};

function* updateMainExpertise(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_main_expertise, payload?.data);
    console.log("Update Main Expertise Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Main Expertise Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Main Expertise Saga Error ::: ", error);
  }
};

function* deleteMainExpertise(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_main_expertise, payload);
      console.log("Delete Main Expertise Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Main Expertise Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_MAIN_EXPERTISE, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Delete Main Expertise Saga Error ::: ", error);
  }
};


export default function* expertiseSaga() {
  yield takeLeading(actionTypes.GET_EXPERTISE, getExpertise);
  yield takeLeading(actionTypes.CREATE_EXPERTISE, createExpertise);
  yield takeLeading(actionTypes.UPDATE_EXPERTISE, updateExpertise);
  yield takeLeading(actionTypes.DELETE_EXPERTISE, deleteExpertise);
  yield takeLeading(actionTypes.GET_MAIN_EXPERTISE, getMainExpertise);
  yield takeLeading(actionTypes.CREATE_MAIN_EXPERTISE, createMainExpertise);
  yield takeLeading(actionTypes.UPDATE_MAIN_EXPERTISE, updateMainExpertise);
  yield takeLeading(actionTypes.DELETE_MAIN_EXPERTISE, deleteMainExpertise);
};