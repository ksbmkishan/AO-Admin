import * as actionTypes from "../action-types";

const initialState = {
  isLoading: false,
  isSidebarOpen: true,
  dashboardData: {},
  earningChartData: {},
  earningGraphData: [],
};

const dashboard = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case actionTypes.SET_IS_SIDEBAR_OPEN: {
      return {
        ...state,
        isSidebarOpen: payload,
      };
    }
    // case actionTypes.SET_DASHBOARD: {
    //   return {
    //     ...state,
    //     dashboardData: payload,
    //   };
    // }
    case actionTypes.SET_DASHBOARD_DATA: {
      return {
        ...state,
        dashboardData: payload,
      };
    }
    case actionTypes.SET_EARNING_CHART: {
      return {
        ...state,
        earningChartData: payload,
      };
    }
    case actionTypes.SET_EARNING_GRAPH: {
      return {
        ...state,
        earningGraphData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default dashboard;
