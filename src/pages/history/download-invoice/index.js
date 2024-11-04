import React from 'react';
import { usePDF, Document, Page } from '@react-pdf/renderer';
import MyDocument from '../../../components/features/Invoice';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadInvoice = ({ row, name }) => {
    // console.log("Download Invoice Data ::: ", row);

    const [instance, updateInstance] = usePDF({ document: (<MyDocument data={row} name={name} />) });

    // if (instance?.loading) return <div>Loading ...</div>;
    // if (instance?.error) return <div>Something went wrong: {instance?.error}</div>;

    return (
        <a href={instance.url} download={row?.customerDetails?.customerName + ` ${name} Invoice`} style={{ textDecoration: 'none', color: "black" }}>
            <DownloadIcon />
        </a>
    )
}

export default DownloadInvoice;