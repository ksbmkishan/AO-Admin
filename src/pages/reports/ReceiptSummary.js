import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import moment from "moment";

import { useStyles, dataTableCustomStyles } from "../../assets/styles";
import Loader from "../../components/features/Loader.jsx";
import CsvDownloader from "../../components/features/CsvDownloader.jsx";
import * as ReportsActions from '../../redux/actions/reportsActions.js'

export const ReceiptSummary = ({ dispatch, reciptSummaryData }) => {
  const classes = useStyles();

  useEffect(() => {
    dispatch(ReportsActions.getRecieptSummary())
  }, [])

  //* Data-Table Column
  const receipt_summary_columns = [
    { name: 'S.No.', selector: (row, index) => reciptSummaryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
    { name: 'Txn Date', selector: row => moment(row?.createdAt).format('DD-MM-YYYY') },
    { name: 'Txn Id', selector: row => row?.invoiceId },
    { name: 'Reciept No', selector: row => row?.recieptNumber },
    { name: 'Customer Name', selector: row => row?.customer?.customerName },
    { name: 'Recharge Value', selector: row => row?.amount },
    { name: 'Gift/Coupon%', selector: row => row?.offer },
    { name: 'Sub Total', selector: row => row?.totalAmount },
    { name: 'Tax @18%', selector: row => parseFloat(row?.amount * 18 / 100).toFixed(2) },
    { name: 'Total Record', selector: row => parseFloat(row?.amount + (row?.amount * 18 / 100)).toFixed(2) },
  ];

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        <Grid container spacing={2}>
          {reciptSummaryData && receiptTableInfo()}
        </Grid>
      </div>
    </div>
  );

  function receiptTableInfo() {
    return (
      <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
        <DataTable
          title={<div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={classes.tableHead}>Recipt Summary</div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <CsvDownloader data={reciptSummaryData} />
            </div>
          </div>}
          data={reciptSummaryData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
          columns={receipt_summary_columns}
          pagination
          paginationComponentOptions={{ noRowsPerPage: true }}
          paginationPerPage={5}
          customStyles={dataTableCustomStyles}
        />
      </Grid>
    )
  }
};

const mapStateToProps = state => ({
  reciptSummaryData: state.reports.reciptSummaryData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptSummary); 