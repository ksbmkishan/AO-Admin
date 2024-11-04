import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from '../../../../redux/actions/astrologerAction.js';
import { IndianRupee } from "../../../../utils/common-function/index.js";

const GiftHistory = ({ astrologerId }) => {
    const dispatch = useDispatch();
    const { giftHistoryByAstrologerIdData } = useSelector(state => state?.astrologerReducer);

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => giftHistoryByAstrologerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName ? row?.astrologerId?.astrologerName : 'N/A' },
        { name: 'User', selector: row => row?.customerId?.customerName ? row?.customerId?.customerName : 'N/A' },
        { name: 'Total Price', selector: row => row?.totalPrice ? IndianRupee(parseFloat(row?.totalPrice).toFixed(2)) : 'N/A' },
        { name: 'Admin Share', selector: row => row?.adminPrice ? IndianRupee(parseFloat(row?.adminPrice).toFixed(2)) : 'N/A' },
        { name: 'Astro Share', selector: row => row?.partnerPrice ? IndianRupee(parseFloat(row?.partnerPrice).toFixed(2)) : 'N/A' },
    ];

    useEffect(function () {
        //! Dispatching API for Getting Gift History
        dispatch(AstrologerActions.getGiftHistoryByAstrologerId({ astrologerId }));
    }, []);

    return (
        <>
            <MainDatatable data={giftHistoryByAstrologerIdData} columns={columns} title={'Gift History'} />

        </>
    )
};

export default GiftHistory;