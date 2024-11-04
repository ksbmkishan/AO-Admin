import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Chat } from "@mui/icons-material";
import InvoiceTwo from "../download-invoice/invoice-two";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";
import { DeepSearchSpace, secondsToHMS } from "../../../utils/common-function/index.js";
import * as HistoryActions from '../../../redux/actions/historyAction';

const ChatHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { chatHistoryData } = useSelector(state => state?.historyReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(chatHistoryData, searchText);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => chatHistoryData.indexOf(row) + 1, width: '80px' },
        { name: 'Astrologer', selector: row => row?.astrologerDetails?.astrologerName ? row?.astrologerDetails?.astrologerName : 'N/A' },
        { name: 'Customers', selector: row => row?.customerDetails?.customerName ? row?.customerDetails?.customerName : 'N/A' },
        { name: 'Total Price', selector: row => parseFloat(row?.totalChatPrice).toFixed(2) || 'N/A' },
        { name: 'Duration', selector: row => row?.durationInSeconds ? secondsToHMS(row?.durationInSeconds) : 'N/A' },

        { name: 'Start Time', selector: row => row?.startTime ? moment(row?.startTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'End Time', selector: row => row?.endTime ? moment(row?.endTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A', width: "180px" },

        { name: 'Status', selector: row => row?.status },
        { name: 'Chat', cell: row => <Chat sx={{ cursor: "pointer" }} onClick={() => navigate(`/history/chat-history/chat-summary/${row?.astrologerDetails?.astrologerName?.split(' ')[0].toLowerCase()}-${row?.customerDetails?.customerName?.split(' ')[0].toLowerCase()}`, { state: { astroID: row?.astrologerId, customerID: row?.customerId } })} /> },
        { name: 'Invoice', cell: row => <InvoiceTwo data={row} type={'Chat'} /> }
    ];

    useEffect(function () {
        //! Dispatching API for Getting Chat History
        dispatch(HistoryActions.getChatHistory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Chat History'} data={chatHistoryData} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </>
    )
};

export default ChatHistory;