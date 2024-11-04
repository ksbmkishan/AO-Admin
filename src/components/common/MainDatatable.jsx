import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../../assets/images/logo.png'
import { CSVLink } from 'react-csv';
import { DownloadSvg } from '../../assets/svg';
import { Color } from '../../assets/colors';
import DownloadIcon from '@mui/icons-material/Download';
import Swal from "sweetalert2";
import { DeepSearchSpace } from '../../utils/common-function';
import { DataTableCustomStyles } from '../../assets/styles/datatable';

const MainDatatable = ({ data = [], columns, url, title = 'Title', addButonActive = true, buttonMessage = '' }) => {
    const navigate = useNavigate();
    const { isLoading } = useSelector(state => state?.dashboard)

    const [searchText, setSearchText] = useState('');
    const handleSearch = (e) => setSearchText(e.target.value);
    const filteredData = DeepSearchSpace(data, searchText);

    const onClickAdd = () => {
        if (addButonActive) {
            navigate(url);
        } else {
            Swal.fire({ icon: "error", title: "Sorry can't add more ", text: "Maximum 10 banners are allowed.", showConfirmButton: false, timer: 2000, });
        }
    }

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                {isLoading ?
                    <div style={{ color: "black", textAlign: "center", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontFamily: 'Philosopher', animation: 'rotation 2s infinite linear' }}>
                        <img src={LogoIcon} style={{ height: "100px", height: "100px" }} alt="" />
                    </div> :
                    data &&
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                            <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>{title}</div>

                            <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                                <CSVLink filename={`${title}`} data={data} style={{ color: "#000", fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} >
                                    <div style={{ fontSize: "16px", fontWeight: "500", color: '#667284' }}>
                                        <DownloadIcon />
                                    </div>
                                    <DownloadSvg />
                                </CSVLink>

                                {url && <div onClick={() => onClickAdd()} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "2px 5px", borderRadius: "5px", display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                                    <div style={{ fontSize: "15px" }}>Add</div>
                                    <div style={{ fontWeight: "bold", fontSize: "18px" }}>+</div>
                                </div>}
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
                            <input style={{
                                padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc',
                                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                                width: '100%', maxWidth: '250px', fontSize: '15px', fontFamily: 'Philosopher', outline: 'none',
                            }} type='search' value={searchText} onChange={handleSearch} placeholder='Search' />
                        </div>

                        {/* <div style={{ height: "300px", overflow: "auto" }}> */}
                        <DataTable
                            columns={columns}
                            // data={filteredData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
                            data={filteredData}
                            pagination
                            customStyles={DataTableCustomStyles}
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 25, 50, 100, 200]}
                            paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
                            fixedHeader
                        />
                        {/* </div> */}
                    </>
                }
            </div>
        </>
    )
}

export default MainDatatable;