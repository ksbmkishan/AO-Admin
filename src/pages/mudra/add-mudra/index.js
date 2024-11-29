import React, { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar } from "@mui/material";
import { UploadImageSvg } from "../../../assets/svg";
import { Color } from "../../../assets/colors";
import { base_url, img_url } from "../../../utils/api-routes";
import * as GiftActions from '../../../redux/actions/giftActions.js'
import { Regex_Accept_Alpha } from "../../../utils/regex-pattern";

const AddMudra = ({ dispatch, mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [giftDetail, setGiftDetail] = useState({ title: stateData ? stateData?.gift : '', amount: stateData ? stateData?.amount : '', shortBio: stateData ? stateData?.description : '' });
    const [inputFieldError, setInputFieldError] = useState({ title: '', amount: '', shortBio: '', image: '' });
    const [image, setImage] = useState({ file: stateData ? base_url + stateData?.giftIcon : '', bytes: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setGiftDetail({ ...giftDetail, [name]: value });
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

    //! Handle validation
    const handleValidation = () => {
        let isValid = true;
        const { title, amount, shortBio } = giftDetail;
        const { file } = image;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title")
            isValid = false;
        }
        if (!amount) {
            handleInputFieldError("amount", "Please Enter Amount")
            isValid = false;
        }
        if (!shortBio) {
            handleInputFieldError("shortBio", "Please Enter Short Bio")
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(shortBio)) {
            handleInputFieldError("shortBio", "Please Enter Valid Short Bio")
            isValid = false;
        }
        if (!file) {
            handleInputFieldError("image", "Please Upload Image")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("Gift Data :: ", { ...giftDetail, image })
            const { title, amount, shortBio } = giftDetail;

            if (stateData) {
                let formData = new FormData()
                formData.append("giftId", stateData?._id);
                formData.append("gift", title);
                formData.append("amount", amount);
                formData.append("description", shortBio);
                formData.append("image", image.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate("/gift")
                }

                //! Dispatching API for Creating Category
                dispatch(GiftActions.updateGift(payload))

            } else {
                let formData = new FormData()
                formData.append("gift", title);
                formData.append("amount", amount);
                formData.append("description", shortBio);
                formData.append("image", image.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate("/gift")
                }

                //! Dispatching API for Creating Category
                dispatch(GiftActions.createGift(payload))
            }

        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}> Mudra</div>
                    <div onClick={() => navigate("/mudra")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
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

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={giftDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid>

                

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Amount <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='amount' type="number"
                            value={giftDetail?.amount}
                            onChange={handleInputField}
                            error={inputFieldError.amount ? true : false}
                            helperText={inputFieldError.amount}
                            onFocus={() => handleInputFieldError("amount", null)}
                        />
                    </Grid>

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={giftDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={giftDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid> */}

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Short Bio <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='shortBio'
                            multiline
                            rows={4}
                            value={giftDetail?.shortBio}
                            onChange={handleInputField}
                            error={inputFieldError.shortBio ? true : false}
                            helperText={inputFieldError.shortBio}
                            onFocus={() => handleInputFieldError("shortBio", null)}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddMudra);