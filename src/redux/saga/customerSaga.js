
import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { change_customer_banned_unbanned_status, create_customer, delete_customer_by_id, get_call_history_by_customer_id, get_chat_history_by_customer_id, get_customer, get_customer_by_id, get_following_history_by_customer_id, get_live_history_by_customer_id, get_mudra_history_by_customer_id, get_mudra_history_history_by_customer_id, get_order_history_by_customer_id, get_puja_history_by_customer_id, get_review_history_by_customer_id, get_video_call_history_by_customer_id, update_customer_by_id, update_wallet_by_customer_id } from "../../utils/api-routes";

function* getCustomer() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_customer);
    console.log("Get Customer Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CUSTOMER, payload: data?.customers?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Customer Saga Error ::: ", error);
  }
}

function* getCustomerById(action) {
  try {
    const { payload } = action;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_customer_by_id, payload);
    console.log("Get Customer By Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CUSTOMER_BY_ID, payload: data?.results });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Customer By Id Saga Error ::: ", error);
  }
}

function* createCustomer(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_customer, payload?.data);
    console.log("Create Customer Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Customer Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Create Customer Saga Error ::: ", error);
  }
}

function* updateCustomerById(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_customer_by_id, payload?.data);
    console.log("Update Customer By Id Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Customer Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Customer By Id Saga Error ::: ", error);
  }
}

function* deleteCustomerById(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_customer_by_id, payload);
      console.log("Delete Customer By Id Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Customer Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_CUSTOMER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Delete Customer By Id Saga Error ::: ", error);
  }
}

function* changeCustomerBannedUnbannedStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to  ${!payload?.status ? 'Banned' : 'Unbanned'} this Customer!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_customer_banned_unbanned_status, payload);
      console.log("Change Customer Banned-Unbanned Status Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: `Customer has been ${!payload?.status ? 'Banned' : 'Unbanned'}`, showConfirmButton: false, timer: 2000, });
        yield put({ type: actionTypes.GET_CUSTOMER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Customer Banned-Unbanned Status Saga Error ::: ", error?.response?.data);
  }
}

function* updateWalletByCustomerId(action) {
  const { payload } = action;
  console.log("Payload ::: ", payload);
  try {

    const { data } = yield postAPI(update_wallet_by_customer_id, payload?.data);
    console.log("Update Wallet By CustomerId Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
      yield put({ type: actionTypes.GET_CUSTOMER, payload: null });
    }

  } catch (error) {
    yield call(payload?.onComplete);
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Wallet By CustomerId Saga Error ::: ", error);
  }
}

function* getChatHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_chat_history_by_customer_id, payload);
    console.log("Get Chat History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CHAT_HISTORY_BY_CUSTOMER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Chat History By Customer Id Saga Error ::: ", error);
  }
}

function* getCallHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_call_history_by_customer_id, payload);
    console.log("Get Call History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CALL_HISTORY_BY_CUSTOMER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Call History By Customer Id Saga Error ::: ", error);
  }
}

function* getVideoCallHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_video_call_history_by_customer_id, payload);
    console.log("Get Video Call History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_VIDEO_CALL_HISTORY_BY_CUSTOMER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Video Call History By Customer Id Saga Error ::: ", error);
  }
}

function* getLiveHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_live_history_by_customer_id, payload);
    console.log("Get Live History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_LIVE_HISTORY_BY_CUSTOMER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Live History By Customer Id Saga Error ::: ", error);
  }
}

function* getPujaHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_puja_history_by_customer_id, payload);
    console.log("Get Puja History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_PUJA_HISTORY_BY_CUSTOMER_ID, payload: data?.data?.reverse() });
    } else {
      yield put({ type: actionTypes.SET_PUJA_HISTORY_BY_CUSTOMER_ID, payload: [] });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Puja History By Customer Id Saga Error ::: ", error);
  }
}

function* getOrderHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_order_history_by_customer_id, payload);
    console.log("Get Order History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_ORDER_HISTORY_BY_CUSTOMER_ID, payload: data?.data?.reverse() });
    } else {
      yield put({ type: actionTypes.SET_ORDER_HISTORY_BY_CUSTOMER_ID, payload: [] });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Order History By Customer Id Saga Error ::: ", error);
  }
}

function* getFollowingHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_following_history_by_customer_id, payload);
    console.log("Get Following History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_FOLLOWING_HISTORY_BY_CUSTOMER_ID, payload: data?.data?.reverse() });
    } else {
      yield put({ type: actionTypes.SET_FOLLOWING_HISTORY_BY_CUSTOMER_ID, payload: [] });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Following History By Customer Id Saga Error ::: ", error);
  }
}

function* getReviewHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_review_history_by_customer_id, payload);
    console.log("Get Review History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_REVIEW_HISTORY_BY_CUSTOMER_ID, payload: data?.reviews?.reverse() });
    } else {
      yield put({ type: actionTypes.SET_REVIEW_HISTORY_BY_CUSTOMER_ID, payload: [] });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Review History By Customer Id Saga Error ::: ", error);
  }
}

function* getMudraHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_mudra_history_by_customer_id(payload?.customerId));
    console.log("Get Mudra History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_MUDRA_HISTORY_BY_CUSTOMER_ID, payload: data?.transactions?.reverse() });
    } else {
      yield put({ type: actionTypes.SET_MUDRA_HISTORY_BY_CUSTOMER_ID, payload: [] });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Mudra History By Customer Id Saga Error ::: ", error);
  }
}

function* getMudraRequestHistoryByCustomerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_mudra_history_history_by_customer_id(payload?.customerId));
    console.log("Get Mudra Request History By Customer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_MUDRA_REQUEST_HISTORY_BY_CUSTOMER_ID, payload: data?.requests?.reverse() });
    } else {
      yield put({ type: actionTypes.SET_MUDRA_REQUEST_HISTORY_BY_CUSTOMER_ID, payload: [] });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Mudra Request History By Customer Id Saga Error ::: ", error);
  }
}

export default function* customerSaga() {
  yield takeLeading(actionTypes?.GET_CUSTOMER, getCustomer);
  yield takeLeading(actionTypes?.GET_CUSTOMER_BY_ID, getCustomerById);
  yield takeLeading(actionTypes?.CREATE_CUSTOMER, createCustomer);
  yield takeLeading(actionTypes?.UPDATE_CUSTOMER_BY_ID, updateCustomerById);
  yield takeLeading(actionTypes?.DELETE_CUSTOMER_BY_ID, deleteCustomerById);
  yield takeLeading(actionTypes?.CHANGE_CUSTOMER_BANNED_UNBANNED_STATUS, changeCustomerBannedUnbannedStatus);
  yield takeLeading(actionTypes?.UPDATE_WALLET_BY_CUSTOMER_ID, updateWalletByCustomerId);
  yield takeLeading(actionTypes?.GET_CHAT_HISTORY_BY_CUSTOMER_ID, getChatHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_CALL_HISTORY_BY_CUSTOMER_ID, getCallHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_VIDEO_CALL_HISTORY_BY_CUSTOMER_ID, getVideoCallHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_LIVE_HISTORY_BY_CUSTOMER_ID, getLiveHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_PUJA_HISTORY_BY_CUSTOMER_ID, getPujaHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_ORDER_HISTORY_BY_CUSTOMER_ID, getOrderHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_FOLLOWING_HISTORY_BY_CUSTOMER_ID, getFollowingHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_REVIEW_HISTORY_BY_CUSTOMER_ID, getReviewHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_MUDRA_HISTORY_BY_CUSTOMER_ID, getMudraHistoryByCustomerId);
  yield takeLeading(actionTypes?.GET_MUDRA_REQUEST_HISTORY_BY_CUSTOMER_ID, getMudraRequestHistoryByCustomerId);
};