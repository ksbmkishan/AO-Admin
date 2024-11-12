import moment from "moment";
// import Select from 'react-select';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogContent, FormControl, Grid, InputLabel, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Color } from "../../assets/colors/index.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeepSearchSpace } from "../../utils/common-function/index.js";
import MainDatatable from "../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../components/datatable/DatatableHeading.jsx";
import { CrossSvg, DeleteSvg, EditSvg, SwitchOffSvg, SwitchOnSvg, ViewSvg, WalletSvg } from "../../assets/svg/index.js";
import * as AstrologerActions from "../../redux/actions/astrologerAction";

const Astrologer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerData } = useSelector(state => state?.astrologerReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(astrologerData, searchText);

    const [inputFieldDetail, setInputFieldDetail] = useState({ amount: '', type: '' });
    const [inputFieldError, setInputFieldError] = useState({});
    // const multiOptions = astrologerData && [{ value: 'all', label: 'Select All' }, ...astrologerData?.map(item => ({ value: item?._id, label: item?.astrologerName ? item?.astrologerName : null }))]; //! multi-Page Option
    // const [multi, setMulti] = useState([]);

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
    };

    //! Wallet Modal
    //* Handle multi Page Option 
    // const handleChangeMultiOption = (selectedItems) => {
    //     console.log("Selected Items :: ", selectedItems)
    //     if (selectedItems?.some(item => item?.value === 'all')) {
    //         setMulti(astrologerData?.map(item => item?._id));
    //     } else {
    //         const selectedIds = selectedItems && selectedItems?.map(item => item?.value !== 'all' ? item?.value : null)?.filter(Boolean);
    //         setMulti(selectedIds);
    //     }
    // };

    const [walletModal, setWalletModal] = useState(false);
    const [userId, setUserId] = useState('');

    const handleWalletModalOpen = (data) => {
        console.log("Cus Id ::: ", data)
        setUserId(data?._id)
        setWalletModal(true)
    };

    const handleWalletModalClose = () => {
        setWalletModal(false)
        setInputFieldDetail({ amount: '', type: '' });
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;

        const { amount, type } = inputFieldDetail;
        if (!amount) {
            handleInputFieldError("amount", "Please Enter Amount")
            isValid = false;
        }
        if (amount < 0) {
            handleInputFieldError("amount", "Please Enter Amount Greater Than Zero");
            isValid = false;
        }
        if (!type) {
            handleInputFieldError("type", "Please Select Type")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit : Wallet
    const handleSubmit = () => {
        if (handleValidation()) {
            console.log({ ...inputFieldDetail, userId });

            const payload = {
                data: {
                    transactions: [{ astrologerId: userId, amount: Number(inputFieldDetail?.amount) }],
                    type: inputFieldDetail?.type
                },
                onComplete: () => handleWalletModalClose()
            };

            //! Dispatching API For Deduct Astrologer Wallet
            dispatch(AstrologerActions.updateWalletByAstrologerId(payload));
        } else {
            console.log('Validation Error !!!');
        }
    };

    const [state, setState] = useState({ editModalOpen: false, selectedAstro: null });
    const { editModalOpen, selectedAstro } = state;
    const handleEdit = (rowData) => { handleStateChange({ editModalOpen: true, selectedAstro: rowData }) };
    const handleStateChange = (data) => { setState({ ...state, ...data }) };

    //* Datatable Column
    const columns = [
        { name: "S.No.", selector: (row, index) => filteredData.indexOf(row) + 1, width: "80px" },
        { name: "Name", selector: (row) => row?.astrologerName, width: "170px" },
        { name: "Email", selector: (row) => row.email, width: "200px" },
        { name: "Mobile", selector: (row) => row.phoneNumber, width: "120px" },
        // { name: "Wallet", selector: (row) => row.wallet_balance.toFixed(2), width: '100px' },
        // { name: "Experience", selector: (row) => row.experience, },
        // { name: "Chat Price", selector: (row) => row.chat_price, },
        // { name: "Call Price", selector: (row) => row.call_price, },
        { name: "Created Date", selector: (row) => moment(row.createdAt).format("Do MMM YYYY"), width: "120px", },
        { name: 'Status', selector: row => <div style={{ cursor: 'pointer' }} onClick={() => dispatch(AstrologerActions?.verifyAstrologerProfile({ isVerified: row.isVerified ? "false" : "true", astrologerId: row?._id }))}>{row?.isVerified ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "90px", center: true, },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate("/astrologer/view-astrologer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><ViewSvg /></div>
                <div onClick={() => navigate("/astrologer/edit-astrologer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                {/* <div onClick={() => dispatch(AstrologerActions.deleteAstrologerById({ astrologerId: row._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div> */}
                <div style={{ cursor: "pointer" }} onClick={() => handleWalletModalOpen(row)} ><WalletSvg /></div>
                <MoreVertIcon onClick={() => handleEdit(row)} sx={{ cursor: "pointer" }} />
            </div>,
            center: true,
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Astrologer 
        dispatch(AstrologerActions.getAstrologer());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'List Of Astrologers'} data={astrologerData} url={'/astrologer/add-astrologer'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                    {/* <div onClick={() => setWalletModal(true)} style={{ backgroundColor: Color.primary, color: Color.white, padding: "5px 15px", borderRadius: "5px", cursor: 'pointer' }}>Wallet</div> */}
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>

            {/* Wallet Modal */}
            <Dialog open={walletModal} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '50vw' }, minWidth: { xs: '90vw', sm: '50vw' } } }}>
                <DialogContent>
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                <div>Wallet</div>
                                <div onClick={() => handleWalletModalClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <TextField
                                label={<>Amount <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                                name='amount'
                                value={inputFieldDetail?.amount}
                                onChange={handleInputField}
                                error={inputFieldError.amount ? true : false}
                                helperText={inputFieldError.amount}
                                onFocus={() => handleInputFieldError("amount", null)}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Type</InputLabel>
                                <Select
                                    style={{ backgroundColor: "#fff", minHeight: "43px", }}
                                    label="Type" variant="outlined" fullWidth
                                    name='type'
                                    value={inputFieldDetail?.type}
                                    onChange={handleInputField}
                                    error={inputFieldError?.type ? true : false}
                                    onFocus={() => handleInputFieldError("type", null)}
                                >
                                    <MenuItem disabled>---Select Type---</MenuItem>
                                    <MenuItem value={'credit'}>Add</MenuItem>
                                    <MenuItem value={'deduct'}>Deduct</MenuItem>
                                </Select>
                            </FormControl>
                            {inputFieldError?.type && <div style={{ color: "#F44C35", fontSize: "12.5px", padding: "3px 15px 0 15px" }}>{inputFieldError?.type}</div>}
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container sx={{ justifyContent: "space-between" }}>
                                <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            {/* Change Status */}
            <Dialog open={editModalOpen} >
                <DialogContent sx={{ minWidth: "300px", maxWidth: "500px" }}>
                    <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "10px" }} >
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: "600" }}>{selectedAstro?.astrologerName}</Typography>
                            <div onClick={() => handleStateChange({ editModalOpen: false })} style={{ backgroundColor: "grey", color: "#fff", cursor: "pointer", padding: "2px 10px 3px 10px", borderRadius: "30px" }}>x</div>
                        </div>

                        <Grid container spacing={3} >
                            <Grid item xs={5}>Change Chat Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => dispatch(AstrologerActions.changeAstrologerChatStatus({
                                    data: { astrologerId: selectedAstro?._id, chat_status: selectedAstro?.chat_status == "online" ? "offline" : "online" },
                                    onComplete: () => handleStateChange({ editModalOpen: false })
                                }))} style={{ backgroundColor: selectedAstro?.chat_status == "online" ? "green" : "red", color: "#fff", width: '200px', textWrap: "nowrap" }}>Chat Status</Button>
                            </Grid>

                            <Grid item xs={5}>Change Call Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => dispatch(AstrologerActions.changeAstrologerCallStatus({
                                    data: { astrologerId: selectedAstro?._id, call_status: selectedAstro?.call_status == "online" ? "offline" : "online" },
                                    onComplete: () => handleStateChange({ editModalOpen: false })
                                }))} style={{ backgroundColor: selectedAstro?.call_status == "online" ? "green" : "red", color: "#fff", width: '200px', }}>Call Status</Button>
                            </Grid>

                            <Grid item xs={5}>Change Video Call Status</Grid>
                            <Grid item xs={7}>
                                <Button onClick={() => dispatch(AstrologerActions.changeAstrologerVideoCallStatus({
                                    data: { astrologerId: selectedAstro?._id },
                                    onComplete: () => handleStateChange({ editModalOpen: false })
                                }))} style={{ backgroundColor: selectedAstro?.video_call_status == "online" ? "green" : "red", color: "#fff", width: '200px', }}>Video Call Status</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>
        </>
    );
};

export default Astrologer;