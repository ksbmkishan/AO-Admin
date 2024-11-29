import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { base_url, img_url } from "../../utils/api-routes";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as GiftActions from "../../redux/actions/giftActions.js";

const Mudra = ({ giftData, dispatch }) => {
    const navigate = useNavigate();

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => giftData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Mudra', selector: row => row?.gift, },
        { name: 'Amount', selector: row => row.amount, },
        { name: 'Icon', selector: row => <Avatar src={base_url + row.giftIcon} style={{ width: 50, height: 50 }} variant="rounded" />, centre: true },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/mudra/edit-mudra', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(GiftActions.deleteGift({ gift_id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Gift
        dispatch(GiftActions.getGiftData())
    }, []);

    return (
        <>
            <MainDatatable data={giftData} columns={categoryColumns} title={'Mudra'} url={'/mudra/add-mudra'} />

        </ >
    );
}

const mapStateToProps = (state) => ({
    giftData: state.gift.giftData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Mudra);