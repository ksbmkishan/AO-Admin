import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from '../../../../assets/images/logo.png';
import { api_urls } from "../../../../utils/api-urls/index.js";
import { DeleteSvg, EditSvg } from "../../../../assets/svg/index.js";
import MainDatatable from "../../../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../../../components/datatable/DatatableHeading.jsx";
import { DeepSearchSpace } from "../../../../utils/common-function/index.js";
import * as TempleActions from '../../../../redux/actions/templeAction';

const SubCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { templeAssetSubCategoryData } = useSelector(state => state.templeReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(templeAssetSubCategoryData, searchText);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => templeAssetSubCategoryData.indexOf(row) + 1, width: '80px' },
        { name: 'Category', selector: row => row?.category?._id || 'N/A' },
        { name: 'Title', selector: row => row?.title || 'N/A' },
        { name: 'Image', cell: row => <img src={row?.image ? api_urls + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        { name: 'Price', selector: row => row?.price || 'N/A' },
        { name: 'Created Date', selector: row => moment(row?.createdAt)?.format('DD-MMM-YYYY') || 'N/A' },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/temple/asset/sub-category/edit-sub-category', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(TempleActions?.deleteTempleAssetSubCategory({ _id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(TempleActions.getTempleAssetSubCategory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Sub Category'} data={templeAssetSubCategoryData} url={'/temple/asset/sub-category/add-sub-category'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </ >
    )
};

export default SubCategory;