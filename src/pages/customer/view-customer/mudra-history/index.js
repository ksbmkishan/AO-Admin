import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndianRupee, secondsToHMS } from "../../../../utils/common-function/index.js";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as CommonActions from '../../../../redux/actions/commonAction';
import * as CustomerActions from '../../../../redux/actions/customerAction';

const MudraHistory = ({ customerId }) => {
    const dispatch = useDispatch();
    const { mudraHistoryByCustomerIdData } = useSelector(state => state?.customerReducer);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => mudraHistoryByCustomerIdData?.indexOf(row) + 1, width: '80px' },
        { name: 'Customers', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A', width: '200px' },
        { name: 'Amount', selector: row => row?.amount && IndianRupee(row?.amount), width: '150px' },
        { name: 'Description', selector: row => row?.description ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description }))} style={{ cursor: 'pointer' }}>{row?.description}</div> : 'N/A' },
        { name: 'Type', selector: row => row?.type && row?.type, width: '150px' },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: '200px' },
    ];

    useEffect(function () {
        //! Dispatching API
        dispatch(CustomerActions.getMudraHistoryByCustomerId({ customerId }));
    }, []);

    return (
        <>
            <MainDatatable data={mudraHistoryByCustomerIdData} columns={columns} title={'Divya Rashi Request History'} />

        </>
    )
};

export default MudraHistory;