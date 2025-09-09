import * as actionTypes from "../action-types";
import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import {
  add_banner,
  add_teerth_dham,
  api_url,
  change_banner_status,
  delete_banner,
  get_app_banners,
  get_app_teerth_dham,
  update_banner,
  update_teerth_dham,
} from "../../utils/api-routes";
import { Colors } from "../../assets/styles";
import { Color } from "../../assets/colors";
import { postAPI } from "../../utils/api-function";

function* uploadAppBanners(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_banner,
      header: "form",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Banner added successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add banner",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* uploadWebBanners(actions) {
  try {
    const { payload } = actions;
    console.log(payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAppBanners(actions) {
  try {
    const { payload } = actions;

    const response = yield ApiRequest.getRequest({
      url: api_url + get_app_banners,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_APP_BANNERS,
        payload: response?.banners,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteBanners(actions) {
  try {
    const { payload } = actions;

    const result = yield Swal.fire({
      title: `Are you sure?`,
      text: "You want to delete this banner!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      console.log({
        bannersId: payload?._id,
      })
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_banner,
        header: 'json',
        data: {
          bannersId: payload?._id,
        },
      });

      if (response?.success) {
        yield put({ type: actionTypes.GET_APP_BANNERS, payload: null });
        Swal.fire({
          title: "Deleted!",
          text: "Banner has been deleted!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to Delete the Banner",
          icon: "error",
        });
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* editBanners(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_banner,
      header: "form",
      data: payload?.data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Banner Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({ type: actionTypes.GET_APP_BANNERS, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to Updated banner",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* changeBannerStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to change banner status!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_banner_status, payload);
      console.log("Change Banner Status Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: 'Banner status has been updated', showConfirmButton: false, timer: 2000, });
      }
      yield put({ type: actionTypes.GET_APP_BANNERS, payload: null });
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Banner Status Saga Error ::: ", error?.response?.data);
  }
}

//! Teerth_Dham
function* uploadAppTeerthDham(actions) {
  try {
    const { payload } = actions
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_teerth_dham,
      header: "form",
      data: payload?.data,
    });
    
    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Teerth Dham added successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Teerth Dham",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* uploadWebTeerthDham(actions) {
  try {
    const { payload } = actions;
    console.log(payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAppTeerthDham(actions) {
  try {
    const { payload } = actions;

    const response = yield ApiRequest.getRequest({
      url: api_url + get_app_teerth_dham,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_APP_TEERTH_DHAM,
        payload: response?.teerthDham,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteTeerthDham(actions) {
  try {
    const { payload } = actions;

    const result = yield Swal.fire({
      title: `Are you sure?`,
      text: "You want to delete this Teerth Dham!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      console.log({
        bannersId: payload?._id,
      })
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_banner,
        header: 'json',
        data: {
          bannersId: payload?._id,
        },
      });

      if (response?.success) {
        yield put({ type: actionTypes.GET_APP_TEERTH_DHAM, payload: null });
        Swal.fire({
          title: "Deleted!",
          text: "Teerth Dham has been deleted!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to Delete the Teerth Dham",
          icon: "error",
        });
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* editTeerthDham(actions) {
  try {
    const { payload } = actions;
    console.log(' ::::::: ',payload);

     const response = yield ApiRequest.postRequest({
      url: api_url + update_teerth_dham,
      header: "form",
      data: payload?.data,
    });
    
    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Teerth Dham updated successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to updated Teerth Dham",
        showConfirmButton: false,
        timer: 2000,
      });
    }


    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* changeTeerthDhamStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to change Teerth Dham status!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_banner_status, payload);
      console.log("Change Teerth Dham Status Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: 'Teerth Dham status has been updated', showConfirmButton: false, timer: 2000, });
      }
      yield put({ type: actionTypes.GET_APP_TEERTH_DHAM, payload: null });
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Teerth Dham Status Saga Error ::: ", error?.response?.data);
  }
}

export default function* bannerSaga() {
  yield takeLeading(actionTypes.UPLOAD_APP_BANNER, uploadAppBanners);
  yield takeLeading(actionTypes.UPLOAD_WEB_BANNER, uploadWebBanners);
  yield takeLeading(actionTypes.GET_APP_BANNERS, getAppBanners);
  yield takeLeading(actionTypes.DELETE_BANNERS, deleteBanners);
  yield takeLeading(actionTypes.EDIT_BANNERS, editBanners)
  yield takeLeading(actionTypes.CHANGE_BANNER_STATUS, changeBannerStatus);

  //! Teerth_Dham
  yield takeLeading(actionTypes.UPLOAD_APP_TEERTH_DHAM, uploadAppTeerthDham);
  yield takeLeading(actionTypes.UPLOAD_WEB_TEERTH_DHAM, uploadWebTeerthDham);
  yield takeLeading(actionTypes.GET_APP_TEERTH_DHAM, getAppTeerthDham);
  yield takeLeading(actionTypes.DELETE_TEERTH_DHAM, deleteTeerthDham);
  yield takeLeading(actionTypes.EDIT_TEERTH_DHAM, editTeerthDham)
  yield takeLeading(actionTypes.CHANGE_TEERTH_DHAM_STATUS, changeTeerthDhamStatus);
}
