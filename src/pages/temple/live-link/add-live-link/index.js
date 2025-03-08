import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import * as TempleActions from '../../../../redux/actions/templeAction';
import moment from "moment";

const AddLiveLink = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [inputFieldDetail, setInputFieldDetail] = useState({ templeName: stateData ? stateData?.TempleName : '', description: stateData ? stateData?.Description : '', videoLink: stateData ? stateData?.VideoLink : '', startTime: stateData ? moment.utc(stateData?.fromTimeOfArti).format("YYYY-MM-DD HH:mm") : '', endTime: stateData ? moment.utc(stateData?.toTimeOfArti).format("YYYY-MM-DD HH:mm") : '' });
    const [inputFieldError, setInputFieldError] = useState({ templeName: '', description: '', videoLink: '', startTime: '', endTime: '', });

    const handleInputField = (e) => setInputFieldDetail({ ...inputFieldDetail, [e?.target?.name]: e?.target?.value });  //* Handle Input Field : Data
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value })); //* Handle Input Field : Error

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { templeName, description, videoLink, startTime, endTime } = inputFieldDetail;

        if (!templeName) {
            handleInputFieldError("templeName", "Please Enter Temple Name")
            isValid = false;
        }
        if (!Regex_Accept_Alpha_Dot_Comma_Space.test(templeName)) {
            handleInputFieldError("title", "Please Enter Valid Temple Name")
            isValid = false;
        }
        if (templeName.toString().length > 70) {
            handleInputFieldError("templeName", "Please Enter Temple Name Less Than 70 Letter")
            isValid = false;
        }
        if (!description) {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }
        if (!videoLink) {
            handleInputFieldError("videoLink", "Please Enter Video Link")
            isValid = false;
        }
        if (!startTime) {
            handleInputFieldError("startTime", "Please Enter Start Time")
            isValid = false;
        }
        if (!endTime) {
            handleInputFieldError("endTime", "Please Enter End Time")
            isValid = false;
        }

        if (startTime >= endTime) {
            handleInputFieldError("startTime", "Start Time should be less than or equal to End Time")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Darshan Data :: ", { ...inputFieldDetail })
        const { templeName, description, videoLink, startTime, endTime } = inputFieldDetail;

        const payload = {
            _id: stateData?._id,
            data: { templeName, description, videoLink, fromTimeOfArti: startTime, toTimeOfArti: endTime },
            onComplete: () => navigate("/temple/live-link")
        };

        //! Dispatching API 
        if (handleValidation()) {
            if (stateData) {
                dispatch(TempleActions.updateTempleLiveLink(payload))
            } else {
                dispatch(TempleActions.createTempleLiveLink(payload))
            }
        } else {
            console.log("Validation Failed!!!")
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Live Link</div>
                    <div onClick={() => navigate("/temple/live-link")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Temple Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='templeName'
                            value={inputFieldDetail?.templeName}
                            onChange={handleInputField}
                            error={inputFieldError.templeName ? true : false}
                            helperText={inputFieldError.templeName}
                            onFocus={() => handleInputFieldError("templeName", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Video Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='videoLink'
                            value={inputFieldDetail?.videoLink}
                            onChange={handleInputField}
                            error={inputFieldError.videoLink ? true : false}
                            helperText={inputFieldError.videoLink}
                            onFocus={() => handleInputFieldError("videoLink", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Start Time <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='startTime' type="datetime-local"
                            value={inputFieldDetail?.startTime}
                            onChange={handleInputField}
                            error={inputFieldError.startTime ? true : false}
                            helperText={inputFieldError.startTime}
                            onFocus={() => handleInputFieldError("startTime", null)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>End Time <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='endTime' type="datetime-local"
                            value={inputFieldDetail?.endTime}
                            onChange={handleInputField}
                            error={inputFieldError.endTime ? true : false}
                            helperText={inputFieldError.endTime}
                            onFocus={() => handleInputFieldError("endTime", null)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Description <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='description'
                            value={inputFieldDetail?.description}
                            onChange={handleInputField}
                            error={inputFieldError.description ? true : false}
                            helperText={inputFieldError.description}
                            onFocus={() => handleInputFieldError("description", null)}
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
    )
};

export default AddLiveLink;