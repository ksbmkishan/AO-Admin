import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndianRupee } from "../../../utils/common-function/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as CommonActions from '../../../redux/actions/commonAction.js';
import * as HistoryActions from '../../../redux/actions/historyAction';

const MudraRequestHistory = () => {
    const dispatch = useDispatch();
    const { mudraRequestHistoryData } = useSelector(state => state?.historyReducer);



    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => mudraRequestHistoryData?.indexOf(row) + 1, width: '80px' },
        { name: 'Customers', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A', width: '200px' },
        { name: 'Amount', selector: row => row?.amount && IndianRupee(row?.amount), width: '150px' },
        { name: 'Description', selector: row => row?.description ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description }))} style={{ cursor: 'pointer' }}>{row?.description}</div> : 'N/A' },
        { name: 'Type', selector: row => row?.type && row?.type, width: '150px' },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: '200px' },
    ];

    useEffect(function () {
        //! Dispatching API
        dispatch(HistoryActions.getMudraRequestHistory());
    }, []);

    return (
        <>
            <MainDatatable data={mudraRequestHistoryData} columns={columns} title={'Divya Rashi Request History'} />

        </>
    )
};

export default MudraRequestHistory;