import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Color } from "../../../assets/colors";
import * as ExpertiesActions from '../../../redux/actions/expertiseAction';
import { Regex_Accept_Alpha } from "../../../utils/regex-pattern";

const AddExpertise = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const dispatch = useDispatch();

    const [expertiseDetail, setExpertiseDetail] = useState({ title: stateData ? stateData?.expertise : '' });
    const [inputFieldError, setInputFieldError] = useState({ title: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setExpertiseDetail({ ...expertiseDetail, [name]: value });
    };

    //! Handle validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = expertiseDetail;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit - Creating
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("Expertise Data :: ", { ...expertiseDetail })
            const { title } = expertiseDetail;

            if (stateData) {
                const payload = {
                    data: { expertiseId: stateData?._id, expertise: title },
                    onComplete: () => navigate("/expertise")
                }

                //! Dispatching API for Creating Expertise
                dispatch(ExpertiesActions.updateExpertise(payload))

            } else {
                const payload = {
                    data: { expertise: title },
                    onComplete: () => navigate("/expertise")
                }

                //! Dispatching API for Creating Expertise
                dispatch(ExpertiesActions.createExpertise(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Expertise</div>
                    <div onClick={() => navigate("/expertise")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={expertiseDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
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

export default AddExpertise;