import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import ViewModal from "../../../components/modal/ViewModal.jsx";
import { DeepSearchSpace, IndianRupee } from "../../../utils/common-function/index.js";
import * as AstropujaActions from '../../../redux/actions/astropujaAction';
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";

const Puja = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pujaData } = useSelector(state => state.astropujaReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(pujaData, searchText);

    const [text, setText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (text) => {
        setModalIsOpen(true);
        setText(text);
    };
    const closeModal = () => setModalIsOpen(false);

    //* Category DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => pujaData.indexOf(row) + 1, width: '80px' },
        { name: 'Puja Name', selector: row => row?.pujaName ? row?.pujaName : 'N/A' },
        { name: 'Puja Price', selector: row => IndianRupee(row?.price) },
        { name: 'Description', selector: row => row?.description ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.description)}>{row.description}</div> : 'N/A' },
        { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/astro-puja/puja/add-puja', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(AstropujaActions.deletePuja({ pujaId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(AstropujaActions.getPuja())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Puja'} data={pujaData} url={'/astro-puja/puja/add-puja'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>


            <ViewModal openModal={modalIsOpen} text={text} title={'Puja Description'} handleCloseModal={closeModal} />
        </ >
    );
}

export default Puja;