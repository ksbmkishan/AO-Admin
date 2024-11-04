import Swal from "sweetalert2";
import { add_announcement, add_ask_question, add_astro_magazine, add_auspicious_time, add_birhat_horoscope, add_daily_panchang, add_religion_spirituality, add_yellow_book, api_url, create_app_tutorials, delete_announcement, delete_app_tutorials, delete_ask_question, delete_astro_magazine, delete_auspicious_time, delete_birhat_horoscope, delete_daily_panchang, delete_religion_spirituality, delete_yellow_book, get_all_anouncement, get_all_ask_question, get_all_astro_magazine, get_all_auspicious_time, get_all_birhat_horoscope, get_all_daily_panchang, get_all_religion_spirituality, get_all_yellow_book, get_app_tutorials, update_announcement, update_ask_question, update_astro_magazine, update_auspicious_time, update_birhat_horoscope, update_daily_panchang, update_religion_spirituality, update_yellow_book } from "../../utils/api-routes";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import * as actionTypes from "../action-types"
import {
  call,
  put,
  takeLeading,
} from "redux-saga/effects";
import { Colors } from "../../assets/styles";
import { Announcement } from "@mui/icons-material";

function* addAskQuestion(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_ask_question,
      header: "json",
      data: payload?.data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Question added successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add question",
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

function* getAskQuestion(actions) {
  try {


    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_ask_question,
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ASK_QUESTION, payload: response?.askQuestion });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}

function* deleteAskQuestion(actions) {
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
        url: api_url + delete_ask_question,
        header: 'json',
        data: { questionId: payload }
      });


      if (response?.success) {
        yield put({ type: actionTypes.GET_ASK_QUESTION, payload: null });
        Swal.fire({
          icon: "success",
          title: "Question deleted successfull",
          showConfirmButton: false,
          timer: 2000,
        });

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete question",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      console.log(response);

    }



    yield put({ type: actionTypes.DELETE_ASK_QUESTION, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_ASK_QUESTION, payload: false });
  }

}

function* updateAskQuestion(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_ask_question,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Question Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ASK_QUESTION, payload: null })
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to Update Question",
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


// Religion Spirituality

function* addReligionSpirituality(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_religion_spirituality,
      header: "json",
      data: payload?.data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Religion and Spirituality added successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Religion and Spirituality",
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


function* getAllReligionSpirituality(actions) {
  try {


    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_religion_spirituality,
    });

    console.log(response)

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_RELIGION_SPRITUALITY, payload: response?.religionSpirituality });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}

function* deleteReligionSpirituality(actions) {
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
        url: api_url + delete_religion_spirituality,
        header: 'json',
        data: { religionSpiritualityId: payload }
      });


      if (response?.success) {
        yield put({ type: actionTypes.GET_ALL_RELIGION_SPRITUALITY, payload: null });
        Swal.fire({
          icon: "success",
          title: "Religion Spirituality deleted successfull",
          showConfirmButton: false,
          timer: 2000,
        });

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete question",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      console.log(response);

    }


    yield put({ type: actionTypes.DELETE_RELIGION_SPRITUALITY, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_RELIGION_SPRITUALITY, payload: false });
  }

}

function* updateReligionSpirituality(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_religion_spirituality,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Question Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_RELIGION_SPRITUALITY, payload: null })
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to Update Question",
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


// Astro Magazine

function* addAstroMagazine(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_astro_magazine,
      header: "json",
      data: payload?.data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Astro Magazine added successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Astro Magazine",
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

function* getAstroMagazine(actions) {
  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_astro_magazine,
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_ASTRO_MAGAZINE, payload: response?.astroMagazine });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}

function* deleteAstroMagazine(actions) {
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
        url: api_url + delete_astro_magazine,
        header: 'json',
        data: { astroMagazineId: payload }
      });


      if (response?.success) {
        yield put({ type: actionTypes.GET_ALL_ASTRO_MAGAZINE, payload: null });
        Swal.fire({
          icon: "success",
          title: "Religion Spirituality deleted successfull",
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


    yield put({ type: actionTypes.DELETE_ASTRO_MAGAZINE, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_ASTRO_MAGAZINE, payload: false });
  }

}

function* updateAstroMagazine(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_astro_magazine,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ASTRO_MAGAZINE, payload: null })
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

// Announcement

