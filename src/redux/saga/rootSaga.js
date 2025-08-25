import { all } from "redux-saga/effects";

import staticPageSaga from "./staticPageSaga";
import reviewSaga from "./reviewSaga";
import customerSaga from "./customerSaga";
import astrologerSaga from "./astrologerSaga";
import expertiseSaga from "./expertiseSaga";
import skillSaga from "./skillSaga";
import remediesSaga from "./remediesSaga";
import bannerSaga from './bannerSaga'
import notificationSaga from "./notificationSaga";
import historySaga from "./historySaga"
import dashboardSaga from "./dashboardSaga";
import reportSaga from "./reportsSaga";
import languageSaga from "./languageSaga"
import rechargeSaga from "./rechargeSaga";
import rechargeServiceHistorySaga from "./rechargeServicesHistorySaga";
import giftSaga from "./giftSaga";
import pageSaga from "./pageSaga";
import appAstrokunjSaga from "./appAstrokunjSaga";
//! New 
import ecommerceSaga from "./ecommerceSaga";
import astroBlogSaga from "./astroBlogSaga";
import templeSaga from "./templeSaga";
import liveSaga from "./liveSaga";
import testimonialSaga from "./testimonialSaga";
import religiousSaga from "./religiousSaga";
import panchangSaga from "./panchangSaga";
import templeFoundationSaga from "./templeFoundationSaga";

export default function* rootSaga() {
  yield all([
    skillSaga(),
    remediesSaga(),
    expertiseSaga(),
    staticPageSaga(),
    reviewSaga(),
    customerSaga(),
    astrologerSaga(),
    bannerSaga(),
    notificationSaga(),
    historySaga(),
    dashboardSaga(),
    reportSaga(),
    languageSaga(),
    rechargeSaga(),
    rechargeServiceHistorySaga(),
    giftSaga(),
    pageSaga(),
    appAstrokunjSaga(),
    ecommerceSaga(),
    astroBlogSaga(),
    templeSaga(),
    liveSaga(),
    testimonialSaga(),
    religiousSaga(),
    panchangSaga(),
    templeFoundationSaga(),
  ]);
}
