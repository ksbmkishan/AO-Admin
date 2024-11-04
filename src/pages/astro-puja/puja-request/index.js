import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";
import { DeepSearchSpace, IndianRupee } from "../../../utils/common-function/index.js";
import ViewModal from "../../../components/modal/ViewModal.jsx";
import { api_urls } from "../../../utils/api-urls/index.js";
import { Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Color } from "../../../assets/colors/index.js";
import { CrossSvg } from "../../../assets/svg/index.js";
import * as AstropujaActions from '../../../redux/actions/astropujaAction';
import * as AstrologerActions from "../../../redux/actions/astrologerAction";

const PujaRequest = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerData } = useSelector(state => state?.astrologerReducer);
    const { pujaRequestData } = useSelector(state => state?.astropujaReducer);

    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(pujaRequestData, searchText);

    const [inputFieldDetail, setInputFieldDetail] = useState({ astrologer: '', price: '' });
    const [inputFieldError, setInputFieldError] = useState({ astrologer: '', price: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    };

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    const [assignAstroModal, setAssignAstroModal] = useState(false);
    const [pujaId, setPujaId] = useState('');

    const handleAssignAstroModalOpen = (id) => {
        setPujaId(id)
        setAssignAstroModal(true);
    };

    const handleAssignAstroModalClose = () => {
        setAssignAstroModal(false)
        setInputFieldDetail({ astrologer: '' });
        setInputFieldError({ astrologer: '' });
    };

    //* Handle Validation 
    const handleValidation = (e) => {
        let isValid = true;
        const { astrologer, price } = inputFieldDetail;

        if (!astrologer) {
            handleInputFieldError("astrologer", "Please Select Astrologer");
            isValid = false;
        }
        if (!price) {
            handleInputFieldError("price", "Please Enter Price");
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit : Assign Astrologer
    const handleSubmit = () => {
        if (handleValidation()) {
            console.log({ ...inputFieldDetail });

            const payload = {
                data: { id: pujaId, astrologerId: inputFieldDetail?.astrologer, price: inputFieldDetail?.price },
                onComplete: () => handleAssignAstroModalClose()
            };

            dispatch(AstropujaActions?.assignPuja(payload));
        } else {
            console.log('Validation Error !!!');
        }
    };

    //* View Modal 
    const [text, setText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (text) => {
        setModalIsOpen(true);
        setText(text);
    };
    const closeModal = () => setModalIsOpen(false);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => pujaRequestData?.indexOf(row) + 1, width: "80px" },
        { name: 'Customer', selector: row => row?.customerId?.customerName },
        { name: 'Puja Name', selector: row => row?.poojaId?.pujaName || 'N/A' },
        { name: 'Puja Price', selector: row => IndianRupee(row?.poojaId?.price) || IndianRupee(row?.poojaId?.price) },
        { name: 'Description', selector: row => row?.poojaId?.description ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.poojaId?.description)}>{row?.poojaId?.description}</div> : 'N/A' },
        { name: 'Image', cell: row => <img src={api_urls + 'uploads/' + row?.poojaId?.image} alt="Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        { name: 'Mobile', selector: row => row?.customerId?.phoneNumber },
        { name: 'Puja Date', selector: row => row?.poojaDate ? moment(row?.poojaDate).format('DD MMM YYYY') : 'N/A' },
        { name: 'Puja Time', selector: row => row?.poojaTime ? moment(row?.poojaTime).format('hh:mm:ss a') : 'N/A' },
        { name: 'Created Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMM YYYY') : 'N/A' },
        // {
        //     name: "Status",
        //     cell: (row) => (
        //         <select value={row?.status} onChange={(e) => dispatch(AstropujaActions.changePujaStatus({ id: row?._id, status: e.target.value == 'ACCEPTED' ? 'accepted' : 'rejected' }))} style={{ outline: "none", padding: "5px 8px", border: "1px solid #666666", color: "#666666", borderRadius: "5px", fontFamily: "Philosopher" }}>
        //             <option value="">---Select---</option>
        //             <option value={'ACCEPTED'}>Accepted</option>
        //             <option value={'REJECTED'}>Rejected</option>
        //         </select>
        //     ),
        //     width: "140px",
        // },
        { name: 'Assigned To', selector: row => <div style={{ cursor: "pointer" }} onClick={() => handleAssignAstroModalOpen(row?._id)}>Assign-✔</div> },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Puja Request
        dispatch(AstropujaActions.getPujaRequest());

        //! Dispatching API for Getting Astrologer
        dispatch(AstrologerActions.getAstrologer());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Puja Request'} data={pujaRequestData} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>

            <ViewModal openModal={modalIsOpen} text={text} title={'Puja Description'} handleCloseModal={closeModal} />

            <Dialog open={assignAstroModal} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '30vw' }, minWidth: { xs: '90vw', sm: '30vw' } } }}>
                <DialogContent>
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                <div>Astrologer</div>
                                <div onClick={() => handleAssignAstroModalClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Select Astrologer</InputLabel>
                                <Select
                                    style={{ backgroundColor: "#fff", minHeight: "43px", }}
                                    label="Select Astrologer" variant="outlined" fullWidth
                                    name='astrologer'
                                    value={inputFieldDetail?.astrologer}
                                    onChange={handleInputField}
                                    error={inputFieldError?.astrologer ? true : false}
                                    onFocus={() => handleInputFieldError("astrologer", null)}
                                >
                                    <MenuItem disabled>---Select Astrologer---</MenuItem>
                                    {astrologerData && astrologerData.map(value => <MenuItem key={value?._id} value={value?._id}>{value?.astrologerName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            {inputFieldError?.astrologer && <div style={{ color: "#F44C35", fontSize: "12.5px", padding: "3px 15px 0 15px" }}>{inputFieldError?.astrologer}</div>}
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <TextField
                                label={<>Price <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                                name='price'
                                value={inputFieldDetail?.price}
                                onChange={handleInputField}
                                error={inputFieldError.price ? true : false}
                                helperText={inputFieldError.price}
                                onFocus={() => handleInputFieldError("price", null)}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container sx={{ justifyContent: "space-between" }}>
                                <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </ >
    );
}

export default PujaRequest;