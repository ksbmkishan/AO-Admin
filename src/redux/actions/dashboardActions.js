import * as actionTypes from "../action-types";

export const setIsLoading = (payload) => ({
  type: actionTypes.SET_IS_LOADING,
  payload,
});

export const setIsSidebarOpne = (payload) => ({
  type: actionTypes.SET_IS_SIDEBAR_OPEN,
  payload,
});

export const setDashboard = payload => ({
  type: actionTypes.SET_DASHBOARD,
  payload
})

export const getDashboard = payload => ({
  type: actionTypes.GET_DASHBOARD,
  payload
})


export const getDashboardData = payload => ({
  type: actionTypes.GET_DASHBOARD_DATA,
  payload
})

export const setDashboardData = payload => ({
  type: actionTypes.SET_DASHBOARD_DATA,
  payload
})

export const getEarningChart = payload => ({
  type: actionTypes.GET_EARNING_CHART,
  payload
})

export const setEarningChart = payload => ({
  type: actionTypes.SET_EARNING_CHART,
  payload
})

export const getEarningGraph = payload => ({
  type: actionTypes.GET_EARNING_GRAPH,
  payload
})

export const setEarningGraph = payload => ({
  type: actionTypes.SET_EARNING_GRAPH,
  payload
})