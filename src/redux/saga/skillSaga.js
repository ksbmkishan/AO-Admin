import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { create_skill, delete_skill, get_skill, update_skill } from "../../utils/api-routes";

function* getSkill() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_skill);
    console.log("Get Skill Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_SKILL, payload: data?.skills?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Skill Saga Error ::: ", error);
  }
};

function* createSkill(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_skill, payload?.data);
    console.log("Create Skill Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Skill Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message + ' ' + error?.response?.data?.error, showConfirmButton: false, timer: 2000 });
    console.log("Create Skill Saga Error ::: ", error);
  }
};

function* updateSkill(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_skill, payload?.data);
    console.log("Update Skill Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Skill Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Skill Saga Error ::: ", error);
  }
};

function* deleteSkill(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_skill, payload);
      console.log("Delete Skill Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Skill Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_SKILL, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Delete Skill Saga Error ::: ", error);
  }
};

export default function* skillSaga() {
  yield takeLeading(actionTypes.GET_SKILL, getSkill);
  yield takeLeading(actionTypes.CREATE_SKILL, createSkill);
  yield takeLeading(actionTypes.UPDATE_SKILL, updateSkill);
  yield takeLeading(actionTypes.DELETE_SKILL, deleteSkill);
};