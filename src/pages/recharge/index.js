import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api_url, base_url, img_url } from "../../utils/api-routes";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import { DayMonthYear, OnlyTime } from "../../utils/common-function";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import * as RechargeActions from '../../redux/actions/rechargeActions.js';
import { Colors } from "../../assets/styles";
import moment from "moment";
import { DeleteSvg, SwitchOffSvg, SwitchOnSvg } from "../../assets/svg/index.js";

const Recharge = ({ dispatch, rechargePlanData }) => {
    const navigate = useNavigate();

    //* Datatable Column
    const astrologerColumns = [
        { name: "S.No.", selector: (row, index) => rechargePlanData.indexOf(row) + 1, width: '80px' },
        { name: "Amount", selector: (row) => row?.amount },
        { name: "Extra P.Amount", selector: (row) => row?.percentage + '%' },
        { name: "Start Date", selector: (row) => row?.startDate && moment(row?.startDate).format("DD-MM-YYYY"), },
        { name: "End Date", selector: (row) => row?.endDate && moment(row?.endDate).format("DD-MM-YYYY"), },
        { name: 'Status', selector: row => <div onClick={() => dispatch(RechargeActions.updateRechargePlanStatus({ status: row?.recharge_status == "Active" ? "Inactive" : "Active", rechargePlanId: row?._id }))} style={{ cursor: 'pointer' }}>{row?.recharge_status == "Active" ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "120px", centre: true },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => dispatch(RechargeActions.deleteRechargePlan({ rechargePlanId: row._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div>,
            width: "150px", centre: true,
        },
    ];

    useEffect(() => {

        dispatch(RechargeActions.getRechargePlan())
    }, []);

    return (
        <>
            <MainDatatable data={rechargePlanData} columns={astrologerColumns} title={'Recharge'} url={'/recharge/add-recharge'} />

        </>
    );
};

const mapStateToProps = (state) => ({
    rechargePlanData: state.recharge.rechargePlanData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Recharge);