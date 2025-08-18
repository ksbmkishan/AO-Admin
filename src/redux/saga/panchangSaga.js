import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import {
    api_url,
    get_review,
} from "../../utils/api-routes";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import * as actionTypes from "../action-types";
import Swal from "sweetalert2";
import { Color } from "../../assets/colors";




function* onPanchang(action) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + 'admin/add_panchang',
            header: "form-data",
            data: action.payload.data
        });

        if (response.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Panchang Added Successfully", showConfirmButton: false, timer: 2000 });
            yield put({ type: actionTypes.GET_PANCHANG });
            yield call(action.payload.onComplete);

        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* getPanchang(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + "admin/get_pachang_by_year",
            header: "json",
            data: payload,
        });

        if (response?.success) {
            yield put({ type: actionTypes.SET_PANCHANG, payload: response?.data });

        } else {
            yield put({ type: actionTypes.SET_PANCHANG, payload: [] });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        yield put({ type: actionTypes.SET_PANCHANG, payload: null });
        console.log(e);
    }
}

function* getPanchangVivah(action) {
    try {
        const { payload } = action
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + "admin/get_muhurat_by_year",
            header: "json",
            data: payload,
        });

        if (response?.success) {
            yield put({ type: actionTypes.SET_PANCHANG_VIVAH, payload: response?.data });

        } else {
            yield put({ type: actionTypes.SET_PANCHANG_VIVAH, payload: [] });

        }


        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* onPanchangVivah(action) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + 'admin/add_muhurat_vivah',
            header: "form-data",
            data: action.payload.data
        });

        if (response.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Panchang Vivah Added Successfully", showConfirmButton: false, timer: 2000 });
            yield put({ type: actionTypes.GET_PANCHANG_VIVAH });
            yield call(action.payload.onComplete);
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* getPanchangMuhuratVaahan(action) {
    try {
        const { payload } = action
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + "admin/get_muhurat_vaahan",
            header: "json",
            data: payload,
        });

        if(response?.success) {
        yield put({ type: actionTypes.SET_PANCHANG_MUHURAT_VAAHAN, payload: response?.data });

        } else {
        yield put({ type: actionTypes.SET_PANCHANG_MUHURAT_VAAHAN, payload: [] });

        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* onPanchangMuhuratVaahan(action) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + 'admin/add_muhurat_vaahan',
            header: "form-data",
            data: action.payload.data
        });

        if (response.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Panchang Vivah Added Successfully", showConfirmButton: false, timer: 2000 });
            yield put({ type: actionTypes.GET_PANCHANG_VIVAH });
            yield call(action.payload.onComplete);
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* getPanchangMuhuratSampatti(action) {
    try {
        const { payload } = action;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + "admin/get_muhurat_sampatti",
            header: "json",
            data: payload,
        });

        if(response?.success) {
            yield put({ type: actionTypes.SET_PANCHANG_MUHURAT_SAMPATTI, payload: response?.data });
        } else {
              yield put({ type: actionTypes.SET_PANCHANG_MUHURAT_SAMPATTI, payload: []});
        }
      
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* onPanchangMuhuratSampatti(action) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + 'admin/add_muhurat_sampatti',
            header: "form-data",
            data: action.payload.data
        });

        if (response.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Panchang Vivah Added Successfully", showConfirmButton: false, timer: 2000 });
            yield put({ type: actionTypes.GET_PANCHANG_VIVAH });
            yield call(action.payload.onComplete);
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* getPanchangGrahPravesh(action) {
    try {
        const { payload } = action;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + "admin/get_muhurat_grahpravesh",
            header: "json",
            data: payload,
        });

        if(response?.success) {
    yield put({ type: actionTypes.SET_PANCHANG_GRAHPRAVESH, payload: response?.data });
        } else {
    yield put({ type: actionTypes.SET_PANCHANG_GRAHPRAVESH, payload: [] });
        }
    
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}

function* onPanchangGrahPravesh(action) {
    try {
        console.log('payload ::', action.payload.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
            url: api_url + 'admin/add_muhurat_grahpravesh',
            header: "form-data",
            data: action.payload.data
        });

        if (response.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Panchang Vivah Added Successfully", showConfirmButton: false, timer: 2000 });
            yield put({ type: actionTypes.GET_PANCHANG_VIVAH , payload:  ({ year: action.payload.data.year }) });
            yield call(action.payload.onComplete);
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log(e);
    }
}





export default function* panchangSaga() {
    yield takeLeading(actionTypes.ON_PANCHANG, onPanchang);
    yield takeLeading(actionTypes.GET_PANCHANG, getPanchang);
    yield takeLeading(actionTypes.GET_PANCHANG_VIVAH, getPanchangVivah);
    yield takeLeading(actionTypes.ON_PANCHANG_VIVAH, onPanchangVivah);
    yield takeLeading(actionTypes.GET_PANCHANG_MUHURAT_VAAHAN, getPanchangMuhuratVaahan);
    yield takeLeading(actionTypes.ON_PANCHANG_MUHURAT_VAAHAN, onPanchangMuhuratVaahan);
    yield takeLeading(actionTypes.GET_PANCHANG_MUHURAT_SAMPATTI, getPanchangMuhuratSampatti);
    yield takeLeading(actionTypes.ON_PANCHANG_MUHURAT_SAMPATTI, onPanchangMuhuratSampatti);
    yield takeLeading(actionTypes.GET_PANCHANG_GRAHPRAVESH, getPanchangGrahPravesh);
    yield takeLeading(actionTypes.ON_PANCHANG_GRAHPRAVESH, onPanchangGrahPravesh);
}
