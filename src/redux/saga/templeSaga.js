import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { create_temple_asset_category, create_temple_asset_sub_category, create_temple_darshan, delete_temple_asset_category, delete_temple_asset_sub_category, delete_temple_darshan, get_temple_asset_category, get_temple_asset_sub_category, get_temple_darshan, get_temple_darshan_by_id, update_temple_asset_category, update_temple_asset_sub_category, update_temple_darshan } from '../../utils/api-routes';
import { create_temple } from "../../utils/api-routes";
import { Color } from '../../assets/colors';

function* getTempleDarshan() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_temple_darshan);
        console.log("Get Temple Darshan Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_DARSHAN, payload: data?.data?.reverse() });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Temple Darshan Saga Error ::: ", error);
    }
};

function* getTempleDarshanById() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_temple_darshan_by_id);
        console.log("Get Temple Darshan By ID Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_DARSHAN_BY_ID, payload: data?.data?.reverse() });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Temple Darshan By ID Saga Error ::: ", error);
    }
};

function* createTempleDarshan(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_temple_darshan, payload?.data);
        console.log("Create Temple Darshan Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Temple Darshan Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Create", showConfirmButton: false, timer: 2000 });
        console.log("Create Temple Darshan Saga Error ::: ", error);
    }
};

function* updateTempleDarshan(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(update_temple_darshan, payload?.data);
        console.log("Update Temple Darshan Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Temple Darshan Updated Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update", showConfirmButton: false, timer: 2000 });
        console.log("Update Temple Darshan Saga Error ::: ", error);
    }
};

function* deleteTempleDarshan(action) {
    try {
        const { payload } = action;

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_temple_darshan(payload?._id));
            console.log("Delete Temple Darshan Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Temple Darshan Deleted Successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes?.GET_TEMPLE_DARSHAN, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log("Delete Temple Darshan Saga Error ::: ", error);
    }
};

//! Asset Category
function* getTempleAssetCategory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_temple_asset_category);
        console.log("Get Temple Asset Category Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_ASSET_CATEGORY, payload: data?.data?.reverse() });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Temple Asset Category Saga Error ::: ", error);
    }
};

function* createTempleAssetCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_temple_asset_category, payload?.data);
        console.log("Create Temple Asset Category Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Temple Asset Category Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Create", showConfirmButton: false, timer: 2000 });
        console.log("Create Temple Asset Category Saga Error ::: ", error);
    }
};

function* updateTempleAssetCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(update_temple_asset_category, payload?.data);
        console.log("Update Temple Asset Category Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Temple Asset Category Updated Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update", showConfirmButton: false, timer: 2000 });
        console.log("Update Temple Asset Category Saga Error ::: ", error);
    }
};

function* deleteTempleAssetCategory(action) {
    try {
        const { payload } = action;

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_temple_asset_category(payload?._id));
            console.log("Delete Temple Asset Category Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Temple Asset Category Deleted Successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes?.GET_TEMPLE_ASSET_CATEGORY, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log("Delete Temple Asset Category Saga Error ::: ", error);
    }
};

//! Asset Sub Category
function* getTempleAssetSubCategory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_temple_asset_sub_category);
        console.log("Get Temple Asset Sub Category Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_ASSET_SUB_CATEGORY, payload: data?.data?.reverse() });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Temple Asset Sub Category Saga Error ::: ", error);
    }
};

function* createTempleAssetSubCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_temple_asset_sub_category, payload?.data);
        console.log("Create Temple Asset Sub Category Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Temple Asset Sub Category Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Create", showConfirmButton: false, timer: 2000 });
        console.log("Create Temple Asset Sub Category Saga Error ::: ", error);
    }
};

function* updateTempleAssetSubCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(update_temple_asset_sub_category, payload?.data);
        console.log("Update Temple Asset Sub Category Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Temple Asset Sub Category Updated Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update", showConfirmButton: false, timer: 2000 });
        console.log("Update Temple Asset Sub Category Saga Error ::: ", error);
    }
};

function* deleteTempleAssetSubCategory(action) {
    try {
        const { payload } = action;

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_temple_asset_sub_category(payload?._id));
            console.log("Delete Temple Asset Sub Category Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Temple Asset Sub Category Deleted Successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes?.GET_TEMPLE_ASSET_SUB_CATEGORY, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log("Delete Temple Asset Sub Category Saga Error ::: ", error);
    }
};

export default function* templeSaga() {
    yield takeLeading(actionTypes.GET_TEMPLE_DARSHAN, getTempleDarshan);
    yield takeLeading(actionTypes.GET_TEMPLE_DARSHAN_BY_ID, getTempleDarshanById);
    yield takeLeading(actionTypes.UPDATE_TEMPLE_DARSHAN, updateTempleDarshan);
    yield takeLeading(actionTypes.CREATE_TEMPLE_DARSHAN, createTempleDarshan);
    yield takeLeading(actionTypes.DELETE_TEMPLE_DARSHAN, deleteTempleDarshan);

    //! Asset Category
    yield takeLeading(actionTypes.GET_TEMPLE_ASSET_CATEGORY, getTempleAssetCategory);
    yield takeLeading(actionTypes.UPDATE_TEMPLE_ASSET_CATEGORY, updateTempleAssetCategory);
    yield takeLeading(actionTypes.CREATE_TEMPLE_ASSET_CATEGORY, createTempleAssetCategory);
    yield takeLeading(actionTypes.DELETE_TEMPLE_ASSET_CATEGORY, deleteTempleAssetCategory);

    //! Asset Sub Category
    yield takeLeading(actionTypes.GET_TEMPLE_ASSET_SUB_CATEGORY, getTempleAssetSubCategory);
    yield takeLeading(actionTypes.UPDATE_TEMPLE_ASSET_SUB_CATEGORY, updateTempleAssetSubCategory);
    yield takeLeading(actionTypes.CREATE_TEMPLE_ASSET_SUB_CATEGORY, createTempleAssetSubCategory);
    yield takeLeading(actionTypes.DELETE_TEMPLE_ASSET_SUB_CATEGORY, deleteTempleAssetSubCategory);
};