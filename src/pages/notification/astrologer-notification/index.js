import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { img_url } from "../../../utils/api-routes";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as CommonActions from '../../../redux/actions/commonAction';
import * as NotificationActions from "../../../redux/actions/notificationActions";

const AstrologerNotification = () => {
    const dispatch = useDispatch();
    const { astrologerNotificationData } = useSelector(state => state?.notification);

    //* Datatable Column
    const astrologerColumns = [
        { name: 'S.No.', selector: row => astrologerNotificationData?.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Title', selector: row => row?.title },
        { name: 'Description', selector: row => row?.description ? <div style={{ cursor: "pointer" }} onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description }))}>{row.description}</div> : 'N/A' },
        { name: 'Icon', selector: row => <Avatar src={img_url + row.image} style={{ width: 50, height: 50 }} variant="sqaure" /> },
    ];

    useEffect(function () {
        //! Dispatching API for Get Banner 
        dispatch(NotificationActions.getAstrologerNotification());
    }, []);

    return (
        <>
            <MainDatatable data={astrologerNotificationData} columns={astrologerColumns} title={'Astrologer Notification'} url={'/astrologer-notification/add-notification'} />

        </>
    );
};

export default AstrologerNotification;