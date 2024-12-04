import axios from 'axios';
import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { api_url } from '../../utils/api-routes';
import { create_temple, get_temple_data, delete_temple_data } from "../../utils/api-routes";
import { Color } from '../../assets/colors';

function* createTemple(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_temple, payload?.data);
        console.log("Create Temple Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Temple Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
        console.log("Create Temple Saga Error ::: ", error);
    }
};

function* getTempleData() {
    try {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const { data } = yield getAPI(get_temple_data);
      console.log("Get temple Saga Response :: ", data);
  
      if (data?.success) {
        yield put({ type: actionTypes.SET_TEMPLE, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
      }
  
    } catch (error) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
      console.log("Get temple Saga Error ::: ", error);
    }
  };

  function* deleteTempleCategory(action) {
    try {
        const { id } = action; // Extract the ID
        console.log("Temple ID to delete :::", id);

        const result = yield Swal.fire({
            title: `Are You Sure?`,
            text: "You want to delete this temple!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: Color.primary,
            cancelButtonColor: "grey",
            confirmButtonText: "Delete",
        });

        if (result.isConfirmed) {
            // Call API using the ID in the URL
            const { data } = yield call(axios.post, `${api_url}${delete_temple_data}/${id}`);
            console.log("Delete Temple Response :::", data);

            if (data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted Successfully",
                    showConfirmButton: false,
                    timer: 2000,
                });
                // Trigger re-fetching temple data
                yield put({ type: actionTypes.GET_TEMPLE });
            }
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Failed to Delete",
            showConfirmButton: false,
            timer: 2000,
        });
        console.log("Delete Temple Saga Error :::", error?.response?.data);
    }
}

export default function* templeSaga() {
    yield takeLeading(actionTypes.GET_ADD_TEMPLE, createTemple);
    yield takeLeading(actionTypes.GET_TEMPLE, getTempleData);
    yield takeLeading(actionTypes?.DELETE_TEMPLE_CATEGORY, deleteTempleCategory);

};