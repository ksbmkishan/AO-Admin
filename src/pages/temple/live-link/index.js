import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteSvg, EditSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";
import { DeepSearchSpace } from "../../../utils/common-function/index.js";
import * as CommonActions from "../../../redux/actions/commonAction";
import * as TempleActions from '../../../redux/actions/templeAction';

const LiveLink = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { templeLiveLinkData } = useSelector(state => state.templeReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(templeLiveLinkData, searchText);

    //* Category DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => templeLiveLinkData.indexOf(row) + 1, width: '80px' },
        { name: 'Temple Name', selector: row => row?.TempleName || 'N/A' },
        { name: 'Description', selector: row => row?.Description ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.Description }))} style={{ cursor: 'pointer' }}>{row?.Description}</div> : 'N/A' },
        { name: 'Start Time', selector: row => moment(row?.fromTimeOfArti, "HH:mm")?.format('hh:mm A') || 'N/A' },
        { name: 'End Time', selector: row => moment(row?.toTimeOfArti, "HH:mm").format("hh:mm A") || 'N/A' },
        { name: 'Link', selector: row => row?.VideoLink || 'N/A' },
        { name: 'Created Date', selector: row => moment(row?.createdAt)?.format('DD-MMM-YYYY') || 'N/A' },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate(`/temple/live-link/edit-live-link`, { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(TempleActions?.deleteTempleLiveLink({ _id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Live Link
        dispatch(TempleActions.getTempleLiveLink())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Live Link'} data={templeLiveLinkData} url={'/temple/live-link/add-live-link'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </ >
    );
}

export default LiveLink;