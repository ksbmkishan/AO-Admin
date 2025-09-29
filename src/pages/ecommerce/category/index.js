import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as EcommerceActions from '../../../redux/actions/ecommerceAction.js';

const Category = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ecommerceCategoryData: categoryData } = useSelector(state => state.ecommerceReducer);

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => categoryData.indexOf(row) + 1 },
        { name: 'Title', selector: row => row?.categoryName },
        { name: 'Image', cell: row => <img src={row?.image ? row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/ecommerce/category/add-category', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(EcommerceActions.deleteEcommerceCategory({ id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(EcommerceActions.getEcommerceCategory())
    }, []);

    return (
        <>
            <MainDatatable data={categoryData} columns={categoryColumns} title={'Ecommerce Category'} url={'/ecommerce/category/add-category'} />

        </ >
    );
}

export default Category;