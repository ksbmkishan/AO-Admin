import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import { api_url, add_gift, get_all_gift, update_gift, delete_gift, } from "../../utils/api-routes";
import { Colors } from "../../assets/styles";
import Swal from "sweetalert2";
import { Color } from "../../assets/colors";

function* createGift(actions) {
    try {
        const { payload } = actions;

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + add_gift,
            header: "form",
            data: payload?.data,
        });

        if (response.success) {
            Swal.fire({
                icon: "success",
                title: "Gift Added Successfully",
                showConfirmButton: false,
                timer: 2000,
            });
            yield call(payload?.onComplete)
        } else {
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Gift Submission Failed",
                showConfirmButton: false,
                timer: 2000,
            });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Gift Submission Failed",
            showConfirmButton: false,
            timer: 2000,
        });
    }
}

function* getGift() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.getRequest({
            url: api_url + get_all_gift,
        });

        console.log("Get Gift Response Saga :: ", response)
        if (response?.success) {
            yield put({ type: actionTypes.SET_ALL_GIFT, payload: response?.gift });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* updateGift(actions) {
    try {
        const { payload } = actions;
        console.log("Actions ::: ", actions)
        console.log("Payload ::: ", payload)

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + update_gift,
            header: "form",
            data: payload?.data,
        });

        if (response.success) {
            Swal.fire({
                icon: "success",
                title: "Gift updated successfully",
                showConfirmButton: false,
                timer: 2000,
            });
            yield put({ type: actionTypes.GET_ALL_GIFT, payload: null })
            yield call(payload?.onComplete)
        } else {
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Skill Update Failed",
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

function* deleteGift(actions) {
    try {
        const { payload } = actions;
        console.log("Action ::: ", actions)
        console.log("Payload ::: ", payload)

        const result = yield Swal.fire({ title: `Are you sure?`, text: "You want to delete this gift!!!", icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: "red", confirmButtonText: "Delete", })
        console.log("Result ::: ", result)

        if (result.isConfirmed) {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

            const response = yield ApiRequest.postRequest({
                url: api_url + delete_gift,
                header: "json",
                data: {
                    giftId: payload?.gift_id
                },
            });

            if (response.success) {
                Swal.fire({ icon: "success", title: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_ALL_GIFT, payload: null })

            } else {
                Swal.fire({ icon: "error", title: "Failed To Delete Gift", showConfirmButton: false, timer: 2000, });
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}


export default function* giftSaga() {
    yield takeLeading(actionTypes.CREATE_GIFT, createGift);
    yield takeLeading(actionTypes.GET_ALL_GIFT, getGift);
    yield takeLeading(actionTypes.UPDATE_GIFT, updateGift);
    yield takeLeading(actionTypes.DELETE_GIFT, deleteGift);
}
