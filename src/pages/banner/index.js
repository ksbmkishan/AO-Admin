import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { img_url } from "../../utils/api-routes";
import * as BannerActions from "../../redux/actions/bannerActions.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import { EditSvg, SwitchOffSvg, SwitchOnSvg } from "../../assets/svg/index.js";

const Banner = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { appBannerData } = useSelector(state => state?.banners);

    //* Datatable Columns
    const columns = [
        { name: 'S.No.', selector: (row, index) => index + 1, width: '80px' },
        { name: 'Title', selector: row => row?.title, width: '180px' },
        { name: 'Redirect Page', selector: row => row?.redirectTo, width: '170px' },
        { name: 'Redirect Url', selector: row => row?.redirectionUrl?.slice(0, 50) + '...', width: '280px' },
        { name: 'Banner', selector: row => <Avatar src={img_url + row.bannerImage} style={{ width: 50, height: 50 }} variant="rounded" />, centre: true },
        { name: 'Status', selector: row => <div onClick={() => dispatch(BannerActions?.changeBannerStatus({ bannerId: row?._id }))} style={{ cursor: 'pointer' }}>{row?.status == 'active' ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, centre: true },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/banner/add-banner', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                {/* <div onClick={() => dispatch(BannerActions.deleteBanners(row))} style={{ cursor: "pointer" }}><DeleteSvg /></div> */}
            </div>,
            width: "100px", centre: true,
        },
    ];

    useEffect(() => {
        //! Dispatching API for Get Banner 
        dispatch(BannerActions.getAppBanners());
    }, [dispatch]);

    return (
        <>
            <MainDatatable data={appBannerData} columns={columns} title={'Banner'} url={'/banner/add-banner'} addButtonActive={appBannerData ? appBannerData.length < 10 : true} buttonMessage="Maximum 10 banners are allowed." />
        </>
    );
};

export default Banner;
