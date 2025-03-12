import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as ReligiousActions from '../../../redux/actions/religiousActions.js';

const ReligiousCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { religiousCategoryData } = useSelector(state => state.religiousReducer);

    console.log("religiousCategoryData:::", religiousCategoryData);
    

    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => religiousCategoryData.indexOf(row) + 1 },
        { name: 'Title', selector: row => row?.categoryName },
        { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/religious/category/edit-category', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ReligiousActions.deleteReligiousCategory({ categoryId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(ReligiousActions.getReligiousCategory())
    }, []);

    return (
        <>
            <MainDatatable data={religiousCategoryData} columns={categoryColumns} title={'Religious Category'} url={'/religious/category/add-category'} />

        </ >
    );
}

export default ReligiousCategory;

