import Swal from "sweetalert2";
import { call, put, takeLeading } from "redux-saga/effects";
import { Color } from "../../assets/colors";
import * as actionTypes from "../action-types";
import { getAPI, postAPI } from "../../utils/api-function";
import { add_astrologer, api_url, approve_astrologer_withdrawal_request_amount, change_astrologer_call_status, change_astrologer_chat_status, change_astrologer_video_call_status, change_call_status, change_chat_status, change_enquiry_status, create_astrologer, create_qualifications, delete_astrologer, delete_astrologer_by_id, get_all_astrologers, get_astrologer, get_astrologer_by_id, get_astrologer_inquiry, get_astrologer_withdrawal_request, get_call_history_by_astrologer_id, get_chat_history_by_astrologer_id, get_enquired_astrologer, get_enquiry_astrologer, get_gift_history_by_astrologer_id, get_live_history_by_astrologer_id, get_puja_history_by_astrologer_id, get_qualifications, get_recent_live_streaming, get_request_astrologer, get_review_by_astrologer_id, get_transaction_history_by_astrologer_id, get_video_call_history_by_astrologer_id, update_astrologer, update_astrologer_by_id, update_qualifications, update_request_astrologer, update_wallet_by_astrologer_id, verify_astrologer, verify_astrologer_profile, } from "../../utils/api-routes";

function* getAstrologer() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_astrologer);
    console.log("Get Astrologer Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_ASTROLOGER, payload: data?.astrologers?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Astrologer Saga Error ::: ", error);
  }
}

function* getAstrologerById(action) {
  try {
    const { payload } = action;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_astrologer_by_id, payload);
    console.log("Get Astrologer By Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_ASTROLOGER_BY_ID, payload: data?.results });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Astrologer By Id Saga Error ::: ", error);
  }
}

function* getEnquiryAstrologer() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_enquiry_astrologer);
    console.log("Get Enquiry Astrologer Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_ENQUIRY_ASTROLOGER, payload: data?.astrologerInquiry?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Enquiry Astrologer Saga Error ::: ", error);
  }
}

function* createAstrologer(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(create_astrologer, payload?.data);
    console.log("Create Astrologer Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Astrologer Created Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Create Astrologer Saga Error ::: ", error);
  }
}

function* updateAstrologerById(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const { data } = yield postAPI(update_astrologer_by_id, payload?.data);
    console.log("Update Astrologer By Id Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: "Astrologer Updated Successfully", showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Astrologer By Id Saga Error ::: ", error);
  }
}

function* deleteAstrologerById(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

    if (result.isConfirmed) {
      const { data } = yield postAPI(delete_astrologer_by_id, payload);
      console.log("Delete Astrologer By Id Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: "Astrologer Deleted Successfully", showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes?.GET_ASTROLOGER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
    console.log("Delete Astrologer By Id Saga Error ::: ", error);
  }
}

function* getChatHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_chat_history_by_astrologer_id, payload);
    console.log("Get Chat History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CHAT_HISTORY_BY_ASTROLOGER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Chat History By Astrologer Id Saga Error ::: ", error);
  }
}

function* getCallHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_call_history_by_astrologer_id, payload);
    console.log("Get Call History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CALL_HISTORY_BY_ASTROLOGER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Call History By Astrologer Id Saga Error ::: ", error);
  }
}

function* getVideoCallHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_video_call_history_by_astrologer_id, payload);
    console.log("Get Video Call History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_VIDEO_CALL_HISTORY_BY_ASTROLOGER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Video Call History By Astrologer Id Saga Error ::: ", error);
  }
}

function* getLiveHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_live_history_by_astrologer_id, payload);
    console.log("Get Live History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_LIVE_HISTORY_BY_ASTROLOGER_ID, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Live History By Astrologer Id Saga Error ::: ", error);
  }
}

function* getGiftHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_gift_history_by_astrologer_id, payload);
    console.log("Get Gift History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_GIFT_HISTORY_BY_ASTROLOGER_ID, payload: data?.results?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Gift History By Astrologer Id Saga Error ::: ", error);
  }
}

function* getReviewByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_review_by_astrologer_id, payload);
    console.log("Get Review By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_REVIEW_BY_ASTROLOGER_ID, payload: data?.reviews?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } else {
      yield put({ type: actionTypes.SET_REVIEW_BY_ASTROLOGER_ID, payload: [] });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Review By Astrologer Id Saga Error ::: ", error);
  }
}

function* getTransactionHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_transaction_history_by_astrologer_id, payload);
    console.log("Get Transaction History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_TRANSACTION_HISTORY_BY_ASTROLOGER_ID, payload: data?.results?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Transaction History By Astrologer Id Saga Error ::: ", error);
  }
}

function* getPujaHistoryByAstrologerId(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield postAPI(get_puja_history_by_astrologer_id, payload);
    console.log("Get Puja History By Astrologer Id Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_PUJA_HISTORY_BY_ASTROLOGER_ID, payload: data?.results?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Puja History By Astrologer Id Saga Error ::: ", error);
  }
}

function* updateWalletByAstrologerId(action) {
  const { payload } = action;
  console.log("Payload ::: ", payload);
  try {

    const { data } = yield postAPI(update_wallet_by_astrologer_id, payload?.data);
    console.log("Update Wallet By AstrologerId Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
      yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
    }

  } catch (error) {
    yield call(payload?.onComplete);
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Update Wallet By AstrologerId Saga Error ::: ", error);
  }
}

function* verifyAstrologerProfile(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to  ${payload?.isVerified == 'false' ? 'Unverified' : 'Verified'} this Astrologer!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(verify_astrologer_profile, payload);
      console.log("Verify Astrologer Profile Saga Response ::: ", data);

      if (data?.success) {
        Swal.fire({ icon: "success", title: 'Success', text: payload?.isVerified == 'true' ? 'Astrologer is set to verified' : 'Astrologer is set to unverified', showConfirmButton: false, timer: 2000, });
        yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Verify Astrologer Profile Saga Error ::: ", error?.response?.data);
  }
}

function* changeAstrologerChatStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);
    yield call(payload?.onComplete);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to change chat status!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_astrologer_chat_status, payload?.data);
      console.log("Change Astrologer Chat Status Saga Response ::: ", data);

      if (data?.success) {
        if (data?.type == 'Not Verified') {
          Swal.fire({ icon: "info", title: 'Info', text: data?.message, showConfirmButton: false, timer: 2000, });
        } else {
          Swal.fire({ icon: "success", title: 'Success', text: 'Chat status has been updated', showConfirmButton: false, timer: 2000, });
        }
        yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Astrologer Chat Status Saga Error ::: ", error?.response?.data);
  }
}

function* changeAstrologerCallStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);
    yield call(payload?.onComplete);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to change call status!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_astrologer_call_status, payload?.data);
      console.log("Change Astrologer Call Status Saga Response ::: ", data);

      if (data?.success) {
        if (data?.type == 'Not Verified') {
          Swal.fire({ icon: "info", title: 'Info', text: data?.message, showConfirmButton: false, timer: 2000, });
        } else {
          Swal.fire({ icon: "success", title: 'Success', text: 'Call status has been updated', showConfirmButton: false, timer: 2000, });
        }
        yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Astrologer Call Status Saga Error ::: ", error?.response?.data);
  }
}

function* changeAstrologerVideoCallStatus(action) {
  try {
    const { payload } = action;
    console.log("Payload ::: ", payload);
    yield call(payload?.onComplete);

    const result = yield Swal.fire({
      title: `Are you sure ?`, text: `You want to change video call status!!!`,
      icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      const { data } = yield postAPI(change_astrologer_video_call_status, payload?.data);
      console.log("Change Astrologer Video Call Status Saga Response ::: ", data);

      if (data?.success) {
        if (data?.type == 'Not Verified') {
          Swal.fire({ icon: "info", title: 'Info', text: data?.message, showConfirmButton: false, timer: 2000, });
        } else {
          Swal.fire({ icon: "success", title: 'Success', text: 'Video call status has been updated', showConfirmButton: false, timer: 2000, });
        }
        yield put({ type: actionTypes.GET_ASTROLOGER, payload: null });
      }
    }

  } catch (error) {
    Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
    console.log("Change Astrologer Video Call Status Saga Error ::: ", error?.response?.data);
  }
}

function* getAstrologerWithdrawalRequest() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_astrologer_withdrawal_request);
    console.log("Get Astrologer Withdrawal Request Saga Response ::: ", data);

    if (data) {
      yield put({ type: actionTypes.SET_ASTROLOGER_WITHDRAWAL_REQUEST, payload: data?.data?.reverse() });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Astrologer Withdrawal Request Saga Error ::: ", error);
  }
}


