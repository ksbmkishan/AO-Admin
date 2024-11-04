import React from 'react';
import { CSVLink } from 'react-csv';
import { Download } from '@mui/icons-material'

const CsvDownloader = ({ data }) => {
    return (
        <>
            <CSVLink data={data} style={{ color: "#000", fontSize: "1rem", textDecoration: "none", fontFamily: "Roboto" }} ><Download /></CSVLink>
        </>
    )
}

export default CsvDownloader