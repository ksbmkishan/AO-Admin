import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as PagesActions from "../../redux/actions/pagesActions";
import * as CommonActions from "../../redux/actions/commonAction";

const Announcement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { announcementData } = useSelector(state => state?.pages);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => announcementData.indexOf(row) + 1, width: '80px' },
        { name: 'Description', selector: row => row?.description ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description, type: 'editor' }))} dangerouslySetInnerHTML={{ __html: row?.description?.toString().slice(0, 150) }} style={{ cursor: "pointer" }} /> : 'N/A' },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/announcement/edit-announcement', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(PagesActions.deleteAnnouncement(row._id))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "150px", centre: true
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Announcement
        dispatch(PagesActions.getAllAnouncement())
    }, []);

    return (
        <>
            <MainDatatable data={announcementData} columns={columns} title={'Announcement'} url={'/announcement/add-announcement'} />

        </ >
    );
}

export default Announcement;