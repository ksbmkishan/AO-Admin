import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as ReligiousActions from '../../../redux/actions/religiousActions.js';
import ViewModal from "../../../components/modal/ViewModal.jsx";

const ReligiouSubcategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { religiousSubCategoryData } = useSelector(state => state.religiousReducer);

    console.log("religiousSubCategoryData::", religiousSubCategoryData);


    const [text, setText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (text) => {
        setModalIsOpen(true);
        setText(text);
    };
    const closeModal = () => setModalIsOpen(false);

    //* Category DataTable Columns
    const productColumns = [
        { name: 'S.No.', selector: row => religiousSubCategoryData?.indexOf(row) + 1, width: '80px' },
        { name: 'Category Name', selector: row => row?.categoryId?.categoryName },
        { name: 'Title', selector: row => row?.subCategoryName },
        { name: 'Description', selector: row => row?.description ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.description)}>{row.description}</div> : 'N/A' },
        { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/religious/sub-category/edit-sub-category', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ReligiousActions.deleteReligiouSubCategory({ subcategoryId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div>,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(ReligiousActions.getReligiousSubCategory())
    }, []);

    return (
        <>
            <MainDatatable data={religiousSubCategoryData} columns={productColumns} title={'Religious Sub-Category'} url={'/religious/sub-category/add-sub-category'} />

            <ViewModal openModal={modalIsOpen} text={text} title={'Description'} handleCloseModal={closeModal} />
        </>
    );
}



export default ReligiouSubcategory;