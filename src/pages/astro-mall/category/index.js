import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as AstromallActions from '../../../redux/actions/astromallAction.js';

const Category = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astromallCategoryData: categoryData } = useSelector(state => state.astromallReducer);

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => categoryData.indexOf(row) + 1 },
        { name: 'Title', selector: row => row?.categoryName },
        { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/astro-mall/category/add-category', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(AstromallActions.deleteAstromallCategory({ categoryId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(AstromallActions.getAstromallCategory())
    }, []);

    return (
        <>
            <MainDatatable data={categoryData} columns={categoryColumns} title={'Mall Category'} url={'/astro-mall/category/add-category'} />

        </ >
    );
}

export default Category;