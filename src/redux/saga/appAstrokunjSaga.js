import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import * as actionTypes from "../action-types"
import {
    call,
    put,
    takeLeading,
  } from "redux-saga/effects";
import { Colors } from "../../assets/styles";
import { add_annaprashan, add_mundanMuhurat, add_numerology, add_vivahMuhurat, api_url, delete_annaprashan, delete_mundanMuhurat, delete_numerology, delete_vivahMuhurat, get_all_annaprashan, get_all_mundanMuhurat, get_all_numerology, get_all_vivahMuhurat, update_annaprashan, update_mundanMuhurat, update_numerology, update_vivahMuhurat } from "../../utils/api-routes";




function* addNumerology( actions){
    try {
        const { payload } = actions;
        console.log(payload);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield ApiRequest.postRequest({
          url: api_url + add_numerology,
          header: "form",
          data: payload?.data,
        });
    
        if (response?.success) {
          Swal.fire({
            icon: "success",
            title: "Added successfull",
            showConfirmButton: false,
            timer: 2000,
          });
          yield call(payload?.onComplete)
        } else {
          Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Failed to add ",
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

function* getNumerology( actions){
  try {
    
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.getRequest({
        url: api_url + get_all_numerology,
      });
  
      if (response?.success) {
        yield put({ type: actionTypes.SET_NUMEROLOGY, payload: response?.numerology });
      } 
  
      console.log(response);
  
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
      console.log(e);
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

}

function* deleteNumerology( actions){
  try {
      const { payload } = actions;
      console.log(payload);
      const result = yield Swal.fire({
        title: `Are you sure to Delete`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: Colors.primaryLight,
        cancelButtonColor: Colors.red,
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_numerology,
        header: 'json',
        data:{ numerologyId: payload}
      });
  
    
      if (response?.success) {
        yield put({ type: actionTypes.GET_NUMEROLOGY, payload: null });
        Swal.fire({
          icon: "success",
          title: "Deleted successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete",
          showConfirmButton: false,
          timer: 2000,
        });
      }
  
      console.log(response);
  
      }


      yield put({ type: actionTypes.DELETE_NUMEROLOGY, payload: false });
    } catch (e) {
      console.log(e);
      yield put({ type: actionTypes.DELETE_NUMEROLOGY, payload: false });
    }

}

function* updateNumerology(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_numerology,
      header: "form",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_NUMEROLOGY, payload: null })
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to Update ",
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



function* addVivahMuhurat( actions){
  try {
      const { payload } = actions;
      console.log(payload);
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + add_vivahMuhurat,
        header: "form",
        data: payload?.data,
      });
  
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Added successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        yield call(payload?.onComplete)
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to add ",
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

function* getVivahMuhurat( actions){
  try {
    
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.getRequest({
        url: api_url + get_all_vivahMuhurat,
      });
  
      if (response?.success) {
        yield put({ type: actionTypes.SET_VIVAHMUHURAT, payload: response?.vivahMuhurat });
      } 
  
      console.log(response);
  
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
      console.log(e);
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

}

function* deleteVivahMuhurat( actions){
  try {
      const { payload } = actions;
      console.log(payload);
      const result = yield Swal.fire({
        title: `Are you sure to Delete`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: Colors.primaryLight,
        cancelButtonColor: Colors.red,
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_vivahMuhurat,
        header: 'json',
        data:{vivahMuhuratId: payload}
      });
  
    
      if (response?.success) {
        yield put({ type: actionTypes.GET_VIVAHMUHURAT, payload: null });
        Swal.fire({
          icon: "success",
          title: "Deleted successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete",
          showConfirmButton: false,
          timer: 2000,
        });
      }
  
      console.log(response);
  
      }


      yield put({ type: actionTypes.DELETE_VIVAHMUHURAT, payload: false });
    } catch (e) {
      console.log(e);
      yield put({ type: actionTypes.DELETE_VIVAHMUHURAT, payload: false });
    }

}

function* updateVivahMuhurat(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_vivahMuhurat,
      header: "form",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_VIVAHMUHURAT, payload: null })
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to Update ",
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



function* addMundanMuhurat( actions){
  try {
      const { payload } = actions;
      console.log(payload);
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + add_mundanMuhurat,
        header: "form",
        data: payload?.data,
      });
  
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Added successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        yield call(payload?.onComplete)
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to add ",
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

function* getMundanMuhurat( actions){
  try {
    
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.getRequest({
        url: api_url + get_all_mundanMuhurat,
      });
  
      if (response?.success) {
        yield put({ type: actionTypes.SET_MUNDANMUHURAT, payload: response?.mundanMuhurat });
      } 
  
      console.log(response);
  
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
      console.log(e);
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

}

function* deleteMundanMuhurat( actions){
  try {
      const { payload } = actions;
      console.log(payload);
      const result = yield Swal.fire({
        title: `Are you sure to Delete`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: Colors.primaryLight,
        cancelButtonColor: Colors.red,
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_mundanMuhurat,
        header: 'json',
        data:{mundanMuhuratId: payload}
      });
  
    
      if (response?.success) {
        yield put({ type: actionTypes.GET_MUNDANMUHURAT, payload: null });
        Swal.fire({
          icon: "success",
          title: "Deleted successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete",
          showConfirmButton: false,
          timer: 2000,
        });
      }
  
      console.log(response);
  
      }


      yield put({ type: actionTypes.DELETE_MUNDANMUHURAT, payload: false });
    } catch (e) {
      console.log(e);
      yield put({ type: actionTypes.DELETE_MUNDANMUHURAT, payload: false });
    }

}
function* updateMundanMuhurat(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_mundanMuhurat,
      header: "form",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_MUNDANMUHURAT, payload: null })
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to Update ",
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


