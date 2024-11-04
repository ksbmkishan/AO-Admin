import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { img_url } from "../../../utils/api-routes";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as CommonActions from '../../../redux/actions/commonAction';
import * as NotificationActions from "../../../redux/actions/notificationActions";

const CustomerNotification = () => {
    const dispatch = useDispatch();
    const { customerNotificationData } = useSelector(state => state?.notification);

    //* Datatable Column
    const columns = [
        { name: 'S.No.', selector: row => customerNotificationData?.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Title', selector: row => row?.title },
        { name: 'Description', selector: row => row?.description ? <div style={{ cursor: "pointer" }} onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description }))}>{row.description}</div> : 'N/A' },
        { name: 'Icon', selector: row => <Avatar src={img_url + row.image} style={{ width: 50, height: 50 }} variant="sqaure" /> },
    ];

    useEffect(function () {
        //! Dispatching API for Get Banner 
        dispatch(NotificationActions.getCustomerNotification());
    }, []);

    return (
        <>
            <MainDatatable data={customerNotificationData} columns={columns} title={'Customer Notification'} url={'/customer-notification/add-notification'} />

        </>
    );
};

export default CustomerNotification;