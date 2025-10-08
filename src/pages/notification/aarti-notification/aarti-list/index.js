import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as NotifciationAction from '../../../../redux/actions/notificationActions.js';
import { DeleteSvg, EditSvg } from "../../../../assets/svg/index.js";
import { base_url, img_url } from "../../../../utils/api-routes/index.js";
import { useNavigate } from "react-router-dom";

const AartiList = () => {
    const dispatch = useDispatch();
     const navigate = useNavigate();
    const { aartiNotification } = useSelector(state => state.notification);

    console.log(aartiNotification[0]?.audio)

    //* Datatable Columns
    const columns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
            width: '80px'
        },
        {
            name: "Title",
            selector: (row) => row?.title || "-"
        },
        {
            name: "Time",
            selector: (row) => row?.time || "-"
        },
        {
            name: "Audio",
            selector: (row) => row?.audio ? (
                <audio controls style={{ width: "120px" }}>
                    <source src={img_url + 'audio/' + row.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            ) : "-",
            width: "140px"
        },
        {
            name: 'Action',
            cell: (row) => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    {/* <div
                        onClick={() => dispatch(NotifciationAction.deleteAartiNotification({ id: row._id }))}
                        style={{ cursor: "pointer" }}
                    >
                        <DeleteSvg />
                    </div> */}

                    <div
                        onClick={() => navigate('/admin/AddAarti-Notification', { state: { stateData: row } })}
                        style={{ cursor: "pointer" }}
                    >
                        <EditSvg />
                    </div>
                </div>
            ),
            center: true
        }
    ];

    useEffect(() => {
        dispatch(NotifciationAction.getAartiNotifications());
    }, [dispatch]);

    return (
        <MainDatatable
            data={aartiNotification}
            columns={columns}
            title={'Aarti List'}
            url={'/admin/AddAarti-Notification'}
        />
    );
};

export default AartiList;
