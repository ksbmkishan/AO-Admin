import Swal from "sweetalert2";
import { put, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../action-types';
import { create_about_us, create_privacy_policy, create_terms_and_conditions, get_about_us, get_privacy_policy, get_terms_and_conditions } from '../../utils/api-routes';
import { getAPI, postAPI } from "../../utils/api-function";

function* getTermsAndCondition(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_terms_and_conditions, payload);
        console.log("Get Terms & Condition Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TERMS_AND_CONDITION, payload: data?.termsAndCondition?.description });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Terms & Condition Saga Error ::: ", error);
    }
};

function* createTermsAndCondition(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_terms_and_conditions, payload);
        console.log("Create Terms & Condition Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
            yield put({ type: actionTypes.GET_TERMS_AND_CONDITION, payload: payload });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update", showConfirmButton: false, timer: 2000 });
        console.log("Create Terms & Condition Saga Error ::: ", error);
    }
};

function* getPrivacyPolicy() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_privacy_policy);
        console.log("Get Privacy Policy Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PRIVACY_POLICY, payload: data?.privacyPolicy?.description });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Privacy Policy Saga Error ::: ", error);
    }
};

function* createPrivacyPolicy(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_privacy_policy, payload);
        console.log("Create Privacy Policy Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
            yield put({ type: actionTypes.GET_PRIVACY_POLICY, payload: null });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update", showConfirmButton: false, timer: 2000 });
        console.log("Create Privacy Policy Saga Error ::: ", error);
    }
};

function* getAboutUs() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_about_us);
        console.log("Get About Us Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ABOUT_US, payload: data?.about?.description });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get About Us Saga Error ::: ", error);
    }
};

function* createAboutUs(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_about_us, payload);
        console.log("Create About Us Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
            yield put({ type: actionTypes.GET_ABOUT_US, payload: null });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update", showConfirmButton: false, timer: 2000 });
        console.log("Create About Us Saga Error ::: ", error);
    }
};

export default function* staticPageSaga() {
    yield takeLeading(actionTypes?.GET_TERMS_AND_CONDITION, getTermsAndCondition);
    yield takeLeading(actionTypes?.CREATE_TERMS_AND_CONDITION, createTermsAndCondition);
    yield takeLeading(actionTypes?.GET_PRIVACY_POLICY, getPrivacyPolicy);
    yield takeLeading(actionTypes?.CREATE_PRIVACY_POLICY, createPrivacyPolicy);
    yield takeLeading(actionTypes?.GET_ABOUT_US, getAboutUs);
    yield takeLeading(actionTypes?.CREATE_ABOUT_US, createAboutUs);
}