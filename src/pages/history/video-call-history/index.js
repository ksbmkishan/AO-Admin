import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvoiceOne from "../download-invoice/invoice-one/index.js";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";
import { DeepSearchSpace, secondsToHMS } from "../../../utils/common-function/index.js";
import * as HistoryActions from '../../../redux/actions/historyAction';

const VideoCallHistory = () => {
    const dispatch = useDispatch();
    const { videoCallHistoryData } = useSelector(state => state?.historyReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(videoCallHistoryData, searchText);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => videoCallHistoryData.indexOf(row) + 1, width: '80px' },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName ? row?.astrologerId?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' },
        { name: 'Total Price', selector: row => row?.totalPrice && parseFloat(row?.totalPrice).toFixed(2) },
        { name: 'Admin Share', selector: row => row?.adminPrice && parseFloat(row?.adminPrice).toFixed(2) },
        { name: 'Astrologer Share', selector: row => row?.partnerPrice && parseFloat(row?.partnerPrice).toFixed(2) },
        { name: 'Duration', selector: row => row?.duration && secondsToHMS(row?.duration) },

        { name: 'Start Time', selector: row => row?.startTime ? moment(row?.startTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'End Time', selector: row => row?.endTime ? moment(Number(row?.endTime)).format('hh:mm:ss a') : 'N/A' },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: "180px" },
        { name: 'Invoice', cell: row => <InvoiceOne data={row} type={'Video-Call'} /> }
    ];

    useEffect(function () {
        //! Dispatching API for Getting Call History
        dispatch(HistoryActions.getVideoCallHistory());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Video Call History'} data={videoCallHistoryData} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </>
    );
};

export default VideoCallHistory;