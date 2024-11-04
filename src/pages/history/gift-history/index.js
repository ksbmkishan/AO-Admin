import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeepSearchSpace } from "../../../utils/common-function/index.js";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import * as HistoryActions from '../../../redux/actions/historyAction';
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";

const GiftHistory = () => {
    const dispatch = useDispatch();
    const { giftHistoryData } = useSelector(state => state?.historyReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(giftHistoryData, searchText);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => giftHistoryData.indexOf(row) + 1, width: '80px' },
        { name: 'User', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName ? row?.astrologerId?.astrologerName : 'N/A' },
        { name: 'Total Price', selector: row => parseFloat(row?.totalPrice).toFixed(2) },
        { name: 'Admin Share', selector: row => parseFloat(row?.adminPrice).toFixed(2) },
        { name: 'Astro Share', selector: row => parseFloat(row?.partnerPrice).toFixed(2) },
    ];

    useEffect(function () {
        //! Dispatching API for Getting Gift History
        dispatch(HistoryActions.getGiftHistory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Gift History'} data={giftHistoryData} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </>
    )
};

export default GiftHistory;