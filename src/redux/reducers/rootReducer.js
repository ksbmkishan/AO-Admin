import { combineReducers } from "redux";

import commonReducer from "./commonReducer";
import astrologerReducer from "./astrologerReducer";
import customerReducer from "./customerReducer";
import skillReducer from "./skillReducer";
import remediesReducer from "./remediesReducer";
import expertiseReducer from "./expertiseReducer";
import historyReducer from "./historyReducer";
import staticPageReducer from "./staticPageReducer";

import dashboard from "./dashboard";
import review from "./review";
import banners from "./banner";
import notification from './notification'
import reports from "./reports";
import language from './language';
import recharge from "./recharge";
import rechargeServicesHistory from "./rechargeServicesHistory";
import gift from "./gift";
import pages from "./pages";
import appAstrokunj from "./appAstrokunj";
import ecommerceReducer from "./ecommerceReducer";
import blogs from "./astroBlog";
import templeReducer from "./templeReducer";
import liveReducer from "./liveReducer";
import testimonialReducer from "./testimonialReducer";
import religiousReducer from "./religiousReducer";
import panchangReducer from "./panchang";
import templeFoundationReducer from "./templeFoundationReducer";

const rootReducer = combineReducers({
  commonReducer,
  astrologerReducer,
  customerReducer,
  skillReducer,
  remediesReducer,
  expertiseReducer,
  historyReducer,
  staticPageReducer,
  liveReducer,

  dashboard,
  review,
  banners,
  notification,
  reports,
  language,
  recharge,
  rechargeServicesHistory,
  gift,
  pages,
  appAstrokunj,
  ecommerceReducer,
  blogs,
  templeReducer,
  testimonialReducer,
  religiousReducer,
  panchangReducer,
  templeFoundationReducer,
});

export default rootReducer;
