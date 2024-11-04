import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../../assets/images/logo.png'
import { CSVLink } from 'react-csv';
import { DownloadSvg } from '../../assets/svg';
import { Color } from '../../assets/colors';
import DownloadIcon from '@mui/icons-material/Download';

const MainTableNoAdd = ({ data = [], columns, url, title = 'Title' }) => {
    const navigate = useNavigate();
    const { isLoading } = useSelector(state => state?.dashboard)

    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const deepSearch = (data, searchText) => {
        const searchLower = searchText.toLowerCase();

        const deepSearchObject = (obj) => {
            if (typeof obj === 'object' && obj !== null) {
                return Object.values(obj).some(value => deepSearchObject(value));
            }
            if (Array.isArray(obj)) {
                return obj.some(value => deepSearchObject(value));
            }
            if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
                return obj.toString().toLowerCase().includes(searchLower);
            }
            return false;
        };

        return data && data.filter(item => deepSearchObject(item));
    };

    const filteredData = deepSearch(data, searchText);

    // let filteredData = data && data.filter(item =>
    //     Object.values(item).some(value =>
    //         value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    //     )
    // );

    //* DataTable Styles
    const DataTableCustomStyles = {
        cells: {
            style: {
                textAlign: "center",
                color: Color.datatableFontColor, whiteSpace: "nowrap",
                fontFamily: 'Philosopher',
                width: "150px",
                fontSize: "15px"
            },
        },
        rows: {
            style: {
                minHeight: '65px',
                backgroundColor: "#fff",
                fontFamily: 'Philosopher'
            },
        },
        headRow: {
            style: {
                whiteSpace: 'nowrap',
                fontSize: "15.5px",
                fontWeight: "500", color: Color.white,
                backgroundColor: Color.primary,
                fontFamily: 'Philosopher'
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                {isLoading ?
                    <div style={{ color: "black", textAlign: "center", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontFamily: 'Philosopher', animation: 'rotation 2s infinite linear' }}>
                        <img src={LogoIcon} style={{ height: "100px", height: "100px" }} alt="" />
                    </div> :
                    data &&
                    <>
                        {/* <div style={{ height: "300px", overflow: "auto" }}> */}
                        <DataTable
                            columns={columns}
                            // data={filteredData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
                            data={filteredData}
                            pagination
                            customStyles={DataTableCustomStyles}
                            paginationPerPage={5}
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

export default MainTableNoAdd;