function* approveAstrologerWithdrawalRequestAmount(action) {
  const { payload } = action;
  console.log("Payload ::: ", payload);
  try {

    const { data } = yield postAPI(approve_astrologer_withdrawal_request_amount, payload?.data);
    console.log("Approve Astrologer Withdrawal Request Amount Saga Response ::: ", data);

    if (data?.success) {
      Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000 });
      yield call(payload?.onComplete);
      yield put({ type: actionTypes.GET_ASTROLOGER_WITHDRAWAL_REQUEST, payload: null });
    }

  } catch (error) {
    yield call(payload?.onComplete);
    Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
    console.log("Approve Astrologer Withdrawal Request Amount Saga Error ::: ", error);
  }
}

export default function* astrologerSaga() {
  yield takeLeading(actionTypes?.GET_ASTROLOGER, getAstrologer);
  yield takeLeading(actionTypes?.GET_ENQUIRY_ASTROLOGER, getEnquiryAstrologer);
  yield takeLeading(actionTypes?.GET_ASTROLOGER_BY_ID, getAstrologerById);
  yield takeLeading(actionTypes?.CREATE_ASTROLOGER, createAstrologer);
  yield takeLeading(actionTypes?.UPDATE_ASTROLOGER_BY_ID, updateAstrologerById);
  yield takeLeading(actionTypes?.DELETE_ASTROLOGER_BY_ID, deleteAstrologerById);
  yield takeLeading(actionTypes?.GET_CHAT_HISTORY_BY_ASTROLOGER_ID, getChatHistoryByAstrologerId);
  yield takeLeading(actionTypes?.GET_CALL_HISTORY_BY_ASTROLOGER_ID, getCallHistoryByAstrologerId);
  yield takeLeading(actionTypes?.GET_VIDEO_CALL_HISTORY_BY_ASTROLOGER_ID, getVideoCallHistoryByAstrologerId);
  yield takeLeading(actionTypes?.GET_LIVE_HISTORY_BY_ASTROLOGER_ID, getLiveHistoryByAstrologerId);
  yield takeLeading(actionTypes?.GET_GIFT_HISTORY_BY_ASTROLOGER_ID, getGiftHistoryByAstrologerId);
  yield takeLeading(actionTypes?.GET_REVIEW_BY_ASTROLOGER_ID, getReviewByAstrologerId);
  yield takeLeading(actionTypes?.GET_TRANSACTION_HISTORY_BY_ASTROLOGER_ID, getTransactionHistoryByAstrologerId);
  yield takeLeading(actionTypes?.GET_PUJA_HISTORY_BY_ASTROLOGER_ID, getPujaHistoryByAstrologerId);
  yield takeLeading(actionTypes?.UPDATE_WALLET_BY_ASTROLOGER_ID, updateWalletByAstrologerId);
  yield takeLeading(actionTypes?.VERIFY_ASTROLOGER_PROFILE, verifyAstrologerProfile);
  yield takeLeading(actionTypes?.CHANGE_ASTROLOGER_CHAT_STATUS, changeAstrologerChatStatus);
  yield takeLeading(actionTypes?.CHANGE_ASTROLOGER_CALL_STATUS, changeAstrologerCallStatus);
  yield takeLeading(actionTypes?.CHANGE_ASTROLOGER_VIDEO_CALL_STATUS, changeAstrologerVideoCallStatus);
  yield takeLeading(actionTypes?.GET_ASTROLOGER_WITHDRAWAL_REQUEST, getAstrologerWithdrawalRequest);
  yield takeLeading(actionTypes?.APPROVE_ASTROLOGER_WITHDRAWAL_REQUEST_AMOUNT, approveAstrologerWithdrawalRequestAmount);
}