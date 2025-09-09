import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { img_url } from "../../utils/api-routes";
import * as BannerActions from "../../redux/actions/bannerActions.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import { EditSvg, SwitchOffSvg, SwitchOnSvg } from "../../assets/svg/index.js";

const TeerthDham = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { appTeerthDhamData } = useSelector(state => state?.banners);

    console.log("appTeerthDhamData", appTeerthDhamData);

    //* Datatable Columns
    const columns = [
        { name: 'S.No.', selector: (row, index) => index + 1, width: '80px' },
        { name: 'Title', selector: row => row?.title, width: '180px' },
        { name: 'Image', selector: row => <Avatar src={img_url + row.bannerImage} style={{ width: 50, height: 50 }} variant="rounded" />, centre: true },
        { name: 'Status', selector: row => <div onClick={() => dispatch(BannerActions?.changeBannerStatus({ bannerId: row?._id }))} style={{ cursor: 'pointer' }}>{row?.status == 'active' ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, centre: true },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/teerthDham/add-teerthDham', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
            </div>,
            width: "100px", centre: true,
        },
    ];

    useEffect(() => {
        //! Dispatching API for Get Banner 
        dispatch(BannerActions.getAppTeerthDham());
    }, [dispatch]);

    return (
        <>
            <MainDatatable data={appTeerthDhamData} columns={columns} title={'Teerth Dham'} url={'/teerthDham/add-teerthDham'} addButtonActive={appTeerthDhamData ? appTeerthDhamData.length < 10 : true} buttonMessage="Maximum 10 banners are allowed." />
        </>
    );
};

export default TeerthDham;
