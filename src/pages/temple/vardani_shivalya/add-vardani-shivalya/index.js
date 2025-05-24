import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import * as TempleActions from '../../../../redux/actions/templeAction';
import moment from "moment";
import RichTextEditor from "react-rte";

const AddVardaniShivalya = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [inputFieldDetail, setInputFieldDetail] = useState({ templeName: stateData ? stateData?.name : '', description: stateData ? RichTextEditor.createValueFromString(stateData?.description, 'html') : RichTextEditor.createEmptyValue() });
    const [inputFieldError, setInputFieldError] = useState({ templeName: '', description: '', });

    const handleInputField = (e) => setInputFieldDetail({ ...inputFieldDetail, [e?.target?.name]: e?.target?.value });  //* Handle Input Field : Data
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value })); //* Handle Input Field : Error

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { description, } = inputFieldDetail;

        if (!description) {
            handleInputFieldError("description", "Please Enter Description")
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
            data: {
                id: stateData?._id,
                description: description.toString('html'),
            },
            onComplete: () => navigate("/temple/vardani-shivalya")
        };

        console.log("Payload ::: ", payload)

        //! Dispatching API 
        if (handleValidation()) {
            if (stateData) {
                dispatch(TempleActions.updateTempleMandir(payload))
            }
        } else {
            console.log("Validation Failed!!!")
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Mandir</div>
                    <div onClick={() => navigate("/temple/live-link")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <TextField
                            label={"Temple Name"} variant='outlined' fullWidth
                            name='templeName'
                            disabled
                            value={inputFieldDetail?.templeName}
                            onChange={handleInputField}
                            error={inputFieldError.templeName ? true : false}
                            helperText={inputFieldError.templeName}
                            onFocus={() => handleInputFieldError("templeName", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Description <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.description}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, description: value })}
                            editorStyle={{ minHeight: '50vh', }}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.description && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.description}
                            </span>
                        )}
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

export default AddVardaniShivalya;