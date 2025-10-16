import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from "axios";
import { CSVLink } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';

import { DeleteSvg, EditSvg } from "../../../../assets/svg";
import { Color } from "../../../../assets/colors";
import { DeepSearchSpace } from "../../../../utils/common-function";
import MainDatatable from "../../../../components/datatable/MainDatatable";

const Items = () => {
    const navigate = useNavigate();
    const [vrPoojaItems, setVrPoojaItems] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Fetch VR Pooja items
    const fetchItems = async () => {
        try {
            const res = await axios.get("https://api.astroone.in/api/admin/get_vr_items");
            if (res?.data?.success) {
                setVrPoojaItems(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch VR Pooja items", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Handle delete item
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            const response = await axios.delete(`https://api.astroone.in/api/admin/delete_vr_item/${id}`);
            if (response.data.success) {
                alert("Item deleted successfully.");
                fetchItems(); // Refresh list
            } else {
                alert("Failed to delete item: " + response.data.message);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong while deleting the item.");
        }
    };

    const filteredData = DeepSearchSpace(vrPoojaItems, searchText);

    // Table columns
    const columns = [
        { name: 'S.No.', selector: (row, index) => index + 1, width: '80px' },
        { name: 'Title', selector: row => row?.itemName || 'N/A' },
        { name: 'Price', selector: row => row?.itemPrice || 'N/A' },
        { name: 'Duration (sec)', selector: row => row?.duration || '0' },
        { name: 'Payment Type', selector: row => row?.payment || 'N/A' },
        {
            name: 'Image',
            selector: row => <Avatar src={`${row?.itemImage}`} />,
        },
        {
            name: 'Audio',
            selector: row => row?.audio ? (
                <audio controls style={{ height: "30px" }}>
                    <source src={`https://api.astroone.in/${row.audio}`} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            ) : 'N/A',
        },
        {
            name: 'Action',
            cell: row => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <div style={{ cursor: "pointer" }} onClick={() => handleDelete(row._id)}>
                        <DeleteSvg />
                    </div>
                    <div
                        onClick={() =>
                            navigate(`/temple/vr_assets/items/add-items`, {
                                state: { stateData: row, update: 'update' },
                            })
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <EditSvg />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div style={{
            padding: "20px",
            backgroundColor: "#fff",
            marginBottom: "20px",
            boxShadow: '0px 0px 5px lightgrey',
            borderRadius: "10px"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>VR Pooja Items</div>

                <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
                    {vrPoojaItems?.length > 0 && (
                        <CSVLink
                            filename="VR_Pooja_Items"
                            data={vrPoojaItems}
                            style={{
                                color: "#000", fontSize: "1rem",
                                textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer"
                            }}
                        >
                            <DownloadIcon />
                        </CSVLink>
                    )}

                    <div
                        onClick={() => navigate('/temple/vr_assets/items/add-items')}
                        style={{
                            fontWeight: "500",
                            backgroundColor: Color.primary,
                            color: Color.white,
                            padding: "6px 12px",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            cursor: "pointer",
                        }}
                    >
                        <div style={{ fontSize: "15px" }}>Add</div>
                        <div style={{ fontWeight: "bold", fontSize: "18px" }}>+</div>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", marginBottom: "20px" }}>
                <input
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search your data..."
                    style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '100%',
                        maxWidth: '250px',
                        fontSize: '15px',
                        outline: 'none',
                    }}
                />
            </div>

            <MainDatatable columns={columns} data={filteredData} />
        </div>
    );
};

export default Items;
