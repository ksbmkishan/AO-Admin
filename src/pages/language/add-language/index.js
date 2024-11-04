import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Color } from "../../../assets/colors";
import * as LanguageActions from '../../../redux/actions/languageActions.js'
import { Regex_Accept_Alpha } from "../../../utils/regex-pattern";

const AddLanguage = ({ dispatch, mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;

    const [languageDetail, setLanguageDetail] = useState({ title: stateData ? stateData?.languageName : '' });
    const [inputFieldError, setInputFieldError] = useState({ title: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setLanguageDetail({ ...languageDetail, [name]: value });
    };

    //! Handle validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = languageDetail;

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

    //! Handle Submit - Creating Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("Language Data :: ", { ...languageDetail })
            const { title } = languageDetail;

            if (stateData) {
                const payload = {
                    data: { langId: stateData?._id, languageName: title },
                    onComplete: () => navigate("/language")
                }

                //! Dispatching API for Creating Remedies
                dispatch(LanguageActions.updateLanguage(payload))

            } else {
                const payload = {
                    data: { languageName: title },
                    onComplete: () => navigate("/language")
                }

                //! Dispatching API for Creating Remedies
                dispatch(LanguageActions.createLanguage(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Language</div>
                    <div onClick={() => navigate("/language")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={languageDetail?.title}
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

const mapStateToProps = (state) => ({
    // astrologerListData: state.astrologer.astrologerListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddLanguage);