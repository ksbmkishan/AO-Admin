import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { YYYYMMDD } from "../../../utils/common-function";
import * as RechargeActions from '../../../redux/actions/rechargeActions.js'
import { Color } from "../../../assets/colors/index.js";

const AddRecharge = ({ dispatch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;

    const [rechargeDetail, setRechargeDetail] = useState({ rechargeAmount: stateData ? stateData?.amount : '', extraPercent: stateData ? stateData?.percentage : '', startDate: stateData ? YYYYMMDD(stateData?.startDate) : '', endDate: stateData ? YYYYMMDD(stateData?.endDate) : '' });
    const [inputFieldError, setInputFieldError] = useState({ rechargeAmount: '', extraPercent: '', startDate: '', endDate: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setRechargeDetail({ ...rechargeDetail, [name]: value });
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { rechargeAmount, extraPercent, startDate, endDate } = rechargeDetail;

        if (!rechargeAmount) {
            handleInputFieldError("rechargeAmount", "Please Enter Recharge Amount")
            isValid = false;
        }

        if (rechargeAmount < 1) {
            handleInputFieldError("rechargeAmount", "Please Enter Amount Greater Than 0")
            isValid = false;
        }
        if (!extraPercent) {
            handleInputFieldError("extraPercent", "Please Enter Extra Percent")
            isValid = false;
        }
        if (!startDate) {
            handleInputFieldError("startDate", "Please Select Start Date")
            isValid = false;
        }
        if (!endDate) {
            handleInputFieldError("endDate", "Please Select End Date")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit - Creating Ecommerce Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Recharge Data :: ", { ...rechargeDetail })

        const { rechargeAmount, extraPercent, startDate, endDate } = rechargeDetail;

        if (handleValidation()) {
            if (stateData) {
                let body = { amount: rechargeAmount, percentage: extraPercent, startDate: startDate, endDate: endDate, status: "Active" }
                const payloadData = {
                    data: body,
                    onComplete: () => navigate("/recharge")
                }

                //! Dispatching API for Updating Redcharge
            } else {
                let body = { amount: rechargeAmount, percentage: extraPercent, startDate: startDate, endDate: endDate, status: "Active" }
                const payloadData = {
                    data: body,
                    onComplete: () => navigate("/recharge")
                }

                //! Dispatching API for Creating Redcharge
                dispatch(RechargeActions.createRechargePlan(payloadData))
            }
        } else {
            console.log("Validation Error")
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>Add Referral</div>
                    <div onClick={() => navigate("/referral")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Sender Referral Amount <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='rechargeAmount'
                            value={rechargeDetail?.rechargeAmount}
                            onChange={handleInputField}
                            error={inputFieldError.rechargeAmount ? true : false}
                            helperText={inputFieldError.rechargeAmount}
                            onFocus={() => handleInputFieldError("rechargeAmount", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Receiver Referral Amount <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='extraPercent'
                            value={rechargeDetail?.extraPercent}
                            onChange={handleInputField}
                            error={inputFieldError.extraPercent ? true : false}
                            helperText={inputFieldError.extraPercent}
                            onFocus={() => handleInputFieldError("extraPercent", null)}
                        />
                    </Grid>

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Start Date <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth type="date"
                            name='startDate'
                            value={rechargeDetail?.startDate}
                            onChange={handleInputField}
                            error={inputFieldError.startDate ? true : false}
                            helperText={inputFieldError.startDate}
                            onFocus={() => handleInputFieldError("startDate", null)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>End Date <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth type="date"
                            name='endDate'
                            value={rechargeDetail?.endDate}
                            onChange={handleInputField}
                            error={inputFieldError.endDate ? true : false}
                            helperText={inputFieldError.endDate}
                            onFocus={() => handleInputFieldError("endDate", null)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid> */}

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


const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AddRecharge);