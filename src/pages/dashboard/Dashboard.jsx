import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, TextField } from "@mui/material";
import { useStyles } from "../dashboard/dashboardStyles";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/features/Loader";
import * as DashboardActions from "../../redux/actions/dashboardActions";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import "../dashboard/dashboard.css";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const Dashboard = ({ dashboardData, earningChartData, earningGraphData, dispatch }) => {
  var classes = useStyles();
  const navigate = useNavigate();

  const size = { width: 450, height: 300, };
  const servicesData = [
    { label: "Call", value: dashboardData ? dashboardData?.totalCall : '1' },
    { label: "Chat", value: dashboardData ? dashboardData?.totalChat : '1' },
    { label: "Live Call", value: dashboardData ? dashboardData?.totalLiveCall : '1' },
    { label: "Gift", value: dashboardData ? dashboardData?.totalGifting : '1' },
  ];

  const earningChart = [
    { label: "Call", value: earningChartData ? earningChartData?.earningsByType?.call?.toFixed(2) : '1' },
    { label: "Chat", value: earningChartData ? earningChartData?.earningsByType?.chat?.toFixed(2) : '1' },
    { label: "Live Call", value: earningChartData ? earningChartData?.earningsByType?.live_video_call?.toFixed(2) : '1' },
    { label: "Gift", value: earningChartData ? earningChartData?.earningsByType?.gift?.toFixed(2) : '1' },
  ];

  const getColor = (item) => {
    switch (item.label) {
      case "Call":
        return "#ff6384";
      case "Chat":
        return "#36a2eb";
      case "Live Call":
        return "#cc65fe";
      case "Gift":
        return "#ffce56";
      default:
        return "#000000";
    }
  };

  const earningData = earningGraphData ? earningGraphData?.map(value => value?.count) : []

  useEffect(() => {
    dispatch(DashboardActions.getDashboardData())
    dispatch(DashboardActions.getEarningChart())
  }, []);

  const [yearEarning, setYearEarning] = useState(new Date().getFullYear());
  const handleDateChangeEarning = (date) => {
    if (date) {
      setYearEarning(date.getFullYear());
    }
  };

  useEffect(() => {
    dispatch(DashboardActions.getEarningGraph({ year: yearEarning }))
  }, [yearEarning]);

  return (
    <div className={classes.dashboard_container}>
      <Loader />
      <div>
        <Grid container spacing={8}>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <div className={classes.dashboard_card} onClick={() => navigate("/astrologer")} style={{ backgroundColor: "#fff" }}>
              <Grid container spacing={0}>
                <Grid item lg={6} sm={12} md={12} xs={12} style={{cursor:'pointer'}}>
                  <div className="donut">
                    <img src={require("../../assets/images/zodiac.png")} alt="zodiac" style={{ height: "4rem", width: "4rem" }} />
                  </div>
                </Grid>
                <Grid item lg={6} sm={12} md={12} xs={12} style={{cursor:'pointer'}}>
                  <div className="bonut">
                    <h5 style={{ paddingTop: "10px" }}>{dashboardData && dashboardData?.totalAstrologer}</h5>
                    <h6>All Astrologers</h6>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12} >
            <div className={classes.dashboard_card} onClick={() => navigate("/customer")} style={{ backgroundColor: "#fff" }}>
              <Grid container spacing={0}  >
                <Grid item lg={6} sm={12} md={12} xs={12} style={{cursor:'pointer'}} >
                  <div className="donut">
                    <img src={require("../../assets/images/team.png")} alt="zodiac" style={{ height: "4rem", width: "4rem" }} />
                  </div>
                </Grid>
                <Grid item lg={6} sm={12} md={12} xs={12} style={{cursor:'pointer'}} >
                  <div className="bonut">
                    <h5 style={{ paddingTop: "10px" }}>{dashboardData && dashboardData?.totalCustomer}</h5>
                    <h6>All Customers</h6>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div className={classes.graph_card}>
              <div style={{ padding: "10px", fontSize: "25px", }}>
                <h6>Services Used</h6>
              </div>

              <PieChart
                series={[ 
                  {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 45,
                    data: servicesData.map((item) => ({
                      ...item,
                      color: getColor(item),
                    })),
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontWeight: "bold",
                  },
                }}
                {...size}
              />
            <h5 style={{ paddingTop: "10px" }}> Total Services : {dashboardData?.totalServices}</h5>
              
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <div className={classes.graph_card}>
              <div style={{ padding: "10px", fontSize: "25px", }}>
                <h6>Earning Chart</h6>
              </div>

              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 45,
                    data: earningChart.map((item) => ({
                      ...item,
                      color: getColor(item),
                    })),
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontWeight: "bold",
                  },
                }}
                {...size}
              />

            <h5 style={{ paddingTop: "10px" }}> Total Earning Chart : {dashboardData?.totalEnquiryAstrologer}</h5>
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.graph_card}>
              <div style={{ padding: "10px", fontSize: "25px", }}>
                <h6>Yearly Growth </h6>
              </div>
              <LineChart
                xAxis={[{ scaleType: 'point', data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] }]}
                series={[{ data: earningData },]}
                width={800}
                height={300}
              />
              <DatePicker
                onChange={handleDateChangeEarning}
                value={new Date(yearEarning, 0, 1)}
                format="yyyy"
                showLeadingZeros={true}
                clearIcon={null}
                calendarIcon={null}
                view="decade"
                maxDetail="decade"
                style={{ outline: "none" }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboardData: state.dashboard.dashboardData,
  earningChartData: state.dashboard.earningChartData,
  earningGraphData: state.dashboard.earningGraphData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
