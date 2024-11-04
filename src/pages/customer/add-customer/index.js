import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar } from "@mui/material";
import { Color } from "../../../assets/colors/index.js";
import { UploadImageSvg } from "../../../assets/svg/index.js";
import { img_url } from "../../../utils/api-routes";
import { YYYYMMDD } from "../../../utils/common-function";
import * as customerActions from '../../../redux/actions/customerAction';

const AddCustomer = ({ mode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location?.state?.stateData;
    console.log("State Data :: ", stateData);

    const [customerDetail, setCustomerDetail] = useState({ customerName: stateData ? stateData?.customerName : '', phoneNumber: stateData ? stateData?.phoneNumber : '', gender: stateData ? stateData?.gender : '', wallet: stateData ? stateData?.wallet_balance : '', dateOfBirth: stateData ? YYYYMMDD(stateData?.dateOfBirth) : '', timeOfBirth: stateData ? stateData?.timeOfBirth : '' });
    const [inputFieldError, setInputFieldError] = useState({});
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });

    //! Handle Image : Normally
    const handleImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }

        handleInputFieldError("image", null)
    };

    //! Handle Image : Drop Feature
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
        }

        handleInputFieldError("image", null)
    };

    //* Handle Input Field : inputFieldError
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setCustomerDetail({ ...customerDetail, [name]: value });
    };

    //! Snack-Bar Logic Start 
    const [openSnack, setOpenSnack] = useState(false);
    const [messageSnack, setMessageSnack] = useState("");

    const handleClickOpenSnack = (msg) => {
        setOpenSnack(true)
        setMessageSnack(msg)
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const basicPattern = /^[a-zA-Z\s]{1,56}$/;   // Accept Only Alphabet and Space
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const contactPattern = /^[0-9]{10}$/;
        const { customerName, phoneNumber, gender, wallet, dateOfBirth, timeOfBirth } = customerDetail;

        // if (!image?.file) {
        //     handleInputFieldError('image', 'Please Upload Profile Image');
        //     isValid = false;
        //     handleClickOpenSnack("Please Upload Profile Image");
        //     return isValid;
        // }

        if (!customerName) {
            handleInputFieldError('customerName', 'Please Enter Customer Name');
            isValid = false;
            handleClickOpenSnack("Please Enter Customer Name");
            return isValid;
        }

        if (customerName?.toString().length > 30) {
            handleInputFieldError('customerName', 'Please Enter Name Less Than 30 Digit');
            isValid = false;
            handleClickOpenSnack("Please Enter Name Less Than 30 Digit");
            return isValid;
        }

        if (!basicPattern.test(customerName)) {
            handleInputFieldError('customerName', 'Please Enter Valid Customer Name');
            isValid = false;
            handleClickOpenSnack("Please Enter Valid Customer Name");
            return isValid;
        }

        if (!phoneNumber) {
            handleInputFieldError('phoneNumber', 'Please Enter Phone Number');
            isValid = false;
            handleClickOpenSnack("Please Enter Phone Number");
            return isValid;
        }

        // if (wallet?.toString().length > 6) {
        //     handleInputFieldError('wallet', 'Please Enter Wallet Less Than 6 Digit');
        //     isValid = false;
        //     handleClickOpenSnack("Please Enter Wallet Less Than 6 Digit");
        //     return isValid;
        // }

        if (!contactPattern.test(phoneNumber)) {
            handleInputFieldError('phoneNumber', 'Please Enter Valid Phone Number');
            isValid = false;
            handleClickOpenSnack("Please Enter Valid Phone Number");
            return isValid;
        }

        if (!gender) {
            handleInputFieldError('gender', 'Please Enter Gender');
            isValid = false;
            handleClickOpenSnack("Please Enter Gender");
            return isValid;
        }

        if (!dateOfBirth) {
            handleInputFieldError('dateOfBirth', 'Please Enter Date Of Birth');
            isValid = false;
            handleClickOpenSnack("Please Enter Date Of Birth");
            return isValid;
        }

        if (!timeOfBirth) {
            handleInputFieldError('timeOfBirth', 'Please Enter Time Of Birth');
            isValid = false;
            handleClickOpenSnack("Please Enter Time Of Birth");
            return isValid;
        }

        return isValid;
    };

    //! Handle Submit
    const handleSubmit = async () => {
        console.log({ ...customerDetail, image });
        const { customerName, phoneNumber, gender, wallet, dateOfBirth, timeOfBirth } = customerDetail

        if (handleValidation()) {
            if (stateData) {
                let formData = new FormData();
                formData.append("customerId", stateData?._id);
                formData.append("customerName", customerName);
                formData.append("phoneNumber", phoneNumber);
                formData.append("gender", gender);
                formData.append("wallet", wallet);
                formData.append("dateOfBirth", dateOfBirth);
                formData.append("timeOfBirth", timeOfBirth);
                formData.append("image", image.bytes);

                const payloadData = {
                    data: formData,
                    onComplete: () => navigate("/customer")
                }

                //! Dispatching API for Updating Customer
                dispatch(customerActions.updateCustomerById(payloadData))
            } else {
                let formData = new FormData();
                formData.append("customerName", customerName);
                formData.append("phoneNumber", phoneNumber);
                formData.append("gender", gender);
                formData.append("wallet", wallet);
                formData.append("dateOfBirth", dateOfBirth);
                formData.append("timeOfBirth", timeOfBirth);
                formData.append("image", image.bytes);

                const payloadData = {
                    data: formData,
                    onComplete: () => navigate("/customer")
                }

                //! Dispatching API for Creating Customer
                dispatch(customerActions.createCustomer(payloadData))
            }
        }
    };

    return (
        <>
            <Snackbar open={openSnack} autoHideDuration={2000} onClose={() => setOpenSnack(false)} message={messageSnack} anchorOrigin={{ vertical: "top", horizontal: "right" }} />

            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>{mode === 'Edit' ? 'Edit Customer' : 'Add Customer'}</div>
                    <div onClick={() => navigate("/customer")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {image?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar src={image.file} style={{ height: '300px', minWidth: "50%", borderRadius: "initial" }} />
                                </label>
                                :
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", padding: "100px 0", cursor: "pointer" }}>
                                    <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload</div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                                </label>}
                            <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                        </div>
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.image}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField label={<> Enter Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='customerName'
                            value={customerDetail?.customerName}
                            onChange={handleInputField}
                            error={inputFieldError.customerName ? true : false}
                            helperText={inputFieldError.customerName}
                            onFocus={() => handleInputFieldError("customerName", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField label={<> Enter Phone <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='phoneNumber'
                            value={customerDetail?.phoneNumber}
                            onChange={handleInputField}
                            error={inputFieldError.phoneNumber ? true : false}
                            helperText={inputFieldError.phoneNumber}
                            onFocus={() => handleInputFieldError("phoneNumber", null)}
                        />
                    </Grid>

                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Enter Gender <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select label='Enter Gender *' variant='outlined' fullWidth
                                name='gender'
                                value={customerDetail?.gender}
                                onChange={handleInputField}
                                error={inputFieldError.gender ? true : false}
                                onFocus={() => handleInputFieldError("gender", null)}
                            >
                                <MenuItem disabled value={""}>Select Gender</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            {inputFieldError?.gender && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.gender}</div>}
                        </FormControl>
                    </Grid>

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField label="Enter Wallet" variant='outlined' fullWidth
                            name='wallet'
                            type="number"
                            value={customerDetail?.wallet}
                            onChange={handleInputField}
                            error={inputFieldError.wallet ? true : false}
                            helperText={inputFieldError.wallet}
                            onFocus={() => handleInputFieldError("wallet", null)}
                        />
                    </Grid> */}

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            variant='outlined' label={<> Date of Birth <span style={{ color: "red" }}>*</span></>} fullWidth type="date"
                            name='dateOfBirth'
                            value={customerDetail?.dateOfBirth}
                            onChange={handleInputField}
                            error={inputFieldError.dateOfBirth ? true : false}
                            helperText={inputFieldError.dateOfBirth}
                            onFocus={() => handleInputFieldError("dateOfBirth", null)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            variant='outlined' label={<> Time of Birth <span style={{ color: "red" }}>*</span></>} fullWidth type="time"
                            name='timeOfBirth'
                            value={customerDetail?.timeOfBirth}
                            onChange={handleInputField}
                            error={inputFieldError.timeOfBirth ? true : false}
                            helperText={inputFieldError.timeOfBirth}
                            onFocus={() => handleInputFieldError("timeOfBirth", null)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        </>
    );
};

export default AddCustomer;