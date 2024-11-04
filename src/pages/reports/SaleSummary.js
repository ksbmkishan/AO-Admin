import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import moment from "moment";

import { useStyles, dataTableCustomStyles } from "../../assets/styles";
import Loader from "../../components/features/Loader.jsx";
import CsvDownloader from "../../components/features/CsvDownloader.jsx";
import { secondsToHMS } from "../../utils/common-function";
import * as ReportsActions from '../../redux/actions/reportsActions.js'

export const SaleSummary = ({ dispatch, adminEarningData }) => {
    var classes = useStyles();

    useEffect(() => {
        dispatch(ReportsActions.getAdminEarnings())
    }, [])

    //* Data-Table Column
    const sale_summary_columns = [
        { name: 'S.No.', selector: (row, index) => adminEarningData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Invoice Date', selector: row => row?.endTime && moment(row?.createdAt).format('DD-MM-YYYY') },
        { name: 'Invoice id', selector: row => row?.transactionId },
        { name: 'Txn Type Call/Chat/Report', selector: row => row?.type },
        { name: 'Duration', selector: row => secondsToHMS(row?.duration) },
        { name: 'Customer Name', selector: row => row?.customerDetails.customerName },
        { name: 'Country', selector: row => <div>India</div> },
        { name: 'Sales', selector: row => parseFloat(row?.totalPrice).toFixed(2) },
        { name: 'Discount', selector: row => <div>0</div> },
        { name: 'Sale Total', selector: row => parseFloat(row?.totalPrice).toFixed(2) },
        { name: 'IGST On Sales @18%', selector: row => parseFloat(parseFloat(row?.totalPrice) * 18 / 100).toFixed(2) },
        { name: 'Total Sales', selector: row => parseFloat(parseFloat(row?.totalPrice) + (row?.totalPrice * 18 / 100)).toFixed(2) },
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
                        <div className={classes.tableHead}>Sales Summary</div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <CsvDownloader data={adminEarningData} />
                        </div>
                    </div>}
                    data={adminEarningData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
                    columns={sale_summary_columns}
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
    adminEarningData: state.reports.adminEarningData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(SaleSummary);