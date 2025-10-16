import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteSvg, EditSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";
import { DeepSearchSpace } from "../../../utils/common-function/index.js";
import * as CommonActions from "../../../redux/actions/commonAction";
import * as TempleActions from '../../../redux/actions/templeActions';

const Video = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { templeVideo } = useSelector(state => state.templeReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(templeVideo, searchText);

    //* Category DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => templeVideo.indexOf(row) + 1, width: '80px' },
        { name: 'Title', selector: row => row?.title || 'N/A' },
        { name: 'Created Date', selector: row => moment(row?.createdAt)?.format('DD-MMM-YYYY') || 'N/A' },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate(`/temple/video/edit-video`, { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                {/* <div onClick={() => dispatch(TempleActions?.deleteTempleVideoById({ _id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div> */}
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Live Link
        dispatch(TempleActions.getTempleVideo())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Temple Video'} data={templeVideo} url={'/temple/video/add-video'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </ >
    );
}

export default Video;