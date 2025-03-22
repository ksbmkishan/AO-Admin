import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button, Avatar, Dialog, DialogContent, FormControlLabel, Checkbox } from "@mui/material";
import { api_url, base_url, img_url } from "../../../../utils/api-routes";
import { CrossSvg, UploadImageSvg } from "../../../../assets/svg";
import * as ReligiousActions from '../../../../redux/actions/religiousActions';
import { HideDateFromCurrent, YYYYMMDD } from "../../../../utils/common-function";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";

const AddReligiousSubCategory = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const { religiousCategoryData } = useSelector(state => state.religiousReducer);

    console.log("stateData::", stateData?.categoryId);


    const [productDetail, setProductDetail] = useState({ categoryId: stateData ? stateData?.categoryId?._id : '', subCategoryName: stateData ? stateData?.subCategoryName : '', description: stateData ? stateData?.description : '', link: stateData ? stateData?.link : '', purchasePrice: stateData ? stateData?.purchasePrice : '', refundDay: stateData ? stateData?.refundRequetDay : '', inventory: stateData ? stateData?.inventory : '', manufactureDate: stateData ? YYYYMMDD(stateData?.manufactureDate) : '', expiryDate: stateData ? YYYYMMDD(stateData?.expiryDate) : '' });
    const [inputFieldError, setInputFieldError] = useState({ categoryId: '', subCategoryId: '', subCategoryName: '', description: '', link: '', purchasePrice: '', refundDay: '', inventory: '', manufactureDate: '', expiryDate: '', image: '', bulkImage: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });
    // const [bulkImage, setBulkImage] = useState([]); //* Mutliple File 


    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setProductDetail({ ...productDetail, [name]: value });
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
        const { categoryId, subCategoryName, link, manufactureDate, expiryDate, description } = productDetail;
        const { file } = image;
        console.log({ manufactureDate, expiryDate })
        if (!categoryId) {
            handleInputFieldError("categoryId", "Please Select Category Name")
            isValid = false;
        }
        if (!subCategoryName) {
            handleInputFieldError("subCategoryName", "Please Enter Product Name")
            isValid = false;
        }
        if (!Regex_Accept_Alpha_Dot_Comma_Space.test(subCategoryName)) {
            handleInputFieldError("subCategoryName", "Please Enter Valid Product Name")
            isValid = false;
        }
        if (subCategoryName.toString().length > 70) {
            handleInputFieldError("subCategoryName", "Please Enter Product Name Less Than 70 Letter")
            isValid = false;
        }
        if (!link) {
            handleInputFieldError("link", "Please Enter Link")
            isValid = false;
        }

        if (!description) {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }
        // if (description?.length > 2000) {
        //     handleInputFieldError("description", "Description Should be Less Than 2000")
        //     isValid = false;
        // }
        if (!file) {
            handleInputFieldError("image", "Please Select Image")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Ecommerce Product
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { categoryId, subCategoryName, description, link, } = productDetail;

        console.log("Product Data :: ", { subCategoryId: stateData?._id, categoryId, subCategoryName, description, link, image })
        if (handleValidation()) {
            if (stateData) {
                let formData = new FormData();
                formData.append("subCategoryId", stateData?._id);
                formData.append("categoryId", categoryId);
                formData.append("subCategoryName", subCategoryName);
                formData.append("description", description);
                formData.append("link", link);

                formData.append("image", image?.bytes);

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/religious/sub-category')
                }

                //! Dispatching API for Updating Products
                dispatch(ReligiousActions.updateReligiousSubCategory(payload))

            } else {
                let formData = new FormData();
                formData.append("categoryId", categoryId);
                formData.append("subCategoryName", subCategoryName);
                formData.append("description", description);
                formData.append("link", link);
                formData.append("image", image?.bytes);


                const payload = {
                    data: formData,
                    onComplete: () => navigate('/religious/sub-category')
                }

                //! Dispatching API for Creating Products
                dispatch(ReligiousActions.createReligiousSubCategory(payload))
            }
        } else {
            console.log("Validation Error !!!")
        }
    };

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(ReligiousActions.getReligiousCategory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Sub Category</div>
                    <div onClick={() => navigate("/religious/sub-category")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload <span style={{ color: "red" }}>*</span></div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                                </label>}
                            <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                        </div>
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.image}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Category Name<span style={{ color: "red" }}>* </span></InputLabel>
                            <Select
                                label="Select Category Name * " variant="outlined" fullWidth
                                name='categoryId'
                                value={productDetail?.categoryId}
                                onChange={handleInputField}
                                error={inputFieldError?.categoryId ? true : false}
                                onFocus={() => handleInputFieldError("categoryId", null)}
                            >
                                <MenuItem disabled>---Select Category Name---</MenuItem>
                                {religiousCategoryData?.map((value, index) => {
                                    return <MenuItem key={index} value={value?._id}>{value?.categoryName}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {inputFieldError?.categoryId && <div style={{ color: "#D32F2F", fontSize: "10px", padding: "3px 15px 0 15px" }}>{inputFieldError?.categoryId}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Sub Category Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='subCategoryName'
                            value={productDetail?.subCategoryName}
                            onChange={handleInputField}
                            error={inputFieldError.subCategoryName ? true : false}
                            helperText={inputFieldError.subCategoryName}
                            onFocus={() => handleInputFieldError("subCategoryName", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='link'
                            value={productDetail?.link}
                            onChange={handleInputField}
                            error={inputFieldError.link ? true : false}
                            helperText={inputFieldError.link}
                            onFocus={() => handleInputFieldError("lin", null)}
                        />
                    </Grid>




                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Inventory</>} variant='outlined' fullWidth
                            name='inventory' type="number"
                            value={productDetail?.inventory}
                            onChange={handleInputField}
                            error={inputFieldError.inventory ? true : false}
                            helperText={inputFieldError.inventory}
                            onFocus={() => handleInputFieldError("inventory", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid> */}

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Manufacture Date</>} variant='outlined' fullWidth type="date"
                            name='manufactureDate'
                            value={productDetail?.manufactureDate}
                            onChange={handleInputField}
                            error={inputFieldError.manufactureDate ? true : false}
                            helperText={inputFieldError.manufactureDate}
                            onFocus={() => handleInputFieldError("manufactureDate", null)}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ max: HideDateFromCurrent(0) }}
                        />
                    </Grid> */}

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Expiry Date</>} variant='outlined' fullWidth type="date"
                            name='expiryDate'
                            value={productDetail?.expiryDate}
                            onChange={handleInputField}
                            error={inputFieldError.expiryDate ? true : false}
                            helperText={inputFieldError.expiryDate}
                            onFocus={() => handleInputFieldError("expiryDate", null)}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: HideDateFromCurrent(0) }}
                        />
                    </Grid> */}

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <label style={{ color: "#000", marginBottom: "#000", fontSize: "14.5px", color: "grey" }}>Description <span style={{ color: "red" }}>*</span></label>
                            <textarea
                                name='description'
                                value={productDetail?.description}
                                onChange={handleInputField}
                                placeholder="Description"
                                rows={8}
                                onFocus={() => handleInputFieldError("description", null)}
                                style={{ minWidth: "100%", maxWidth: "100%", minHeight: "50px", padding: "10px", outline: "none", border: `1px solid ${inputFieldError?.description ? 'red' : '#C4C4C4'}`, borderRadius: "3.5px", fontFamily: "Philosopher" }}
                            />
                        </div>
                        {inputFieldError?.description && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.description}</div>}
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

export default AddReligiousSubCategory;