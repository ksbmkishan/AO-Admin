import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Color } from "../../../../../assets/colors";
import { img_url } from "../../../../../utils/api-routes";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../../utils/regex-pattern";
import * as TempleActions from '../../../../../redux/actions/templeAction';
import { UploadImageSvg } from "../../../../../assets/svg";

const AddItems = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const assetsId = location.state && location.state.assetsId;
    const stateData = location.state && location.state.stateData;

    const dispatch = useDispatch();
    const { templeAssetsData } = useSelector(state => state.templeReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ categoryId: assetsId, title: stateData ? stateData?.title : '', price: stateData ? stateData?.price : '' });
    const [inputFieldError, setInputFieldError] = useState({ categoryId: '', title: '', price: '', image: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });

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
        const { title, price } = inputFieldDetail;
        const { file } = image;

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
        if (!price) {
            handleInputFieldError("price", "Please Enter Price")
            isValid = false;
        }
        if (price <= 0) {
            handleInputFieldError("price", "Please Enter Valid Price")
            isValid = false;
        }
        if (price > 100000) {
            handleInputFieldError("price", "Please Enter Valid Price (Max 100000)")
            isValid = false;
        }
        if (!file) {
            handleInputFieldError("image", "Please Upload Image")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Items
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Items Data :: ", { ...inputFieldDetail })
        const { title, price } = inputFieldDetail;

        let formData = new FormData();
        formData.append("items", JSON.stringify([{ itemName: title, itemPrice: price }]));
        formData.append("itemImages", image?.bytes);

        const payload = {
            assetsId, data: formData,
            onComplete: () => navigate(-1)
        }

        //! Dispatching API for Creating Items
        handleValidation() && dispatch(TempleActions.createTempleAssetsItems(payload))
    };

    useEffect(() => {
        //! Dispatching API
        dispatch(TempleActions.getTempleAssets())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Items</div>
                    <div onClick={() => navigate(-1)} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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

                    <Grid item lg={4} md={12} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Category Name<span style={{ color: "red" }}>* </span></InputLabel>
                            <Select disabled
                                label="Select Category Name * " variant="outlined" fullWidth
                                name='categoryId'
                                value={inputFieldDetail?.categoryId}
                                onChange={handleInputField}
                                error={inputFieldError?.categoryId ? true : false}
                                onFocus={() => handleInputFieldError("categoryId", null)}
                            >
                                <MenuItem disabled>---Select Category Name---</MenuItem>
                                {templeAssetsData.map((value, index) => {
                                    return <MenuItem key={index} value={value?._id}>{value?.title}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {inputFieldError?.categoryId && <div style={{ color: "#D32F2F", fontSize: "10px", padding: "3px 15px 0 15px" }}>{inputFieldError?.categoryId}</div>}
                    </Grid>

                    <Grid item lg={4} md={12} sm={12} xs={12} >
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

                    <Grid item lg={4} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Price <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='price'
                            value={inputFieldDetail?.price}
                            onChange={handleInputField}
                            error={inputFieldError.price ? true : false}
                            helperText={inputFieldError.price}
                            onFocus={() => handleInputFieldError("price", null)}
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

export default AddItems;