import moment from "moment";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IndianRupee, secondsToHMS } from "../../../utils/common-function/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as ReportsActions from '../../../redux/actions/reportsActions.js';

const AdminEarning = () => {
    const dispatch = useDispatch();
    const { adminEarningData } = useSelector(state => state.reports);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => adminEarningData.indexOf(row) + 1, width: '80px' },
        // { name: 'Trans Id', selector: row => row?.transactionId },
        { name: 'Type', selector: row => <div style={{ textTransform: 'capitalize' }}>{row?.type == 'live_video_call' ? 'Live Call' : row?.type}</div> },
        { name: 'Astrologers', selector: row => row?.astrologerDetails?.astrologerName },
        { name: 'Customers', selector: row => row?.customerDetails?.customerName },
        { name: 'Total Price', selector: row => IndianRupee(row?.totalPrice) },
        { name: 'Admin Share', selector: row => IndianRupee(row?.adminPrice) },
        { name: 'Astro Share', selector: row => IndianRupee(row?.partnerPrice) },
        { name: 'Duration', selector: row => row?.duration ? secondsToHMS(row?.duration) : 'N/A' },
        // { name: 'Start Time', selector: row => row?.startTime ? moment(parseInt(row?.startTime)).format('HH:mm:ss A') : 'N/A' },
        { name: "Start Time", selector: (row) => moment(row?.startTime).format('HH:mm:ss A') != 'Invalid date' ? moment(row?.startTime).format('HH:mm:ss A') : row?.startTime ? moment(parseInt(row?.startTime)).format("HH:mm:ss A") : 'N/A' },
        { name: 'End time', selector: row => row?.endTime ? moment(parseInt(row?.endTime)).format('HH:mm:ss A') : 'N/A' },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD-MM-YYYY') : 'N/A' },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Admin Earning
        dispatch(ReportsActions.getAdminEarnings())
    }, []);

    return (
        <>
            <MainDatatable data={adminEarningData} columns={columns} title={'Admin Earning'} />

        </ >
    );
}

export default AdminEarning;