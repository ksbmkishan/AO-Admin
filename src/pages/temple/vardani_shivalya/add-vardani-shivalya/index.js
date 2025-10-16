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

    const [inputFieldDetail, setInputFieldDetail] = useState({
        templeName: stateData ? stateData?.name : '',
        description_en: stateData ? RichTextEditor.createValueFromString(stateData?.description || '', 'html') : RichTextEditor.createEmptyValue(),
        description_hi: stateData ? RichTextEditor.createValueFromString(stateData?.description_hi || '', 'html') : RichTextEditor.createEmptyValue(),
    });
    const [inputFieldError, setInputFieldError] = useState({ 
        templeName: '', 
        description_en: '', 
        description_hi: '' 
    });

    const handleInputField = (e) => setInputFieldDetail({ ...inputFieldDetail, [e?.target?.name]: e?.target?.value });
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value }));

    const [currentLang, setCurrentLang] = useState('en');

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { description_en, description_hi } = inputFieldDetail;

        // Validate based on current language or both
        if (currentLang === 'en' && !description_en.getEditorState().getCurrentContent().hasText()) {
            handleInputFieldError("description_en", "Please Enter Description in English")
            isValid = false;
        } else if (currentLang === 'hi' && !description_hi.getEditorState().getCurrentContent().hasText()) {
            handleInputFieldError("description_hi", "Please Enter Description in Hindi")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Description Change based on language
    const handleDescriptionChange = (value) => {
        if (currentLang === 'en') {
            setInputFieldDetail({ ...inputFieldDetail, description_en: value });
            if (inputFieldError.description_en) {
                handleInputFieldError("description_en", null);
            }
        } else {
            setInputFieldDetail({ ...inputFieldDetail, description_hi: value });
            if (inputFieldError.description_hi) {
                handleInputFieldError("description_hi", null);
            }
        }
    };

    //! Get current description value based on language
    const getCurrentDescription = () => {
        return currentLang === 'en' ? inputFieldDetail.description_en : inputFieldDetail.description_hi;
    };

    //! Get current description error based on language
    const getCurrentDescriptionError = () => {
        return currentLang === 'en' ? inputFieldError.description_en : inputFieldError.description_hi;
    };

    //! Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Darshan Data :: ", { ...inputFieldDetail })
        const { description_en, description_hi } = inputFieldDetail;

        const payload = {
            data: {
                id: stateData?._id,
                description: description_en.toString('html'),
                description_hi: description_hi.toString('html'),
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
                        <div style={{ marginBottom: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setCurrentLang('en')}
                                style={{
                                    marginRight: '10px',
                                    backgroundColor: currentLang === 'en' ? Color.primary : '#f0f0f0',
                                    color: currentLang === 'en' ? '#fff' : '#000',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                English
                            </button>
                            <button
                                type="button"
                                onClick={() => setCurrentLang('hi')}
                                style={{
                                    backgroundColor: currentLang === 'hi' ? Color.primary : '#f0f0f0',
                                    color: currentLang === 'hi' ? '#fff' : '#000',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Hindi
                            </button>
                        </div>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Description {currentLang === 'en' ? '(English)' : '(Hindi)'} <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={getCurrentDescription()}
                            onChange={handleDescriptionChange}
                            editorStyle={{ minHeight: '50vh', }}
                            onFocus={() => handleInputFieldError(
                                currentLang === 'en' ? "description_en" : "description_hi", 
                                null
                            )}
                        />
                        {/* Display error for current language */}
                        {getCurrentDescriptionError() && (
                            <span style={{ color: "red", display: "block", marginTop: "5px" }}>
                                {getCurrentDescriptionError()}
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