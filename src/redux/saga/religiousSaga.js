import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { create_religious_category, create_religious_sub_category, delete_religious_category, delete_religious_sub_category, get_religious_category, get_religious_sub_category, update_religious_category, update_religious_sub_category } from "../../utils/api-routes";

function* getReligiousCategory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_religious_category);
    console.log("Get Religious Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_RELIGIOUS_CATEGORY, payload: data?.data });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Religious Saga Error ::: ", error);
  }
};

function* createReligiousCategory(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_religious_category, payload?.data);
    console.log("Create Religious Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Religious Category Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message + ' ' + error?.response?.data?.error, showConfirmButton: false, timer: 2000 });
    console.log("Create Religious Category Saga Error ::: ", error);
  }
};

function* updateReligiousCategory(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_religious_category, payload?.data);
    console.log("Update ReligiousCategory Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Religious Category Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update ReligiousCategory Saga Error ::: ", error);
  }
};

function* deleteReligiousCategory(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_religious_category, payload);
      console.log("Delete Religious Category Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Religious Category Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_RELIGIOUS_CATEGORY, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Religious Category Saga Error ::: ", error);
  }
};

function* getReligiousSubCategory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_religious_sub_category);
    console.log("Get ReligiousSubCategory Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_RELIGIOUS_SUB_CATEGORY, payload: data?.data });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get ReligiousSubCategory Saga Error ::: ", error);
  }
};

function* createReligiousSubCategory(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_religious_sub_category, payload?.data);
    console.log("Create ReligiousSubCategory Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Religious Sub-Category Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message + ' ' + error?.response?.data?.error, showConfirmButton: false, timer: 2000 });
    console.log("Create ReligiousSubCategory Saga Error ::: ", error);
  }
};

function* updateReligiousSubCategory(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_religious_sub_category, payload?.data);
    console.log("Update ReligiousSubCategory Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Religious Sub-Category Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update ReligiousSubCategory Saga Error ::: ", error);
  }
};

function* deleteReligiousSubCategory(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_religious_sub_category, payload);
      console.log("Delete ReligiousSubCategory Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Religious Sub-Category Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_RELIGIOUS_SUB_CATEGORY, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("ReligiousSubCategory Saga Error ::: ", error);
  }
};

export default function* religiousSaga() {
  yield takeLeading(actionTypes.GET_RELIGIOUS_CATEGORY, getReligiousCategory);
  yield takeLeading(actionTypes.CREATE_RELIGIOUS_CATEGORY, createReligiousCategory);
  yield takeLeading(actionTypes.UPDATE_RELIGIOUS_CATEGORY, updateReligiousCategory);
  yield takeLeading(actionTypes.DELETE_RELIGIOUS_CATEGORY, deleteReligiousCategory);
  yield takeLeading(actionTypes.GET_RELIGIOUS_SUB_CATEGORY, getReligiousSubCategory);
  yield takeLeading(actionTypes.CREATE_RELIGIOUS_SUB_CATEGORY, createReligiousSubCategory);
  yield takeLeading(actionTypes.UPDATE_RELIGIOUS_SUB_CATEGORY, updateReligiousSubCategory);
  yield takeLeading(actionTypes.DELETE_RELIGIOUS_SUB_CATEGORY, deleteReligiousSubCategory);
};