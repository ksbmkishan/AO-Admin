import Swal from "sweetalert2";
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../action-types';
import { Color } from '../../assets/colors';
import { assign_puja, change_puja_status, create_puja, delete_puja, get_puja, get_puja_booked, get_puja_history, get_puja_request, update_puja } from '../../utils/api-routes';
import { getAPI, postAPI } from "../../utils/api-function";

function* getPuja() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_puja);
        console.log("Get Puja Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PUJA, payload: data?.pooja });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Puja Saga Error ::: ", error);
    }
};

function* createPuja(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_puja, payload?.data);
        console.log("Create Puja Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Puja Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
        console.log("Create Puja Saga Error ::: ", error);
    }
};

function* updatePuja(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(update_puja, payload?.data);
        console.log("Update Puja Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Puja Updated Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
        console.log("Update Puja Saga Error ::: ", error);
    }
};

function* deletePuja(action) {
    try {
        const { payload } = action;

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_puja, payload);
            console.log("Delete Puja Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Puja Deleted Successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes?.GET_PUJA, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log("Delete Puja Saga Error ::: ", error);
    }
};

function* getPujaRequest() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_puja_request);
        console.log("Get Puja Request Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PUJA_REQUEST, payload: data?.results?.reverse() });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Puja Request Saga Error ::: ", error);
    }
};

function* assignPuja(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(assign_puja, payload?.data);
        console.log("Assign Puja Saga Response ::: ", data);

        if (data) {
            Swal.fire({ icon: "success", title: 'Success', text: "Puja Assigned Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.GET_PUJA_REQUEST, payload: null });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
        console.log("Assign Puja Saga Error ::: ", error);
    }
};

function* changePujaStatus(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const result = yield Swal.fire({
            title: `Are you sure ?`, text: `You want to change puja status!!!`,
            icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            const { data } = yield postAPI(change_puja_status, payload);
            console.log("Change Puja Status Saga Response ::: ", data);

            if (data) {
                Swal.fire({ icon: "success", title: 'Success', text: 'Puja status has been updated', showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_PUJA_REQUEST, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
        console.log("Change Puja Status Saga Error ::: ", error?.response?.data);
    }
};

function* getPujaBooked() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_puja_booked);
        console.log("Get Puja Booked Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PUJA_BOOKED, payload: data?.orders });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Puja Booked Saga Error ::: ", error);
    }
};

function* getPujaHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_puja_history);
        console.log("Get Puja History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PUJA_HISTORY, payload: data?.results?.reverse() });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Puja History Saga Error ::: ", error);
    }
};

export default function* astromallSaga() {
    yield takeLeading(actionTypes?.GET_PUJA, getPuja);
    yield takeLeading(actionTypes?.CREATE_PUJA, createPuja);
    yield takeLeading(actionTypes?.UPDATE_PUJA, updatePuja);
    yield takeLeading(actionTypes?.DELETE_PUJA, deletePuja);
    yield takeLeading(actionTypes?.GET_PUJA_REQUEST, getPujaRequest);
    yield takeLeading(actionTypes?.ASSIGN_PUJA, assignPuja);
    yield takeLeading(actionTypes?.CHANGE_PUJA_STATUS, changePujaStatus);
    yield takeLeading(actionTypes?.GET_PUJA_BOOKED, getPujaBooked);
    yield takeLeading(actionTypes?.GET_PUJA_HISTORY, getPujaHistory);
};