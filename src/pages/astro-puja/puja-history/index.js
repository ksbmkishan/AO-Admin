import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";
import { DeepSearchSpace, IndianRupee } from "../../../utils/common-function/index.js";
import ViewModal from "../../../components/modal/ViewModal.jsx";
import { api_urls } from "../../../utils/api-urls/index.js";
import * as AstropujaActions from '../../../redux/actions/astropujaAction';

const PujaHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pujaHistoryData } = useSelector(state => state?.astropujaReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(pujaHistoryData, searchText);

    const [text, setText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (text) => {
        setModalIsOpen(true);
        setText(text);
    };
    const closeModal = () => setModalIsOpen(false);

    //* Order History DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => pujaHistoryData.indexOf(row) + 1, width: "80px" },
        { name: 'Customer', selector: row => row?.customerId?.customerName },
        { name: 'Puja Name', selector: row => row?.poojaId?.pujaName || 'N/A' },
        { name: 'Puja Price', selector: row => IndianRupee(row?.poojaId?.price) || IndianRupee(row?.poojaId?.price) },
        { name: 'Description', selector: row => row?.poojaId?.description ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.poojaId?.description)}>{row?.poojaId?.description}</div> : 'N/A' },
        { name: 'Image', cell: row => <img src={api_urls + 'uploads/' + row?.poojaId?.image} alt="Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        { name: 'Astrologer', selector: row => row?.astrologerId?.astrologerName || 'N/A' },
        { name: 'Assigned Amount', selector: row => IndianRupee(row?.price) },
        { name: 'Puja Date', selector: row => row?.poojaDate ? moment(row?.poojaDate).format('DD MMM YYYY') : 'N/A' },
        { name: 'Puja Time', selector: row => row?.poojaTime ? moment(row?.poojaTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'Status', selector: row => row?.status },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Order History
        dispatch(AstropujaActions.getPujaHistory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Puja History'} data={pujaHistoryData} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>

            <ViewModal openModal={modalIsOpen} text={text} title={'Puja Description'} handleCloseModal={closeModal} />
        </ >
    );
}

export default PujaHistory;