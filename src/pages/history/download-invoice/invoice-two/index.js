import React from 'react';
import { usePDF } from '@react-pdf/renderer';
import Document from './invoice-pdf/InvoicePdf';
import DownloadIcon from '@mui/icons-material/Download';

const InvoiceTwo = ({ data, type }) => {
    const [instance, updateInstance] = usePDF({ document: (<Document data={data} type={type} />) });

    //* if (instance?.loading) return <div>Loading ...</div>;
    //* if (instance?.error) return <div>Something went wrong: {instance?.error}</div>;

    return (
        <a href={instance.url} download={data?.customerDetails?.customerName + ` ${type} Invoice`} style={{ textDecoration: 'none', color: "black", textAlign: 'center' }}>
            <DownloadIcon />
        </a>
    )
}

export default InvoiceTwo;