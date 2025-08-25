import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { create_skill, create_temple_foundation, create_testimonial, delete_skill, delete_temple_foundation, delete_testimonial, get_temple_foundation, get_testimonial, update_skill, update_temple_foundation, update_testimonial } from "../../utils/api-routes";

function* getTempleFoundation() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_temple_foundation);
    console.log("Get Testimonial Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_TEMPLE_FOUNDATION, payload: data?.testimonial });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Testimonial Saga Error ::: ", error);
  }
};

function* createTempleFoundation(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_temple_foundation, payload?.data);
    console.log("Create Testimonial Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Testimonial Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message + ' ' + error?.response?.data?.error, showConfirmButton: false, timer: 2000 });
    console.log("Create Testimonial Saga Error ::: ", error);
  }
};

function* updateTempleFoundation(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_temple_foundation, payload?.data);
    console.log("Update Testimonial Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Testimonial Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Testimonial Saga Error ::: ", error);
  }
};

function* deleteTempleFoundation(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_temple_foundation, payload);
      console.log("Delete Testimonial Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Testimonial Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_TESTIMONIAL, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Testimonial Saga Error ::: ", error);
  }
};

export default function* templeFoundationSaga() {
  yield takeLeading(actionTypes.GET_TEMPLE_FOUNDATION, getTempleFoundation);
  yield takeLeading(actionTypes.CREATE_TEMPLE_FOUNDATION, createTempleFoundation);
  yield takeLeading(actionTypes.UPDATE_TEMPLE_FOUNDATION, updateTempleFoundation);
  yield takeLeading(actionTypes.DELETE_TEMPLE_FOUNDATION, deleteTempleFoundation);
};