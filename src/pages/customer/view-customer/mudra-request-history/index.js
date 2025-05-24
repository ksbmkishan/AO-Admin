import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndianRupee, secondsToHMS } from "../../../../utils/common-function/index.js";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as CommonActions from '../../../../redux/actions/commonAction.js';
import * as CustomerActions from '../../../../redux/actions/customerAction.js';

const MudraRequestHistory = ({ customerId }) => {
    const dispatch = useDispatch();
    const { mudraRequestHistoryByCustomerIdData } = useSelector(state => state?.customerReducer);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => mudraRequestHistoryByCustomerIdData?.indexOf(row) + 1, width: '80px' },
        { name: 'Name', selector: row => row?.name, width: '150px' },
        { name: 'Amount', selector: row => row?.price && IndianRupee(row?.price), width: '150px' },
        { name: 'Status', selector: row => row?.status && row?.status, width: '150px' },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: '200px' },
    ];

    useEffect(function () {
        //! Dispatching API
        dispatch(CustomerActions.getMudraRequestHistoryByCustomerId({ customerId }));
    }, []);

    return (
        <>
            <MainDatatable data={mudraRequestHistoryByCustomerIdData} columns={columns} title={'Divya Rashi History'} />

        </>
    )
};

export default MudraRequestHistory;