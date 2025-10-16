import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Grid, TextField } from "@mui/material";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import * as TempleActions from '../../../../redux/actions/templeAction';
import moment from "moment";
import { api_urls } from "../../../../utils/api-urls";
import { UploadImageSvg } from "../../../../assets/svg";

const AddLiveLink = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [inputFieldDetail, setInputFieldDetail] = useState({ templeName: stateData ? stateData?.TempleName : '', priority: stateData ? stateData?.priority : '', videoLink: stateData ? stateData?.VideoLink : '', startTime: stateData ? moment.utc(stateData?.fromTimeOfArti).format("YYYY-MM-DD HH:mm") : '', endTime: stateData ? moment.utc(stateData?.toTimeOfArti).format("YYYY-MM-DD HH:mm") : '' });
    const [inputFieldError, setInputFieldError] = useState({ templeName: '', priority: '', videoLink: '', startTime: '', endTime: '', });
    const [image, setImage] = useState({ file: stateData ?  stateData?.image : '', bytes: '' });
    const handleInputField = (e) => setInputFieldDetail({ ...inputFieldDetail, [e?.target?.name]: e?.target?.value });  //* Handle Input Field : Data
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value })); //* Handle Input Field : Error


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


    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { templeName, priority, videoLink, startTime, endTime } = inputFieldDetail;

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
        if (!priority) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { templeName, priority, videoLink, startTime, endTime } = inputFieldDetail;
    
        if (!handleValidation()) {
            console.log("Validation Failed!!!");
            return;
        }
    
        const formData = new FormData();
        formData.append("templeName", templeName);
        formData.append("priority", priority);
        formData.append("videoLink", videoLink);
        formData.append("fromTimeOfArti", startTime);
        formData.append("toTimeOfArti", endTime);
    
        if (image && image.bytes) {
            formData.append("image", image.bytes); // File from input[type="file"]
        }
    
        // ✅ Debug: show FormData contents
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    
        const action = stateData
            ? TempleActions.updateTempleLiveLink({ _id: stateData._id, formData, onComplete: () => navigate("/temple/live-link") })
            : TempleActions.createTempleLiveLink({ formData, onComplete: () => navigate("/temple/live-link") });
    
        dispatch(action);
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

                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>priority</>} variant='outlined' fullWidth
                            name='priority'
                            value={inputFieldDetail?.priority}
                            onChange={handleInputField}
                            error={inputFieldError.priority ? true : false}
                            helperText={inputFieldError.priority}
                            onFocus={() => handleInputFieldError("priority", null)}
                        />
                    </Grid>

                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {image?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar src={image.file} style={{ height: '300px', width: "300px", borderRadius: "initial" }} />
                                </label>
                                :
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", padding: "100px 0", cursor: "pointer" }}>
                                    <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload</div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                                </label>}
                            <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                        </div>
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.image}</div>}
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