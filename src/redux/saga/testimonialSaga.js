import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { create_skill, create_testimonial, delete_skill, delete_testimonial, get_testimonial, update_skill, update_testimonial } from "../../utils/api-routes";

function* getTestimonial() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_testimonial);
    console.log("Get Testimonial Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_TESTIMONIAL, payload: data?.testimonial });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Testimonial Saga Error ::: ", error);
  }
};

function* createTestimonial(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_testimonial, payload?.data);
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

function* updateTestimonial(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_testimonial, payload?.data);
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

function* deleteTestimonial(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_testimonial, payload);
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

export default function* testimonialSaga() {
  yield takeLeading(actionTypes.GET_TESTIMONIAL, getTestimonial);
  yield takeLeading(actionTypes.CREATE_TESTIMONIAL, createTestimonial);
  yield takeLeading(actionTypes.UPDATE_TESTIMONIAL, updateTestimonial);
  yield takeLeading(actionTypes.DELETE_TESTIMONIAL, deleteTestimonial);
};