function* addAnnouncement(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_announcement,
      header: "json",
      data: payload?.data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Announcement added successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Announcement",
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

function* getAllAnnouncement(actions) {
  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_anouncement,
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_ANNOUNCEMENT, payload: response?.announcement?.reverse() });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}

function* deleteAnnouncement(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    const result = yield Swal.fire({
      title: `Are you sure ?`,
      text: "You want to delete this announcement!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {

      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_announcement,
        header: 'json',
        data: { announcementId: payload }
      });


      if (response?.success) {
        yield put({ type: actionTypes.GET_ALL_ANNOUNCEMENT, payload: null });
        Swal.fire({
          icon: "success",
          title: "Deleted successfully",
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


    yield put({ type: actionTypes.DELETE_ANNOUNCEMENT, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_ANNOUNCEMENT, payload: false });
  }

}

function* updateAnnouncement(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_announcement,
      header: "json",
      data: payload?.data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
      yield put({ type: actionTypes.GET_ALL_ANNOUNCEMENT, payload: null })
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

// BIRHAT HOROSCOPE

function* addBirhatHoroscope(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_birhat_horoscope,
      header: "json",
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

function* getAllBirhatHoroscope(actions) {
  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_birhat_horoscope,
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_BIRHAT_HOROSCOPE, payload: response?.birhatHoroscope });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}


function* deleteBirhatHoroscope(actions) {
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
        url: api_url + delete_birhat_horoscope,
        header: 'json',
        data: { birhatHoroscopeId: payload }
      });


      if (response?.success) {
        yield put({ type: actionTypes.GET_ALL_BIRHAT_HOROSCOPE, payload: null });
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


    yield put({ type: actionTypes.DELETE_BIRHAT_HOROSCOPE, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_BIRHAT_HOROSCOPE, payload: false });
  }

}

function* updateBirhatHoroscope(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_birhat_horoscope,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_BIRHAT_HOROSCOPE, payload: null })
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


// Auspicious Time


function* addAuspiciousTime(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_auspicious_time,
      header: "json",
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
      yield put({ type: actionTypes.GET_ALL_AUSPICIOUS_TIME, payload: null })
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

function* getAllAuspiciousTime(actions) {
  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_auspicious_time,
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_AUSPICIOUS_TIME, payload: response?.auspiciousTime });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}

function* deleteAuspiciousTime(actions) {
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
        url: api_url + delete_auspicious_time,
        header: 'json',
        data: { auspiciousTimeId: payload }
      });


      if (response?.success) {
        yield put({ type: actionTypes.GET_ALL_AUSPICIOUS_TIME, payload: null });
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


    yield put({ type: actionTypes.DELETE_ALL_AUSPICIOUS_TIME, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_ALL_AUSPICIOUS_TIME, payload: false });
  }

}

function* updateAuspiciousTime(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_auspicious_time,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_AUSPICIOUS_TIME, payload: null })
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


// DAILY PANCHANG

function* addDailyPanchang(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_daily_panchang,
      header: "json",
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
      yield put({ type: actionTypes.GET_ALL_DAILY_PANCHANG, payload: null })
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

function* getAllDailyPanchang(actions) {
  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_daily_panchang,
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_DAILY_PANCHANG, payload: response?.dailyPanchang });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}

function* deleteDailyPanchang(actions) {
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
        url: api_url + delete_daily_panchang,
        header: 'json',
        data: { dailyPanchangId: payload }
      });

      console.log(response)


      if (response?.success) {

        Swal.fire({
          icon: "success",
          title: "Deleted successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_DAILY_PANCHANG, payload: null });

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete",
          showConfirmButton: false,
          timer: 2000,
        });
      }

    }


    yield put({ type: actionTypes.DELETE_DAILY_PANCHANG, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_DAILY_PANCHANG, payload: false });
  }

}

function* updateDailyPanchang(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_daily_panchang,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_DAILY_PANCHANG, payload: null })
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


// Yellow Book

function* addYellowBook(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_yellow_book,
      header: "json",
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
      yield put({ type: actionTypes.GET_ALL_YELLOW_BOOK, payload: null })
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

function* getAllYellowBook(actions) {
  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_yellow_book,
    });

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_YELLOW_BOOK, payload: response?.yellowBook });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}

