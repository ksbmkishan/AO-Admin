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
        {
            name: 'Req.User', selector: row => row?.requesterId?.customerName ? <div>
                <div>{row?.requesterId?.customerName}</div>
                <div>{row?.requesterId?.phoneNumber}</div>
            </div> : 'N/A', width: '200px'
        },
        {
            name: 'Res.User', selector: row => row?.responderId?.customerName ? <div>
                <div>{row?.responderId?.customerName}</div>
                <div>{row?.responderId?.phoneNumber}</div>
            </div> : 'N/A', width: '200px'
        },
        { name: 'Amount', selector: row => row?.amount && IndianRupee(row?.amount), width: '150px' },
        { name: 'Reason', selector: row => row?.rejectionMessage ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Reason', text: row?.rejectionMessage }))} style={{ cursor: 'pointer' }}>{row?.rejectionMessage}</div> : 'N/A' },
        { name: 'Status', selector: row => row?.status && row?.status, width: '150px' },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: '200px' },
    ];

    useEffect(function () {
        //! Dispatching API
        dispatch(HistoryActions.getMudraRequestHistory());
    }, []);

    return (
        <>
            <MainDatatable data={mudraRequestHistoryData} columns={columns} title={'Mudra Request History'} />

        </>
    )
};

export default MudraRequestHistory;