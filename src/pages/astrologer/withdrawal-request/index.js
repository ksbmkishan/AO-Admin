import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import MainDatatable from "../../../components/datatable/MainDatatable.jsx";
import * as AstrologerActions from "../../../redux/actions/astrologerAction";
import { CrossSvg, WalletSvg } from "../../../assets/svg/index.js";
import { DeepSearchSpace, IndianRupee } from "../../../utils/common-function/index.js";
import DatatableHeading from "../../../components/datatable/DatatableHeading.jsx";
import { Color } from "../../../assets/colors/index.js";

const WithdrawalRequest = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerWithdrawalRequestData } = useSelector(state => state?.astrologerReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(astrologerWithdrawalRequestData, searchText);

    const [walletModal, setWalletModal] = useState(false);

    const handleWalletModalOpen = (data) => {
        setInputFieldDetail({ ...inputFieldDetail, amount: data?.amount, astrologerId: data?.astrologerId?._id, transactionId: data?._id });
        setWalletModal(true);
    };

    const handleWalletModalClose = () => {
        setWalletModal(false)
        setInputFieldDetail({ astrologerId: '', transactionId: '', amount: '' });
    };

    const [inputFieldDetail, setInputFieldDetail] = useState({ astrologerId: '', transactionId: '', amount: '' });
    const [inputFieldError, setInputFieldError] = useState({ astrologerId: '', transactionId: '', amount: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }));
    };

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
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
        return isValid;
    };

    //! Handle Submit : Wallet
    const handleSubmit = () => {
        if (handleValidation()) {
            console.log({ ...inputFieldDetail });
            const { astrologerId, transactionId, amount } = inputFieldDetail;

            const payload = {
                data: { astrologerId, transactionId, amount: Number(amount) },
                onComplete: () => handleWalletModalClose()
            };

            //! Dispatching API For Deduct Astrologer Wallet
            dispatch(AstrologerActions?.approveAstrologerWithdrawalRequestAmount(payload));
        } else {
            console.log('Validation Error !!!');
        }
    };

    //* Datatable Column
    const columns = [
        { name: "S.No.", selector: row => filteredData.indexOf(row) + 1, width: "80px", },
        { name: "Name", selector: (row) => row?.astrologerId?.astrologerName, },
        { name: "Email", selector: (row) => row?.astrologerId?.email, width: "250px", },
        { name: "Mobile", selector: (row) => row?.astrologerId?.phoneNumber, },
        { name: "Total Wallet", selector: (row) => IndianRupee(row?.astrologerId?.wallet_balance) },
        { name: "Req.amount", selector: (row) => IndianRupee(row?.amount) },
        { name: "Status", selector: (row) => <div style={{ textTransform: "capitalize" }}>{row?.status}</div> },
        { name: "Created Date", selector: (row) => moment(row?.createdAt).format("Do MMM YYYY"), width: "140px", },
        {
            name: "Action",
            cell: (row) => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <div style={{ cursor: "pointer" }} onClick={() => handleWalletModalOpen(row)} ><WalletSvg /></div>
                </div>
            ),
            center: true,
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Astrologer Withdrawal Request 
        dispatch(AstrologerActions.getAstrologerWithdrawalRequest());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Withdrawal Request'} data={astrologerWithdrawalRequestData} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
                </div>

                <MainDatatable columns={columns} data={filteredData} />
            </div>

            {/* Wallet Modal */}
            <Dialog open={walletModal} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '35vw' }, minWidth: { xs: '90vw', sm: '35vw' } } }}>
                <DialogContent>
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                <div>Wallet</div>
                                <div onClick={() => handleWalletModalClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            {/* <TextField
                                label={<>Amount <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                                name='amount'
                                value={inputFieldDetail?.amount}
                                onChange={handleInputField}
                                error={inputFieldError.amount ? true : false}
                                helperText={inputFieldError.amount}
                                onFocus={() => handleInputFieldError("amount", null)}
                            /> */}
                            <input name="amount" value={inputFieldDetail?.amount} readOnly onChange={handleInputField} style={{ outline: 'none', padding: "10px 20px", width: "100%", borderRadius: "5px", border: '1px solid grey', fontSize: "18px" }} />
                        </Grid>

                        {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Type</InputLabel>
                                <Select
                                    style={{ backgroundColor: "#fff", minHeight: "43px", }} disabled
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
                        </Grid> */}

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid container sx={{ justifyContent: "space-between" }}>
                                <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WithdrawalRequest;