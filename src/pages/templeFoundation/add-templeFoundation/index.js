import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button, Avatar, Dialog, DialogContent, FormControlLabel, Checkbox } from "@mui/material";
import { base_url, img_url } from "../../../utils/api-routes";
import { UploadImageSvg } from "../../../assets/svg";
import { Color } from "../../../assets/colors";
import { Regex_Accept_Alpha, Regex_Accept_Number } from "../../../utils/regex-pattern";
import * as TempleFoundationActions from '../../../redux/actions/templeActions';

const AddTempleFoundation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;

    const [testimonialDetail, setTestimonialDetail] = useState({ name: stateData ? stateData?.name : '' });
    const [inputFieldError, setInputFieldError] = useState({ name: '', images: '' });
    const [images, setImages] = useState({ file: stateData ? base_url + stateData?.image : '', bytes: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setTestimonialDetail({ ...testimonialDetail, [name]: value });
    };

    //! Handle Image : Normally
    const handleImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImages({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }

        handleInputFieldError("images", null)
    };

    //! Handle Image : Drop Feature
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImages({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
        }

        handleInputFieldError("images", null)
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { name, rating, description } = testimonialDetail;
        const { file } = images;

        if (!name) {
            handleInputFieldError("name", "Please Select Name")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(name)) {
            handleInputFieldError("name", "Please Enter Valid Name")
            isValid = false;
        }

        if (!file) {
            handleInputFieldError("images", "Please Select Image")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit - Creating Testimonial
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            console.log("Testimonial Data :: ", { ...testimonialDetail, images });
            const { name } = testimonialDetail;

            if (stateData) {
                let formData = new FormData();
                formData.append("id", stateData?._id);
                formData.append("name", name);
                formData.append("images", images?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/templeFoundation')
                }

                //! Dispatching API for Updating Testimonial
                dispatch(TempleFoundationActions.updateTempleFoundation(payload));

            } else {
                let formData = new FormData();
                formData.append("name", name);
                formData.append("images", images?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/templeFoundation')
                }

                //! Dispatching API for Creating Testimonial
                dispatch(TempleFoundationActions.createTempleFoundation(payload));
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>Add Temple Foundation</div>
                    <div onClick={() => navigate("/templeFoundation")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {images?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar src={images.file} style={{ height: '300px', minWidth: "50%", borderRadius: "initial" }} />
                                </label>
                                :
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", padding: "100px 0", cursor: "pointer" }}>
                                    <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload</div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                                </label>}
                            <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                        </div>
                        {inputFieldError?.images && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.images}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='name'
                            value={testimonialDetail?.name}
                            onChange={handleInputField}
                            error={inputFieldError.name ? true : false}
                            helperText={inputFieldError.name}
                            onFocus={() => handleInputFieldError("name", null)}
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

export default AddTempleFoundation;
