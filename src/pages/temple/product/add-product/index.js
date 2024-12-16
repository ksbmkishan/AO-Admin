import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button, Avatar, Dialog, DialogContent, FormControlLabel, Checkbox } from "@mui/material";
import { api_url, base_url, img_url } from "../../../../utils/api-routes";
import { CrossSvg, UploadImageSvg } from "../../../../assets/svg";
import * as AstromallActions from '../../../../redux/actions/astromallAction';
import { HideDateFromCurrent, YYYYMMDD } from "../../../../utils/common-function";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddProduct = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const { astromallCategoryData } = useSelector(state => state.astromallReducer);
    const templeget = useSelector((state) => state.templeReducer.templeget);
    console.log("humko:::::>>>>",templeget?.data)

    const [productDetail, setProductDetail] = useState({ categoryId: stateData ? stateData?.categoryId : '', productName: stateData ? stateData?.productName : '', description: stateData ? stateData?.description : '', mrp: stateData ? stateData?.mrp : '', offerPrice: stateData ? stateData?.price : '', purchasePrice: stateData ? stateData?.purchasePrice : '', refundDay: stateData ? stateData?.refundRequetDay : '', stockQuantity: stateData ? stateData?.quantity : '', inventory: stateData ? stateData?.inventory : '', manufactureDate: stateData ? YYYYMMDD(stateData?.manufactureDate) : '', expiryDate: stateData ? YYYYMMDD(stateData?.expiryDate) : '' });
    const [inputFieldError, setInputFieldError] = useState({ categoryId: '', subCategoryId: '', productName: '', description: '', mrp: '', offerPrice: '', purchasePrice: '', refundDay: '', stockQuantity: '', inventory: '', manufactureDate: '', expiryDate: '', image: '', bulkImage: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });
    const [bulkImage, setBulkImage] = useState(stateData ? stateData?.bannerImages.map(value => { return { file: base_url + value, bytes: '' } }) : []); //* Mutliple File 

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

    // Handle Image :  //! Bulk Image
    const handleBulkImage = (e) => {
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
        const { categoryId, productName, mrp, purchasePrice, offerPrice, refundDay, stockQuantity, inventory, manufactureDate, expiryDate, description } = productDetail;
        const { file } = image;
        console.log({ manufactureDate, expiryDate })
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
        if (!mrp) {
            handleInputFieldError("mrp", "Please Enter Mrp")
            isValid = false;
        }
        if (!offerPrice) {
            handleInputFieldError("offerPrice", "Please Enter Offer Price")
            isValid = false;
        }
        if (parseFloat(offerPrice) >= parseFloat(mrp)) {
            handleInputFieldError("offerPrice", "Please Enter Offer Price Less Than Mrp")
            isValid = false;
        }
       
        if (!stockQuantity) {
            handleInputFieldError("stockQuantity", "Please Enter Stock Quantity")
            isValid = false;
        }
        
        if (!description) {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }
        if (description?.length > 2000) {
            handleInputFieldError("description", "Description Should be Less Than 2000")
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
        console.log("Product Data :: ", { ...productDetail, image, bulkImage: bulkImage?.map((value) => value?.bytes) })
        const bulkImageArray = bulkImage?.map((value) => value?.bytes);

        const { categoryId, productName, description, mrp, offerPrice, purchasePrice, stockQuantity, inventory, refundDay, manufactureDate, expiryDate } = productDetail;

        if (handleValidation()) {
            if (stateData) {
                let formData = new FormData();
                formData.append("productId", stateData?._id);
                formData.append("categoryId", categoryId);
                formData.append("productName", productName);
                formData.append("description", description);
                formData.append("mrp", mrp);
                formData.append("price", offerPrice);
                formData.append("quantity", stockQuantity);
                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImages`, value)
                ))
                const payload = {
                    data: formData,
                    onComplete: () => navigate('/temple/product')
                }

                //! Dispatching API for Updating Products
                dispatch(AstromallActions.updateAstromallProduct(payload))

            } else {
                let formData = new FormData();
                formData.append("categoryId", categoryId);
                formData.append("productName", productName);
                formData.append("description", description);
                formData.append("mrp", mrp);
                formData.append("price", offerPrice);
                formData.append("quantity", stockQuantity);
                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImages`, value)
                ))

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/temple/product')
                }

                //! Dispatching API for Creating Products
                dispatch(AstromallActions.createAstromallProduct(payload))
            }
        } else {
            console.log("Validation Error !!!")
        }
    };

    useEffect(() => {
        dispatch(AstromallActions.getAstromallCategory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Temple Product</div>
                    <div onClick={() => navigate("/temple/product")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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
                                label="Select Bhagwan ji* " variant="outlined" fullWidth
                                name='categoryId'
                                value={productDetail?.categoryId?._id}
                                onChange={handleInputField}
                                error={inputFieldError?.categoryId ? true : false}
                                onFocus={() => handleInputFieldError("categoryId", null)}
                            >
                                <MenuItem disabled>---Select Category Name---</MenuItem>
                                {astromallCategoryData.map((value, index) => {
                                    return <MenuItem key={index} value={value?._id}>{value?.categoryName}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {inputFieldError?.categoryId && <div style={{ color: "#D32F2F", fontSize: "10px", padding: "3px 15px 0 15px" }}>{inputFieldError?.categoryId}</div>}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Product Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={productDetail?.productName || ''}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                handleInputField({ target: { name: 'productName', value: data } });
                            }}
                            onFocus={() => handleInputFieldError("productName", null)}
                        />
                        {inputFieldError.productName && (
                            <p style={{ color: "red", marginTop: "8px" }}>{inputFieldError.productName}</p>
                        )}
                    </Grid>

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>MRP <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='mrp' type="number"
                            value={productDetail?.mrp}
                            onChange={handleInputField}
                            error={inputFieldError.mrp ? true : false}
                            helperText={inputFieldError.mrp}
                            onFocus={() => handleInputFieldError("mrp", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid> */}

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Offer Price <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth type="number"
                            name='offerPrice'
                            value={productDetail?.offerPrice}
                            onChange={handleInputField}
                            error={inputFieldError.offerPrice ? true : false}
                            helperText={inputFieldError.offerPrice}
                            onFocus={() => handleInputFieldError("offerPrice", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid> */}

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Purchase Price <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='purchasePrice' type="number"
                            value={productDetail?.purchasePrice}
                            onChange={handleInputField}
                            error={inputFieldError.purchasePrice ? true : false}
                            helperText={inputFieldError.purchasePrice}
                            onFocus={() => handleInputFieldError("purchasePrice", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid> */}
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