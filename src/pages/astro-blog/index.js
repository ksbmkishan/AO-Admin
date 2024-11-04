import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../utils/api-routes";
import logo from '../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { DayMonthYear } from "../../utils/common-function";
import * as AddAstroBlog from "../../redux/actions/astroBlogActions.js";
import * as CommonActions from "../../redux/actions/commonAction";

const Astroblog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blogData } = useSelector(state => state?.blogs);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => blogData.indexOf(row) + 1, width: '80px' },
        { name: 'Title', selector: row => row?.title },
        // { name: 'Category', selector: row => row?.blogCategory },
        { name: 'Description', selector: row => row?.description ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description, type: 'editor' }))} dangerouslySetInnerHTML={{ __html: row?.description?.toString().slice(0, 50) }} style={{ cursor: "pointer" }} /> : 'N/A' },
        { name: 'Created By', selector: row => row?.created_by },
        { name: 'Image', cell: row => <Avatar src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        { name: 'Date', selector: row => DayMonthYear(row?.createdAt) },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/astro-blog/edit-astro-blog', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(AddAstroBlog.deleteAstroBlog(row))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(AddAstroBlog.getAstroBlog())
    }, []);

    return (
        <>
            <MainDatatable data={blogData} columns={columns} title={'Astroblog'} url={'/astro-blog/add-astro-blog'} />

        </ >
    );
}

export default Astroblog;