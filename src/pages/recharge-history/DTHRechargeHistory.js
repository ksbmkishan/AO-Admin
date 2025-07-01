import moment from "moment";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as RechargeHistorySercvicesActions from '../../redux/actions/rechargeServicesHistoryActions.js';

const DTHRechargeHistory = () => {
    const dispatch = useDispatch();

   const {rechargeServicesHistory} = useSelector(state => state.rechargeServicesHistory);

    console.log("rechargeServicesHistory", rechargeServicesHistory);

    useEffect(() => {
        dispatch(RechargeHistorySercvicesActions.getRechargeServicesHistory());
    }, [dispatch]);

     const filteredRechargeData = (rechargeServicesHistory || []).filter(
        item => item.billType === "DTH"
    );


    const columns = [
        { name: "S.No.", selector: (row, index) => index + 1, width: '80px' },
        { name: "Order ID", selector: (row) => row.rechargeOrderId || '-', wrap: true },
        { name: "Number", selector: (row) => row.number || '-', wrap: true },
        { name: "Mobile", selector: (row) => row.mobile || '-', wrap: true },
        { name: "Total Price", selector: (row) => row.amount || 0, wrap: true },
        { name: "Date", selector: (row) => moment(row.createdAt).format("DD-MM-YYYY"), wrap: true },
        { name: "Bill Type", selector: (row) => row.billType || '-', wrap: true },
        { name: "Status", selector: (row) => row.status || '-', wrap: true },
    ];

    return (
        <MainDatatable
            data={filteredRechargeData || []}
            columns={columns}
            title={'DTH Recharge History'}
        />
    );
};

export default DTHRechargeHistory;
