import React from 'react'
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { Color } from '../../assets/colors';

const DatatableHeading = ({ title, url, data = [] }) => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>{title}</div>

                <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
                    {data.length > 0 && <CSVLink filename={`${title}`} data={data} style={{ color: "#000", fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} >
                        <div style={{ fontSize: "16px", fontWeight: "500", color: '#667284' }}>
                            <DownloadIcon />
                        </div>
                    </CSVLink>}

                    {url && <div onClick={() => navigate(url)} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "2px 5px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                        <div style={{ fontSize: "15px" }}>Add</div>
                        <div style={{ fontWeight: "bold", fontSize: "18px" }}>+</div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default DatatableHeading;