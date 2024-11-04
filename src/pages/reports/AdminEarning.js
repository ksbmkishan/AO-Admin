import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import moment from "moment";

import { dataTableCustomStyles, useStyles } from "../../assets/styles";
import Loader from "../../components/features/Loader.jsx";
import { secondsToHMS } from "../../utils/common-function";
import CsvDownloader from "../../components/features/CsvDownloader.jsx";
import { CSVLink } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
import * as ReportsActions from '../../redux/actions/reportsActions.js'

export const AdminEarning = ({ dispatch, adminEarningData }) => {
  var classes = useStyles()
  console.log(adminEarningData)

  useEffect(() => {
    dispatch(ReportsActions.getAdminEarnings())
  }, [])

  //* Data-Table Column
  const admin_earning_columns = [
    { name: 'S.No.', selector: (row, index) => adminEarningData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
    { name: 'Trans Id', selector: row => row?.transactionId },
    { name: 'Type', selector: row => row?.type },
    { name: 'Astrologers', selector: row => row?.astrologerDetails?.astrologerName },
    { name: 'Customers', selector: row => row?.customerDetails?.customerName },
    { name: 'Total Price', selector: row => parseFloat(row?.totalPrice).toFixed(2) },
    { name: 'Admin Share', selector: row => parseFloat(row?.adminPrice).toFixed(2) },
    { name: 'Astro Share', selector: row => parseFloat(row?.partnerPrice).toFixed(2) },
    { name: 'Duration', selector: row => secondsToHMS(row?.duration) },
    { name: 'Start Time', selector: row => row?.startTime && moment(parseInt(row?.startTime)).format('HH:mm:ss A') },
    { name: 'End time', selector: row => row?.endTime && moment(parseInt(row?.endTime)).format('HH:mm:ss A') },
    { name: 'Date', selector: row => row?.createdAt && moment(row?.createdAt).format('DD-MM-YYYY') },
  ];

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        <Grid container spacing={2}>
          {adminEarningData && tableInfo()}
        </Grid>
      </div>
    </div>
  );

  function tableInfo() {
    return (
      <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
        <DataTable
          title={<div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={classes.tableHead}>Admin Earning</div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <CSVLink
                filename={"AstroKunj.csv"}
                separator=";"
                wrapColumnChar="'"
                data={adminEarningData}
              >
                <DownloadIcon style={{ color: "black" }} />
              </CSVLink>
            </div>
          </div>}
          data={adminEarningData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
          columns={admin_earning_columns}
          pagination
          paginationComponentOptions={{ noRowsPerPage: true }}
          paginationPerPage={5}
          customStyles={dataTableCustomStyles}
        />
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  adminEarningData: state.reports.adminEarningData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AdminEarning);