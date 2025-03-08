import { CSVLink } from "react-csv";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { DeleteSvg, EditSvg } from "../../../../assets/svg/index.js";
import DownloadIcon from '@mui/icons-material/Download';
import { Color } from "../../../../assets/colors/index.js";
import { api_urls } from "../../../../utils/api-urls/index.js";
import MainDatatable from "../../../../components/datatable/MainDatatable.jsx";
import { DeepSearchSpace } from "../../../../utils/common-function/index.js";
import * as TempleActions from '../../../../redux/actions/templeAction.js';

const Items = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const assetsId = location?.state?.assetsId;
    const dispatch = useDispatch();

    const { templeAssetsItemsByAssetsIdData } = useSelector(state => state?.templeReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(templeAssetsItemsByAssetsIdData, searchText);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => templeAssetsItemsByAssetsIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Title', selector: row => row?.itemName || 'N/A' },
        { name: 'Price', selector: row => row?.itemPrice || 'N/A' },
        { name: 'Image', selector: row => <Avatar src={api_urls + row?.itemImage} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => dispatch(TempleActions?.deleteTempleAssetsItems({ assetsId, itemId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
                <div onClick={() => navigate(`/temple/assets/items/add-items`, { state: { assetsId, stateData: row,update: `update` } })} style={{ cursor: "pointer" }}><EditSvg /></div>
            </div >,
        },
    ];

    useEffect(() => {
        //! Dispatch API 
        dispatch(TempleActions?.getTempleAssetsItemsByAssetsId({ assetsId }));
    }, [assetsId]);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>Items</div>

                    <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
                        {templeAssetsItemsByAssetsIdData?.length > 0 && <CSVLink filename={`Items`} data={templeAssetsItemsByAssetsIdData} style={{ color: "#000", fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} >
                            <div style={{ fontSize: "16px", fontWeight: "500", color: '#667284' }}>
                                <DownloadIcon />
                            </div>
                        </CSVLink>}

                        <div onClick={() => navigate('/temple/assets/items/add-items', { state: { assetsId } })} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "2px 5px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                            <div style={{ fontSize: "15px" }}>Add</div>
                            <div style={{ fontWeight: "bold", fontSize: "18px" }}>+</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>
        </ >
    )
};

export default Items;