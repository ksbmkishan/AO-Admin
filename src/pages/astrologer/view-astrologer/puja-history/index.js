import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../../../assets/svg/index.js";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as EcommerceActions from '../../../../redux/actions/ecommerceAction.js';
import { DayMonthYear } from "../../../../utils/common-function";

const PujaHistory = ({ astrologerId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ecommerceProductData: pujaHistoryData } = useSelector(state => state.ecommerceReducer);

    //* Order History DataTable Columns
    const pujaHistoryColumns = [
        { name: 'S.No.', selector: row => pujaHistoryData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Puja', selector: row => 'Laxmi Pooja' },
        { name: 'Astrologer', selector: row => 'Astro' },
        { name: 'Date', selector: row => row?.expiryDate ? DayMonthYear(row?.expiryDate) : 'N/A' },
        { name: 'Time', selector: row => '5:30 am' },
        { name: 'Price', selector: row => '1000' },
        { name: 'Status', selector: row => 'Completed' },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center", paddingRight: "15px" }} >
                <div onClick={() => dispatch(EcommerceActions.deleteEcommerceProduct({ productId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            right: true
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Order History
        dispatch(EcommerceActions.getEcommerceProduct())
    }, []);

    return (
        <>
            <MainDatatable data={pujaHistoryData} columns={pujaHistoryColumns} title={'Puja History'} />

        </ >
    );
}

export default PujaHistory;