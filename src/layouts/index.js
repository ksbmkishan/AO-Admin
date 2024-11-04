import React from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./sidebar";
import Header from "./header";
import * as CommonActions from '../redux/actions/dashboardActions'

const Layout = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector(state => state?.dashboard);

  const handleClickOutside = () => {
    dispatch(CommonActions.setIsSidebarOpne(!isSidebarOpen));
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1, height: "100vh", overflowY: "auto" }}>
          <Header />
          <main style={{ color: "#000", padding: "30px", backgroundColor: "#F1F2F7", minHeight: "calc(100vh - 62px)" }}>
            {/* <main style={{ color: "#000", backgroundColor: "#F4F5F9", minHeight: "100vh" }}> */}
            <Outlet />
          </main>
        </div>
        <div onClick={handleClickOutside} className={`overlay ${isSidebarOpen ? "show" : ""}`}></div>
      </div>
    </>
  );
};

export default Layout;