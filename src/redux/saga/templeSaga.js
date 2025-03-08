import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { create_temple_assets, create_temple_assets_items, create_temple_darshan, create_temple_live_link, delete_temple_assets, delete_temple_assets_items, delete_temple_darshan, delete_temple_live_link, get_temple_assets, get_temple_assets_items_by_assets_id, get_temple_darshan, get_temple_darshan_by_id, get_temple_live_link, update_temple_assets_items, update_temple_darshan, update_temple_live_link } from '../../utils/api-routes';
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

function* getTempleDarshanById(action) {
    try {
        const { payload } = action;

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_temple_darshan_by_id(payload?.darshanId));
        console.log("Get Temple Darshan By ID Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_DARSHAN_BY_ID, payload: data?.data });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

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
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000 });
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

//! Assets
function* getTempleAssets() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_temple_assets);
        console.log("Get Temple Assets Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_ASSETS, payload: data?.data?.reverse() });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Temple Assets Saga Error ::: ", error);
    }
};

function* createTempleAssets(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_temple_assets, payload?.data);
        console.log("Create Temple Assets Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Temple Assets Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Create", showConfirmButton: false, timer: 2000 });
        console.log("Create Temple Assets Saga Error ::: ", error);
    }
};

function* deleteTempleAssets(action) {
    try {
        const { payload } = action;

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_temple_assets(payload?._id));
            console.log("Delete Temple Assets Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Temple Assets Deleted Successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes?.GET_TEMPLE_ASSETS, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log("Delete Temple Assets Saga Error ::: ", error);
    }
};

//! Asset Items
function* getTempleAssetsItemsByAssetsId(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_temple_assets_items_by_assets_id(payload?.assetsId));
        console.log("Get Temple Assets Items Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_ASSETS_ITEMS_BY_ASSETS_ID, payload: data?.data?.items });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Temple Assets Items Saga Error ::: ", error);
    }
};

function* createTempleAssetsItems(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);
        if(payload?.updateRoute) {

            const { data } = yield postAPI(update_temple_assets_items(payload?.assetsId, payload?._id), payload?.data);

            console.log("Create Temple Assets Items Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Temple Assets Item Created Successfully", showConfirmButton: false, timer: 2000 });
                yield call(payload?.onComplete);
                yield put({ type: actionTypes?.GET_TEMPLE_ASSETS_ITEMS_BY_ASSETS_ID, payload: { assetsId: payload?.assetsId } });
            }

        } else {
            const { data } = yield postAPI(create_temple_assets_items(payload?.assetsId), payload?.data);

            console.log("Create Temple Assets Items Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Temple Assets Item Created Successfully", showConfirmButton: false, timer: 2000 });
                yield call(payload?.onComplete);
                yield put({ type: actionTypes?.GET_TEMPLE_ASSETS_ITEMS_BY_ASSETS_ID, payload: { assetsId: payload?.assetsId } });
            }
        }
        
       

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Create", showConfirmButton: false, timer: 2000 });
        console.log("Create Temple Assets Items Saga Error ::: ", error);
    }
};

function* deleteTempleAssetsItems(action) {
    try {
        const { payload } = action;

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_temple_assets_items(payload?.assetsId, payload?.itemId));
            console.log("Delete Temple Assets Items Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Temple Assets Item Deleted Successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes?.GET_TEMPLE_ASSETS_ITEMS_BY_ASSETS_ID, payload: { assetsId: payload?.assetsId } });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log("Delete Temple Assets Items Saga Error ::: ", error);
    }
};

//! Live Link
function* getTempleLiveLink() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_temple_live_link);
        console.log("Get Temple Live Link Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TEMPLE_LIVE_LINK, payload: data?.data?.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Temple Live Link Saga Error ::: ", error);
    }
};

function* createTempleLiveLink(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_temple_live_link, payload?.data);
        console.log("Create Temple Live Link Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Live Link Created Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Create", showConfirmButton: false, timer: 2000 });
        console.log("Create Temple Live Link Saga Error ::: ", error);
    }
};

function* updateTempleLiveLink(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(update_temple_live_link(payload?._id), payload?.data);
        console.log("Update Temple Live Link Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Live Link Updated Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update", showConfirmButton: false, timer: 2000 });
        console.log("Update Temple Live Link Saga Error ::: ", error);
    }
};

function* deleteTempleLiveLink(action) {
    try {
        const { payload } = action;

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_temple_live_link(payload?._id));
            console.log("Delete Temple Live Link Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Live Link Deleted Successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes?.GET_TEMPLE_LIVE_LINK, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log("Delete Temple Live Link Saga Error ::: ", error);
    }
};

export default function* templeSaga() {
    yield takeLeading(actionTypes.GET_TEMPLE_DARSHAN, getTempleDarshan);
    yield takeLeading(actionTypes.GET_TEMPLE_DARSHAN_BY_ID, getTempleDarshanById);
    yield takeLeading(actionTypes.UPDATE_TEMPLE_DARSHAN, updateTempleDarshan);
    yield takeLeading(actionTypes.CREATE_TEMPLE_DARSHAN, createTempleDarshan);
    yield takeLeading(actionTypes.DELETE_TEMPLE_DARSHAN, deleteTempleDarshan);

    //! Asset s
    yield takeLeading(actionTypes.GET_TEMPLE_ASSETS, getTempleAssets);
    yield takeLeading(actionTypes.CREATE_TEMPLE_ASSETS, createTempleAssets);
    yield takeLeading(actionTypes.DELETE_TEMPLE_ASSETS, deleteTempleAssets);

    //! Asset Items
    yield takeLeading(actionTypes.GET_TEMPLE_ASSETS_ITEMS_BY_ASSETS_ID, getTempleAssetsItemsByAssetsId);
    yield takeLeading(actionTypes.CREATE_TEMPLE_ASSETS_ITEMS, createTempleAssetsItems);
    yield takeLeading(actionTypes.DELETE_TEMPLE_ASSETS_ITEMS, deleteTempleAssetsItems);

    //! Live Link
    yield takeLeading(actionTypes.GET_TEMPLE_LIVE_LINK, getTempleLiveLink);
    yield takeLeading(actionTypes.CREATE_TEMPLE_LIVE_LINK, createTempleLiveLink);
    yield takeLeading(actionTypes.UPDATE_TEMPLE_LIVE_LINK, updateTempleLiveLink);
    yield takeLeading(actionTypes.DELETE_TEMPLE_LIVE_LINK, deleteTempleLiveLink);
};