function* deleteYellowBook(actions) {
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
        url: api_url + delete_yellow_book,
        header: 'json',
        data: { yellowBookId: payload }
      });

      console.log(response)


      if (response?.success) {

        Swal.fire({
          icon: "success",
          title: "Deleted successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_YELLOW_BOOK, payload: null });

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete",
          showConfirmButton: false,
          timer: 2000,
        });
      }

    }


    yield put({ type: actionTypes.DELETE_YELLOW_BOOK, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_YELLOW_BOOK, payload: false });
  }

}

function* updateYellowBook(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_yellow_book,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_YELLOW_BOOK, payload: null })
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

// Remedies

// function* addremedies(actions) {
//   try {
//     const { payload } = actions;
//     console.log(payload);
//     yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
//     const response = yield ApiRequest.postRequest({
//       url: api_url + add_remedies,
//       header: "json",
//       data: payload?.data,
//     });

//     if (response?.success) {
//       Swal.fire({
//         icon: "success",
//         title: "Added successfull",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       yield call(payload?.onComplete)
//       // yield put({ type: actionTypes.GET_ALL_YELLOW_BOOK, payload: null })
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Server Error",
//         text: "Failed to add ",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }

//     yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//   } catch (e) {
//     console.log(e);
//     yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//   }

// }
// function* getRemediesNew(actions) {
//   try {

//     yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
//     const response = yield ApiRequest.getRequest({
//       url: api_url + get_all_remedies,
//     });

//     if (response?.success) {
//       yield put({ type: actionTypes.SET_ALL_REMEDIES_NEW, payload: response?.remedies });
//     }

//     console.log(response);

//     yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//   } catch (e) {
//     console.log(e);
//     yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//   }

// }
// function* deleteRemediesNew(actions) {
//   try {
//     const { payload } = actions;
//     console.log(payload);
//     const result = yield Swal.fire({
//       title: `Are you sure to Delete`,
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: Colors.primaryLight,
//       cancelButtonColor: Colors.red,
//       confirmButtonText: "Delete",
//     });

//     if (result.isConfirmed) {

//       yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
//       const response = yield ApiRequest.postRequest({
//         url: api_url + delete_remedies,
//         header: 'json',
//         data: { remediesId: payload }
//       });

//       console.log(response)


//       if (response?.success) {

//         Swal.fire({
//           icon: "success",
//           title: "Deleted successfull",
//           showConfirmButton: false,
//           timer: 2000,
//         });

//         yield put({ type: actionTypes.GET_ALL_REMEDIES_NEW, payload: null });

//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Server Error",
//           text: "Failed to delete",
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }

//     }


//     yield put({ type: actionTypes.DELETE_REMEDIES_NEW, payload: false });
//   } catch (e) {
//     console.log(e);
//     yield put({ type: actionTypes.DELETE_REMEDIES_NEW, payload: false });
//   }

// }

// function* updateRemediesNew(actions) {
//   try {
//     const { payload } = actions;
//     console.log(payload);
//     yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
//     const response = yield ApiRequest.postRequest({
//       url: api_url + update_remedies,
//       header: "json",
//       data: payload,
//     });

//     if (response.success) {
//       Swal.fire({
//         icon: "success",
//         title: "Updated Successfull",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       yield put({ type: actionTypes.GET_ALL_REMEDIES_NEW, payload: null })
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Server Error",
//         text: "Failed to Update ",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }

//     console.log(response);

//     yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//   } catch (e) {
//     console.log(e);
//     yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
//   }
// }


function* createAppTutorials(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_app_tutorials,
      header: "form",
      data: payload?.data,
    });

    console.log(response);

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Tutorials added successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(payload?.onComplete)
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Tutorials",
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

function* getAppTutorials(actions) {

  try {

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = actions
    console.log(payload)
    const response = yield ApiRequest.postRequest({
      url: api_url + get_app_tutorials,
      header: 'json',
      data: payload,
    });


    if (response?.success) {
      yield put({ type: actionTypes.SET_APP_TUTORIALS, payload: response?.tutorial });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}

function* deleteAppTutorials(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    const result = yield Swal.fire({
      title: `Are you sure?`,
      text: "You want to delete!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {

      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_app_tutorials,
        header: 'json',
        data: { id: payload?.id }
      });

      console.log(response)


      if (response?.success) {

        Swal.fire({
          icon: "success",
          title: "Deleted successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_APP_TUTORIALS, payload: { type: payload?.type } });

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to delete",
          showConfirmButton: false,
          timer: 2000,
        });
      }

    }


    yield put({ type: actionTypes.DELETE_APP_TUTORIALS, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.DELETE_APP_TUTORIALS, payload: false });
  }

}