function* addAnnaprashan( actions){
  try {
      const { payload } = actions;
      console.log(payload);
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + add_annaprashan,
        header: "form",
        data: payload?.data,
      });
  
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Added successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        yield call(payload?.onComplete)
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to add ",
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
function* getAnnaprashan( actions){
  try {
    
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.getRequest({
        url: api_url + get_all_annaprashan,
      });
  
      if (response?.success) {
        yield put({ type: actionTypes.SET_ANNAPRASHAN, payload: response?.annaprashan });
      } 
  
      console.log(response);
  
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
      console.log(e);
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }

}
function* deleteAnnaprashan( actions){
  try {
      const { payload } = actions;
      console.log(payload);
      const result = yield Swal.fire({
        title: `Are you sure to Delete`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: Colors.primaryLight,
        cancelButtonColor: Colors.red,
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_annaprashan,
        header: 'json',
        data:{annaprashanId: payload}
      });
  
    
      if (response?.success) {
        yield put({ type: actionTypes.GET_ANNAPRASHAN, payload: null });
        Swal.fire({
          icon: "success",
          title: "Deleted successfull",
          showConfirmButton: false,
          timer: 2000,
        });
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete",
          showConfirmButton: false,
          timer: 2000,
        });
      }
  
      console.log(response);
  
      }


      yield put({ type: actionTypes.DELETE_ANNAPRASHAN, payload: false });
    } catch (e) {
      console.log(e);
      yield put({ type: actionTypes.DELETE_ANNAPRASHAN, payload: false });
    }

}
function* updateAnnaprashan(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_annaprashan,
      header: "form",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ANNAPRASHAN, payload: null })
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to Update ",
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





export default function* appAstrokunjSaga() {
    yield takeLeading(actionTypes.ADD_NUMEROLOGY, addNumerology);
    yield takeLeading(actionTypes.GET_NUMEROLOGY, getNumerology);
    yield takeLeading(actionTypes.DELETE_NUMEROLOGY, deleteNumerology);
    yield takeLeading(actionTypes.UPDATE_NUMEROLOGY, updateNumerology);
    yield takeLeading(actionTypes.ADD_VIVAHMUHURAT, addVivahMuhurat);
    yield takeLeading(actionTypes.GET_VIVAHMUHURAT, getVivahMuhurat);
    yield takeLeading(actionTypes.DELETE_VIVAHMUHURAT, deleteVivahMuhurat);
    yield takeLeading(actionTypes.UPDATE_VIVAHMUHURAT, updateVivahMuhurat);
    yield takeLeading(actionTypes.ADD_MUNDANMUHURAT, addMundanMuhurat);
    yield takeLeading(actionTypes.GET_MUNDANMUHURAT, getMundanMuhurat);
    yield takeLeading(actionTypes.DELETE_MUNDANMUHURAT, deleteMundanMuhurat);
    yield takeLeading(actionTypes.UPDATE_MUNDANMUHURAT, updateMundanMuhurat);
    yield takeLeading(actionTypes.ADD_ANNAPRASHAN, addAnnaprashan);
    yield takeLeading(actionTypes.GET_ANNAPRASHAN, getAnnaprashan);
    yield takeLeading(actionTypes.DELETE_ANNAPRASHAN, deleteAnnaprashan);
    yield takeLeading(actionTypes.UPDATE_ANNAPRASHAN, updateAnnaprashan);
   
  }