import * as actionTypes from "../action-types";
import { call, put, takeLeading } from "redux-saga/effects";
import { get_call_history, get_chat_history, get_divya_history, get_gift_history, get_live_history, get_mudra_history, get_mudra_request_history, get_video_call_history, } from "../../utils/api-routes";
import { getAPI } from "../../utils/api-function";

function* getChatHistory() {
  try {
    yield put({ type: actionTypes?.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_chat_history);
    console.log("Get Chat History Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CHAT_HISTORY, payload: data?.history?.reverse() });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Chat History Saga Error ::: ", error);
  }
}

function* getCallHistory() {
  try {
    yield put({ type: actionTypes?.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_call_history);
    console.log("Get Call History Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_CALL_HISTORY, payload: data?.history?.reverse() });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Call History Saga Error ::: ", error);
  }
}

function* getVideoCallHistory() {
  try {
    yield put({ type: actionTypes?.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_video_call_history);
    console.log("Get Video Call History Saga Response ::: ", data);

    if (data) {
      yield put({ type: actionTypes.SET_VIDEO_CALL_HISTORY, payload: data?.results?.reverse() });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Video Call History Saga Error ::: ", error);
  }
}

function* getLiveHistory() {
  try {
    yield put({ type: actionTypes?.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_live_history);
    console.log("Get Live History Saga Response ::: ", data);

    if (data) {
      yield put({ type: actionTypes.SET_LIVE_HISTORY, payload: data?.results?.reverse() });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Live History Saga Error ::: ", error);
  }
}

function* getGiftHistory() {
  try {
    yield put({ type: actionTypes?.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_gift_history);
    console.log("Get Gift History Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_GIFT_HISTORY, payload: data?.results?.reverse() });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Gift History Saga Error ::: ", error);
  }
}


function* getMudraHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_divya_history);
    console.log("Get Mudra History Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_MUDRA_HISTORY, payload: data?.data });
    } else {
      yield put({ type: actionTypes.SET_MUDRA_HISTORY, payload: [] });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Mudra History Saga Error ::: ", error);
  }
}

function* getMudraRequestHistory(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { data } = yield getAPI(get_mudra_request_history);
    console.log("Get Mudra Request History Saga Response ::: ", data);

    if (data?.success) {
      yield put({ type: actionTypes.SET_MUDRA_REQUEST_HISTORY, payload: data?.transactions?.reverse() });
    } else {
      yield put({ type: actionTypes.SET_MUDRA_REQUEST_HISTORY, payload: [] });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  } catch (error) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log("Get Mudra Request History Saga Error ::: ", error);
  }
}

export default function* historySaga() {
  yield takeLeading(actionTypes.GET_CHAT_HISTORY, getChatHistory);
  yield takeLeading(actionTypes.GET_CALL_HISTORY, getCallHistory);
  yield takeLeading(actionTypes.GET_VIDEO_CALL_HISTORY, getVideoCallHistory);
  yield takeLeading(actionTypes.GET_LIVE_HISTORY, getLiveHistory);
  yield takeLeading(actionTypes.GET_GIFT_HISTORY, getGiftHistory);
  yield takeLeading(actionTypes.GET_MUDRA_HISTORY, getMudraHistory);
  yield takeLeading(actionTypes.GET_MUDRA_REQUEST_HISTORY, getMudraRequestHistory);
};