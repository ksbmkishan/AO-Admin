import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Color } from "../../../../../assets/colors";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../../utils/regex-pattern";
import * as TempleActions from '../../../../../redux/actions/templeAction';

const AddCategory = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    // console.log("State Data ::: ", stateData);

    const [inputFieldDetail, setInputFieldDetail] = useState({ title: stateData ? stateData?.title : '' });
    const [inputFieldError, setInputFieldError] = useState({ title: '' });

    const handleInputField = (e) => setInputFieldDetail({ ...inputFieldDetail, [e?.target?.name]: e?.target?.value });  //* Handle Input Field : Data
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value })); //* Handle Input Field : Error

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = inputFieldDetail;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title")
            isValid = false;
        }
        if (!Regex_Accept_Alpha_Dot_Comma_Space.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title")
            isValid = false;
        }
        if (title.toString().length > 70) {
            handleInputFieldError("title", "Please Enter Title Less Than 70 Letter")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Darshan
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Darshan Data :: ", { ...inputFieldDetail })
        const { title } = inputFieldDetail;

        if (handleValidation()) {

            if (stateData) {
                const payload = {
                    data: {},
                    onComplete: () => navigate("/temple/asset/category")
                }

                //! Dispatching API for Updating Category
                dispatch(TempleActions.updateTempleAssetCategory(payload))

            } else {
                const payload = {
                    data: { title },
                    onComplete: () => navigate("/temple/asset/category")
                }

                //! Dispatching API for Creating Category
                dispatch(TempleActions.createTempleAssetCategory(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Category</div>
                    <div onClick={() => navigate("/temple/asset/category")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={inputFieldDetail?.title}
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
    )
};

export default AddCategory;