import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from '../../../../redux/actions/astrologerAction.js';
import moment from "moment";

const Transaction = ({ astrologerId }) => {
    const dispatch = useDispatch();
    const { transactionHistoryByAstrologerIdData } = useSelector(state => state?.astrologerReducer);

    //* Order History DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => transactionHistoryByAstrologerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Astrologer', selector: row => row?.transactions[0]?.astrologerId?.astrologerName },
        { name: 'Amount', selector: row => row?.transactions[0]?.amount },
        { name: 'Status', selector: row => <div style={{ textTransform: 'capitalize' }}>{row?.type}</div> },
        { name: 'Created Date', selector: row => moment(row?.createdAt).format('DD MMM YYYY') },
    ];

    useEffect(function () {
        //! Dispatching API for Getting Gift History
        dispatch(AstrologerActions.getTransactionHistoryByAstrologerId({ astrologerId }));
    }, []);

    return (
        <>
            <MainDatatable data={transactionHistoryByAstrologerIdData} columns={columns} title={'Transaction'} />

        </ >
    );
}

export default Transaction;