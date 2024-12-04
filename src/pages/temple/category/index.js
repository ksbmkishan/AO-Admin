import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as templeActions from "../../../redux/actions/templeActions.js"
const Category = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astromallCategoryData: categoryData } = useSelector(state => state.templeReducer)

    const templeget = useSelector((state) => state.templeReducer.templeget);
console.log(templeget?.data)
    //* Category DataTable Columns
    const categoryColumns = [
        { name: 'S.No.', selector: row => templeget?.data.indexOf(row) + 1 },
        { name: 'Title', selector: row => row?.name },
        { name: 'Image', cell: row => <img src={templeget?.data?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
         {
             name: 'Action',
             cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                {/* <div onClick={() => navigate('/temple/category/add-category', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div> */}
                <div onClick={() => dispatch(templeActions.deleteTempleCategory(row._id))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
             </div >,
            width: "180px"
         },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(templeActions.getTemple())
    }, []);

    return (
        <>
            <MainDatatable data={templeget?.data} columns={categoryColumns} title={'Temple'} url={'/temple/category/add-category'} />
        </ >
    );
}

export default Category;