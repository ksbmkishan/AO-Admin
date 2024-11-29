import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { postAPI } from "../../utils/api-function";
import { create_temple } from "../../utils/api-routes";

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


export default function* templeSaga() {
    yield takeLeading(actionTypes.GET_ADD_TEMPLE, createTemple);

};