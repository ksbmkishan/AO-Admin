import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as AstroblogActions from '../../../redux/actions/astroBlogActions.js';
import moment from "moment/moment.js";

const Category = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astroblogCategoryData } = useSelector(state => state.blogs);

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => astroblogCategoryData.indexOf(row) + 1, width: '80px' },
        { name: 'Title', selector: row => row?.blog_category },
        { name: 'Created Date', selector: row => moment(row?.createdAt)?.format('DD MMM YYYY @ hh:mm a') },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/astro-blog/category/add-category', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(AstroblogActions.deleteAstroblogCategory({ categoryId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(AstroblogActions.getAstroblogCategory());
    }, []);

    return (
        <>
            <MainDatatable data={astroblogCategoryData} columns={categoryColumns} title={'Blog Category'} url={'/astro-blog/category/add-category'} />

        </ >
    );
}

export default Category;