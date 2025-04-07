import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { img_url } from "../../utils/api-routes";
import logo from '../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import { DayMonthYear } from "../../utils/common-function";
import * as CommonActions from "../../redux/actions/commonAction";
import * as AstroblogActions from "../../redux/actions/astroBlogActions.js";
import moment from "moment/moment.js";

const Astroblog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blogData } = useSelector(state => state?.blogs);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => blogData.indexOf(row) + 1, width: '80px' },
        { name: 'Title', selector: row => row?.title },
        { name: 'Category', selector: row => row?.blogCategoryId?.blog_category },
        { name: 'Description', selector: row => row?.description ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description, type: 'editor' }))} dangerouslySetInnerHTML={{ __html: row?.description?.toString().slice(0, 50) }} style={{ cursor: "pointer" }} /> : 'N/A' },
        { name: 'Created By', selector: row => row?.created_by },
        { name: 'Image', cell: row => <Avatar src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />, width: '100px' },
        { name: 'Date', selector: row => moment(row?.createdAt)?.format('DD MMM YYYY'), width: '150px' },
        { name: 'View Count', selector: row => row?.viewsCount ?row?.viewsCount : 0 , width: '110px' },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/astro-blog/blog/edit-blog', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(AstroblogActions.deleteAstroBlog({ blogId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Blog
        dispatch(AstroblogActions.getAstroBlog())
    }, []);

    return (
        <>
            <MainDatatable data={blogData} columns={columns} title={'Astroblog'} url={'/astro-blog/blog/add-blog'} />

        </ >
    );
}

export default Astroblog;