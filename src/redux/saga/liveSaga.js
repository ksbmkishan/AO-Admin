
import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { get_live_darshan, delete_live } from "../../utils/api-routes";

function* getLiveData() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const { data } = yield getAPI(get_live_darshan);
    console.log("Full API Response:", data);

    if (data?.success && Array.isArray(data?.data)) {
      const liveData = data.data.reverse();
      console.log("Processed Live Darshan Data:", liveData);

      yield put({ type: actionTypes.SET_LIVE, payload: liveData });
    } else {
      console.error("Unexpected API response format:", data);
      yield put({ type: actionTypes.SET_LIVE, payload: [] }); 
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.error("Get Live Error :::", error);
  }
}

function* deleteLiveId(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You want to delete!!!",
      showCancelButton: true,
      confirmButtonColor: Color.primary,
      cancelButtonColor: "grey",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      const apiEndpoint = `api/admin/delete_Darshan/${payload.customerId}`;

      const { data } = yield postAPI(apiEndpoint);
      console.log("Delete Live By Id Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Live Deleted Successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes?.GET_LIVE });
      }
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Failed To Delete",
      showConfirmButton: false,
      timer: 2000,
    });
    console.log("Delete Live By Id Saga Error ::: ", error);
  }
}




export default function* liveSaga() {
  yield takeLeading(actionTypes?.GET_LIVE, getLiveData);
   yield takeLeading(actionTypes?.DELETE_LIVE, deleteLiveId);

}