import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Color } from "../../assets/colors/index.js";
import { DeepSearchSpace, IndianRupee } from "../../utils/common-function/index.js";
import MainDatatable from "../../components/datatable/MainDatatable.jsx";
import DatatableHeading from "../../components/datatable/DatatableHeading.jsx";
import { CrossSvg, DeleteSvg, EditSvg, SwitchOffSvg, SwitchOnSvg, ViewSvg, WalletSvg } from "../../assets/svg/index.js";
import * as CustomerActions from "../../redux/actions/customerAction";

const Customer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { customerData } = useSelector(state => state?.customerReducer);
    const [searchText, setSearchText] = useState('');
    const filteredData = DeepSearchSpace(customerData, searchText);

    const [walletModal, setWalletModal] = useState(false);
    const [userId, setUserId] = useState('');

    const handleWalletModalOpen = (data) => {
        console.log("Cus Id ::: ", data)
        setUserId(data)
        setWalletModal(true)
    };

    const handleWalletModalClose = () => {
        setWalletModal(false)
        setInputFieldDetail({ amount: '', type: '' });
    };

    const [inputFieldDetail, setInputFieldDetail] = useState({ amount: '', type: '' });
    const [inputFieldError, setInputFieldError] = useState({ amount: '', type: '' });

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
                    transactions: [{ customerId: userId, amount: Number(inputFieldDetail.amount) }],
                    type: inputFieldDetail?.type
                },
                onComplete: () => {
                    setWalletModal(false)
                    handleWalletModalClose()
                }
            };

            //! Dispatching API
            dispatch(CustomerActions?.updateWalletByCustomerId(payload));
        } else {
            console.log('Validation Error !!!');
        }
    };

    //* Datatable Column
    const columns = [
        { name: "S.No.", selector: (row) => customerData.indexOf(row) + 1, width: "80px", },
        { name: "Customer Name", selector: (row) => row?.customerName ? row?.customerName : 'N/A', width: "160px" },
        { name: "Contact", selector: (row) => row?.phoneNumber, width: "120px" },
        { name: "Wallet", selector: (row) => IndianRupee(row?.wallet_balance) || 'N/A', width: '120px' },
        { name: "D.O.B", selector: (row) => row?.dateOfBirth ? moment(row?.dateOfBirth).format('DD MMM YYYY') : 'N/A', width: "120px" },
        { name: "T.O.B", selector: (row) => moment(row?.timeOfBirth).format('hh:mm:ss') != 'Invalid date' ? moment(row?.timeOfBirth).format('hh:mm A') : row?.timeOfBirth ? moment(row?.timeOfBirth, "HH:mm").format("hh:mm A") : 'N/A', width: "120px" },
        // { name: "Registration Time", selector: (row) => moment(row?.createdAt).format("DD-MM-YYYY"), width: "150px", centre: true },
        // { name: "Last Login Time", selector: (row) => moment(row?.updatedAt).format("DD-MM-YYYY"), width: "150px", centre: true },
        { name: 'Status', selector: row => <div style={{ cursor: 'pointer' }} onClick={() => dispatch(CustomerActions.changeCustomerBannedUnbannedStatus({ customerId: row?._id, customerName: row?.customerName, status: row?.banned_status }))}>{!row?.banned_status ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "120px", centre: true, },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate("/customer/view-customer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><ViewSvg /></div>
                <div onClick={() => navigate("/customer/edit-customer", { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div style={{ cursor: "pointer" }} onClick={() => handleWalletModalOpen(row?._id)} ><WalletSvg /></div>
                {/* <div onClick={() => dispatch(CustomerActions.deleteCustomerById({ customerId: row._id, customerName: row?.customerName }))} style={{ cursor: "pointer" }}><DeleteSvg /></div> */}
            </div>,
            center: true,
        },
    ];

    useEffect(function () {
        //! Dispatching API for Get Customer
        dispatch(CustomerActions.getCustomer());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <DatatableHeading title={'Customer'} data={customerData} url={'/customer/add-customer'} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
                    <input type='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search your data...' style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '250px', fontSize: '15px', outline: 'none', }} />
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
                                name='amount' type='number'
                                value={inputFieldDetail?.amount}
                                onChange={handleInputField}
                                error={inputFieldError.amount ? true : false}
                                helperText={inputFieldError.amount}
                                onFocus={() => handleInputFieldError("amount", null)}
                                inputProps={{ min: 0 }}
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
        </>
    )
};

export default Customer;