export default function* pageSaga() {
  yield takeLeading(actionTypes.ADD_ASK_QUESTIONS, addAskQuestion);
  yield takeLeading(actionTypes.GET_ASK_QUESTION, getAskQuestion);
  yield takeLeading(actionTypes.DELETE_ASK_QUESTION, deleteAskQuestion);
  yield takeLeading(actionTypes.UPDATE_ASK_QUESTION, updateAskQuestion);
  yield takeLeading(actionTypes.ADD_RELIGION_SPRITUALITY, addReligionSpirituality);
  yield takeLeading(actionTypes.GET_ALL_RELIGION_SPRITUALITY, getAllReligionSpirituality);
  yield takeLeading(actionTypes.DELETE_RELIGION_SPRITUALITY, deleteReligionSpirituality);
  yield takeLeading(actionTypes.UPDATE_RELIGION_SPRITUALITY, updateReligionSpirituality);
  yield takeLeading(actionTypes.ADD_ASTRO_MAGAZINE, addAstroMagazine);
  yield takeLeading(actionTypes.GET_ALL_ASTRO_MAGAZINE, getAstroMagazine);
  yield takeLeading(actionTypes.DELETE_ASTRO_MAGAZINE, deleteAstroMagazine);
  yield takeLeading(actionTypes.UPDATE_ASTRO_MAGAZINE, updateAstroMagazine);
  yield takeLeading(actionTypes.ADD_ANNOUNCEMENT, addAnnouncement);
  yield takeLeading(actionTypes.GET_ALL_ANNOUNCEMENT, getAllAnnouncement);
  yield takeLeading(actionTypes.DELETE_ANNOUNCEMENT, deleteAnnouncement);
  yield takeLeading(actionTypes.UPDATE_ANNOUNCEMENT, updateAnnouncement);
  yield takeLeading(actionTypes.ADD_BIRHAT_HOROSCOPE, addBirhatHoroscope);
  yield takeLeading(actionTypes.GET_ALL_BIRHAT_HOROSCOPE, getAllBirhatHoroscope);
  yield takeLeading(actionTypes.DELETE_BIRHAT_HOROSCOPE, deleteBirhatHoroscope);
  yield takeLeading(actionTypes.UPDATE_BIRHAT_HOROSCOPE, updateBirhatHoroscope);
  yield takeLeading(actionTypes.ADD_AUSPICIOUS_TIME, addAuspiciousTime);
  yield takeLeading(actionTypes.GET_ALL_AUSPICIOUS_TIME, getAllAuspiciousTime);
  yield takeLeading(actionTypes.DELETE_ALL_AUSPICIOUS_TIME, deleteAuspiciousTime);
  yield takeLeading(actionTypes.UPDATE_AUSPICIOUS_TIME, updateAuspiciousTime);
  yield takeLeading(actionTypes.ADD_DAILY_PANCHANG, addDailyPanchang);
  yield takeLeading(actionTypes.GET_ALL_DAILY_PANCHANG, getAllDailyPanchang);
  yield takeLeading(actionTypes.DELETE_DAILY_PANCHANG, deleteDailyPanchang);
  yield takeLeading(actionTypes.UPDATE_DAILY_PANCHANG, updateDailyPanchang);
  yield takeLeading(actionTypes.ADD_YELLOW_BOOK, addYellowBook);
  yield takeLeading(actionTypes.GET_ALL_YELLOW_BOOK, getAllYellowBook);
  yield takeLeading(actionTypes.DELETE_YELLOW_BOOK, deleteYellowBook);
  yield takeLeading(actionTypes.UPDATE_YELLOW_BOOK, updateYellowBook);
  // yield takeLeading(actionTypes.ADD_REMEDIES, addremedies);
  // yield takeLeading(actionTypes.GET_ALL_REMEDIES_NEW, getRemediesNew);
  // yield takeLeading(actionTypes.DELETE_REMEDIES_NEW, deleteRemediesNew);
  // yield takeLeading(actionTypes.UPDATE_REMEDIES_NEW, updateRemediesNew);
  yield takeLeading(actionTypes.CREATE_APP_TUTORIALS, createAppTutorials);
  yield takeLeading(actionTypes.GET_APP_TUTORIALS, getAppTutorials);
  yield takeLeading(actionTypes.DELETE_APP_TUTORIALS, deleteAppTutorials);
}