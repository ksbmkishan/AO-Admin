import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../action-types/index';
import { ApiRequest } from '../../utils/api-function/apiRequest';
import { api_url } from '../../utils/api-routes';
import Swal from 'sweetalert2';

function* onUpdate(action) {
    try {
        const { payload } = action;

        const response = yield ApiRequest.postRequest({
             url: api_url + 'chatbot/admin/update_prompt',
                    header: "json",
                    data: payload?.data,
        });

        if(response?.success) {
            Swal.fire({
            icon: "success",
            title: "Updated successfully!",
            showConfirmButton: false,
            timer: 2000,
        });
           
         yield put({ type: actionTypes.GET_UPDATE_PROMPT, payload: null });
        } else {
                Swal.fire({
                  icon: "error",
                  title: "Server Error",
                  text: response?.message,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
    } catch(e) {
        console.log(e);
    }
}

function* getUpdate() {
    try {
        const response = yield ApiRequest.getRequest({
             url: api_url + 'chatbot/admin/get_prompt',
                    header: "json",
                  
        });

        if(response?.success) {
            yield put({ type: actionTypes.SET_UPDATE_PROMPT, payload: response?.data})
        }
    } catch(e) {
        console.log(e);
    }
}
export default function* lettertoGodSaga() {
    yield takeLatest(actionTypes.ON_UPDATE_PROMPT, onUpdate);
    yield takeLatest(actionTypes.GET_UPDATE_PROMPT, getUpdate);
}