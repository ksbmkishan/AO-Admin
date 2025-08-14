import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button, Avatar, Dialog, DialogContent, FormControlLabel, Checkbox } from "@mui/material";
import { img_url } from "../../../utils/api-routes";
import { UploadImageSvg } from "../../../assets/svg";
import * as BannerActions from "../../../redux/actions/bannerActions.js";
import { Color } from "../../../assets/colors/index.js";

const AddBanner = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;

    const [bannerDetail, setBannerDetail] = useState({ redirectPage: stateData ? stateData?.redirectTo : '', bannerTitle: stateData ? stateData?.title : '', redirectUrl: stateData ? stateData?.redirectionUrl : '', priorityPage: stateData ? stateData?.priorityPage : '' });
    const [inputFieldError, setInputFieldError] = useState({ redirectPage: '', bannerTitle: '', redirectUrl: '', priorityPage: '', image: '', bulkImage: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.bannerImage : '', bytes: '' });

    console.log("priotoriy page no::::::::", bannerDetail);


    //! Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //! Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setBannerDetail({ ...bannerDetail, [name]: value });
    };

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

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { bannerTitle, redirectPage, redirectUrl } = bannerDetail;
        const { file } = image;

        if (!bannerTitle) {
            handleInputFieldError("bannerTitle", "Please Enter banner Name")
            isValid = false;
        }
        if (!redirectPage) {
            handleInputFieldError("redirectPage", "Please Select Redirect Page")
            isValid = false;
        }
        if (!redirectUrl) {
            handleInputFieldError("redirectUrl", "Please Select Redirect Url")
            isValid = false;
        }

        if (!file) {
            handleInputFieldError("image", "Please Select Image")
            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit - Creating Banner
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Product Data :: ", { ...bannerDetail, image })
        const { redirectPage, bannerTitle, redirectUrl, priorityPage } = bannerDetail;

        if (handleValidation()) {
            if (stateData) {
                let formData = new FormData();
                formData.append("bannersId", stateData?._id);
                formData.append("redirectTo", redirectPage);
                formData.append("title", bannerTitle);
                formData.append("bannerFor", 'app');
                formData.append("redirectionUrl", redirectUrl);
                formData.append("priorityPage", priorityPage);
                formData.append("bannerImage", image?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/banner')
                }

                console.log(payload);
                //! Dispatching API for Updating banner
                dispatch(BannerActions.editBanners(payload))

            } else {
                let formData = new FormData();
                formData.append("redirectTo", redirectPage);
                formData.append("title", bannerTitle);
                formData.append("bannerFor", 'app');
                formData.append("redirectionUrl", redirectUrl);
                formData.append("priorityPage", priorityPage);
                formData.append("bannerImage", image?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/banner')
                }

                //! Dispatching API for Creating banner
                dispatch(BannerActions.uploadAppBanners(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: "#000" }}>Add banner</div>
                    <div onClick={() => navigate("/banner")} style={{ fontWeight: "500", backgroundColor: Color?.primary, color: "#fff", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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
                        <TextField
                            label={<> Banner Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='bannerTitle'
                            value={bannerDetail?.bannerTitle}
                            onChange={handleInputField}
                            error={inputFieldError.bannerTitle ? true : false}
                            helperText={inputFieldError.bannerTitle}
                            onFocus={() => handleInputFieldError("bannerTitle", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Redirect Page <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                label="Select Redirect Page *" variant="outlined" fullWidth
                                name='redirectPage'
                                value={bannerDetail?.redirectPage}
                                onChange={handleInputField}
                                error={inputFieldError?.redirectPage ? true : false}
                                onFocus={() => handleInputFieldError("redirectPage", null)}
                            >
                                <MenuItem disabled>---Select Redirect Page---</MenuItem>
                                <MenuItem value="customer_home">Customer Home</MenuItem>
                                <MenuItem value="Recharge-home">Recharge-home</MenuItem>
                                <MenuItem value="Recharge-prepaid">Recharge-prepaid</MenuItem>
                                <MenuItem value="Recharge-postpaid">Recharge-postpaid</MenuItem>
                                <MenuItem value="Dth">Dth</MenuItem>
                                <MenuItem value="Gas">Gas</MenuItem>
                                <MenuItem value="Electricity">Electricity</MenuItem>
                                <MenuItem value="Fastag">Fastag</MenuItem>

                            </Select>
                        </FormControl>
                        {inputFieldError?.redirectPage && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.redirectPage}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<> Redirect Url <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='redirectUrl'
                            value={bannerDetail?.redirectUrl}
                            onChange={handleInputField}
                            error={inputFieldError.redirectUrl ? true : false}
                            helperText={inputFieldError.redirectUrl}
                            onFocus={() => handleInputFieldError("redirectUrl", null)}
                        />
                    </Grid>

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label="Priority Page" 
                            variant='outlined' fullWidth
                            name='priorityPage'
                            value={bannerDetail?.priorityPage}
                            onChange={handleInputField}
                            error={inputFieldError.priorityPage ? true : false}
                            helperText={inputFieldError.priorityPage}
                            onFocus={() => handleInputFieldError("priorityPage", null)}
                        />
                        
                    </Grid> */}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Priority Page"
                            variant='outlined'
                            fullWidth
                            name='priorityPage'
                            value={bannerDetail?.priorityPage}
                            onChange={handleInputField}
                            error={Boolean(inputFieldError.priorityPage)}
                            helperText={inputFieldError.priorityPage}
                            onFocus={() => handleInputFieldError("priorityPage", null)}
                        />

                    </Grid>


                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color?.primary, color: "#fff", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        </>
    );
};

export default AddBanner;