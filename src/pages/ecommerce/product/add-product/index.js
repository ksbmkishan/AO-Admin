import RichTextEditor from 'react-rte';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Avatar } from "@mui/material";
import { Color } from "../../../../assets/colors";
import { YYYYMMDD } from "../../../../utils/common-function";
import { base_url, img_url } from "../../../../utils/api-routes";
import { CrossSvg, UploadImageSvg } from "../../../../assets/svg";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import * as EcommerceActions from '../../../../redux/actions/ecommerceAction';

const AddProduct = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log(stateData);
    const { ecommerceCategoryData } = useSelector(state => state.ecommerceReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ categoryId: stateData ? stateData?.category?._id : '', productName: stateData ? stateData?.name : '', price: stateData ? stateData?.price : '', commission: stateData ? stateData?.adminCommissionPercentage : '' });
    const [inputFieldError, setInputFieldError] = useState({ categoryId: '', productName: '', description: '', price: '', image: '', bulkImage: '' });
    const [image, setImage] = useState({ file: stateData ? base_url + stateData?.image : '', bytes: '' });
    const [bulkImage, setBulkImage] = useState(stateData ? stateData?.bannerImage?.map(value => { return { file: base_url + value, bytes: '' } }) : []); //* Mutliple File 
    const [description, setDescription] = useState(stateData ? RichTextEditor.createValueFromString(stateData?.description, 'html') : RichTextEditor.createEmptyValue());

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value }))

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
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

    // Handle Image :  //! Bulk Image
    const handleBulkImage = (e) => {
        // console.log("Bulk Image length :: ", bulkImage?.length + 1)
        if (bulkImage.length + 1 <= 5) {
            setBulkImage([...bulkImage, {
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            }]);
        } else {
            alert('You have cross your limit bugger')
        }
    }

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { categoryId, productName, price } = inputFieldDetail;

        const { file } = image;
        if (!categoryId) {
            handleInputFieldError("categoryId", "Please Select Category Name")
            isValid = false;
        }
        if (!productName) {
            handleInputFieldError("productName", "Please Enter Product Name")
            isValid = false;
        }
        if (!Regex_Accept_Alpha_Dot_Comma_Space.test(productName)) {
            handleInputFieldError("productName", "Please Enter Valid Product Name")
            isValid = false;
        }
        if (productName.toString().length > 70) {
            handleInputFieldError("productName", "Please Enter Product Name Less Than 70 Letter")
            isValid = false;
        }
        if (!price) {
            handleInputFieldError("price", "Please Enter price")
            isValid = false;
        }
        if (description?.toString('html') === "<p><br></p>") {
            handleInputFieldError("description", "Please Enter Description");
            isValid = false;
        }
        if (!file) {
            handleInputFieldError("image", "Please Select Image")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Ecommerce Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        const bulkImageArray = bulkImage?.map((value) => value?.bytes);

        const { categoryId, productName, price, commission } = inputFieldDetail;

        if (handleValidation()) {
            if (stateData) {
                let formData = new FormData();
                formData.append("category", categoryId);
                formData.append("name", productName);
                formData.append("description", description.toString('html'));
                formData.append("price", price);
                formData.append("adminCommissionPercentage", commission);

                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImage`, value)
                ))
                const payload = {
                    data: formData,
                    id: stateData?._id,
                    onComplete: () => navigate('/ecommerce/product')
                }

                //! Dispatching API for Updating Products
                dispatch(EcommerceActions.updateEcommerceProduct(payload))

            } else {
                let formData = new FormData();
                formData.append("category", categoryId);
                formData.append("name", productName);
                formData.append("description", description.toString('html'));
                formData.append("price", price);
                formData.append("adminCommissionPercentage", commission);

                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImage`, value)
                ))

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/ecommerce/product')
                }

                //! Dispatching API for Creating Products
                dispatch(EcommerceActions.createEcommerceProduct(payload))
            }
        } else {
            console.log("Validation Error !!!")
        }
    };

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(EcommerceActions.getEcommerceCategory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Ecommerce Product</div>
                    <div onClick={() => navigate("/ecommerce/product")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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
                                value={inputFieldDetail?.categoryId}
                                onChange={handleInputField}
                                error={inputFieldError?.categoryId ? true : false}
                                onFocus={() => handleInputFieldError("categoryId", null)}
                            >
                                <MenuItem disabled>---Select Category Name---</MenuItem>
                                {ecommerceCategoryData.map((value, index) => {
                                    return <MenuItem key={index} value={value?._id}>{value?.categoryName}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {inputFieldError?.categoryId && <div style={{ color: "#D32F2F", fontSize: "10px", padding: "3px 15px 0 15px" }}>{inputFieldError?.categoryId}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Product Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='productName'
                            value={inputFieldDetail?.productName}
                            onChange={handleInputField}
                            error={inputFieldError.productName ? true : false}
                            helperText={inputFieldError.productName}
                            onFocus={() => handleInputFieldError("productName", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Price <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='price' type="number"
                            value={inputFieldDetail?.price}
                            onChange={handleInputField}
                            error={inputFieldError.price ? true : false}
                            helperText={inputFieldError.price}
                            onFocus={() => handleInputFieldError("price", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    {inputFieldDetail?.categoryId == "67de7a2dc85bfe89e5cfc012" && <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Commission <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='commission' type="number"
                            value={inputFieldDetail?.commission}
                            onChange={handleInputField}
                            error={inputFieldError.commission ? true : false}
                            helperText={inputFieldError.commission}
                            onFocus={() => handleInputFieldError("commission", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>}

                    {/* <Grid item lg={12} md={12} sm={12} xs={12} >
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <label style={{ color: "#000", marginBottom: "#000", fontSize: "14.5px", color: "grey" }}>Description <span style={{ color: "red" }}>*</span></label>
                            <textarea
                                name='description'
                                value={inputFieldDetail?.description}
                                onChange={handleInputField}
                                placeholder="Description"
                                rows={8}
                                onFocus={() => handleInputFieldError("description", null)}
                                style={{ minWidth: "100%", maxWidth: "100%", minHeight: "50px", padding: "10px", outline: "none", border: `1px solid ${inputFieldError?.description ? 'red' : '#C4C4C4'}`, borderRadius: "3.5px", fontFamily: "Philosopher" }}
                            />
                        </div>
                        {inputFieldError?.description && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.description}</div>}
                    </Grid> */}

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <RichTextEditor
                            value={description}
                            onChange={setDescription}
                            editorStyle={{ minHeight: '50vh' }}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
                        {inputFieldError.description && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "400" }}>{inputFieldError.description}</div>}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkImage.length > 0 && bulkImage?.map((value, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <Avatar src={value.file} style={{ height: '150px', width: "250px", borderRadius: "initial" }} />
                                    <div onClick={() => setBulkImage(bulkImage.filter((curr, currIndex) => currIndex !== index))} style={{ position: "absolute", top: '-13px', right: '-15px', cursor: "pointer" }}><CrossSvg /></div>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "13px", color: "gray" }}>Upload More Images(Max File Count : 5)</div>
                        <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-bulk-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        <input id="upload-bulk-image" multiple type="file" onChange={handleBulkImage} hidden />
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

export default AddProduct;