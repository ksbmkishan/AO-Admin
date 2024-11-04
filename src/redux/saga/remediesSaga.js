import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { create_remedies, delete_remedies, get_remedies, update_remedies } from "../../utils/api-routes";

function* getRemedies() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_remedies);
    console.log("Get Remedies Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_REMEDIES, payload: data?.remedies?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Remedies Saga Error ::: ", error);
  }
};

function* createRemedies(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_remedies, payload?.data);
    console.log("Create Remedies Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Remedies Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Create Remedies Saga Error ::: ", error);
  }
};

function* updateRemedies(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_remedies, payload?.data);
    console.log("Update Remedies Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Remedies Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Remedies Saga Error ::: ", error);
  }
};

function* deleteRemedies(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_remedies, payload);
      console.log("Delete Remedies Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Remedies Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_REMEDIES, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Delete Remedies Saga Error ::: ", error);
  }
};

export default function* remediesSaga() {
  yield takeLeading(actionTypes.GET_REMEDIES, getRemedies);
  yield takeLeading(actionTypes.CREATE_REMEDIES, createRemedies);
  yield takeLeading(actionTypes.UPDATE_REMEDIES, updateRemedies);
  yield takeLeading(actionTypes.DELETE_REMEDIES, deleteRemedies);
};