import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import { api_urls } from "../../../utils/api-urls/index.js";
import { DeleteSvg, ViewSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";
import { DeepSearchSpace } from "../../../utils/common-function/index.js";
import * as CommonActions from "../../../redux/actions/commonAction";
import * as TempleActions from '../../../redux/actions/templeAction';

const Darshan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { templeDarshanData } = useSelector(state => state.templeReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(templeDarshanData, searchText);

    //* Category DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => templeDarshanData.indexOf(row) + 1, width: '80px' },
        { name: 'Title', selector: row => row?.title || 'N/A' },
        { name: 'Image', cell: row => <img src={row?.image ? api_urls + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        { name: 'Description', selector: row => row?.description ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description }))} style={{ cursor: 'pointer' }}>{row?.description}</div> : 'N/A' },
        { name: 'Created Date', selector: row => moment(row?.createdAt)?.format('DD-MMM-YYYY') || 'N/A' },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate(`/temple/darshan/${row?._id}`)} style={{ cursor: "pointer" }}><ViewSvg /></div>
                <div onClick={() => dispatch(TempleActions?.deleteTempleDarshan({ _id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Darshan
        dispatch(TempleActions.getTempleDarshan())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Darshan'} data={templeDarshanData} url={'/temple/darshan/add-darshan'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </ >
    );
}

export default Darshan;