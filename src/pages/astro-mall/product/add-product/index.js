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

const AddProduct = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const { astromallCategoryData } = useSelector(state => state.astromallReducer);

    const [productDetail, setProductDetail] = useState({ categoryId: stateData ? stateData?.categoryId : '', productName: stateData ? stateData?.productName : '', description: stateData ? stateData?.description : '', mrp: stateData ? stateData?.mrp : '', offerPrice: stateData ? stateData?.price : '', purchasePrice: stateData ? stateData?.purchasePrice : '', refundDay: stateData ? stateData?.refundRequetDay : '', stockQuantity: stateData ? stateData?.quantity : '', inventory: stateData ? stateData?.inventory : '', manufactureDate: stateData ? YYYYMMDD(stateData?.manufactureDate) : '', expiryDate: stateData ? YYYYMMDD(stateData?.expiryDate) : '' });
    const [inputFieldError, setInputFieldError] = useState({ categoryId: '', subCategoryId: '', productName: '', description: '', mrp: '', offerPrice: '', purchasePrice: '', refundDay: '', stockQuantity: '', inventory: '', manufactureDate: '', expiryDate: '', image: '', bulkImage: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });
    // const [bulkImage, setBulkImage] = useState([]); //* Mutliple File 
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
        // if (!purchasePrice) {
        //     handleInputFieldError("purchasePrice", "Please Enter Purchase Price")
        //     isValid = false;
        // }
        // if (!refundDay) {
        //     handleInputFieldError("refundDay", "Please Enter Refund Day")
        //     isValid = false;
        // }
        if (!stockQuantity) {
            handleInputFieldError("stockQuantity", "Please Enter Stock Quantity")
            isValid = false;
        }
        // if (!inventory) {
        //     handleInputFieldError("inventory", "Please Enter Inventory")
        //     isValid = false;
        // }
        // if (!manufactureDate) {
        //     handleInputFieldError("manufactureDate", "Please Enter Manufacture Date")
        //     isValid = false;
        // }
        // if (!expiryDate) {
        //     handleInputFieldError("expiryDate", "Please Enter Expiry Date")
        //     isValid = false;
        // }
        // if (new Date(expiryDate) <= new Date(manufactureDate)) {
        //     handleInputFieldError("expiryDate", "Expiry date is greater than the manufacture date")
        //     isValid = false;
        // }
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
                // formData.append("purchasePrice", purchasePrice);
                formData.append("quantity", stockQuantity);
                // formData.append("inventory", inventory);
                // formData.append("refundRequetDay", refundDay);
                // formData.append("manufactureDate", manufactureDate);
                // formData.append("expiryDate", expiryDate);

                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImages`, value)
                ))
                const payload = {
                    data: formData,
                    onComplete: () => navigate('/astro-mall/product')
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
                // formData.append("purchasePrice", purchasePrice);
                formData.append("quantity", stockQuantity);
                // formData.append("inventory", inventory);
                // formData.append("refundRequetDay", refundDay);
                // formData.append("manufactureDate", manufactureDate);
                // formData.append("expiryDate", expiryDate);

                formData.append("image", image?.bytes);
                bulkImageArray.map((value, index) => (
                    formData.append(`bannerImages`, value)
                ))

                const payload = {
                    data: formData,
                    onComplete: () => navigate('/astro-mall/product')
                }

                //! Dispatching API for Creating Products
                dispatch(AstromallActions.createAstromallProduct(payload))
            }
        } else {
            console.log("Validation Error !!!")
        }
    };

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(AstromallActions.getAstromallCategory())
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Mall Product</div>
                    <div onClick={() => navigate("/astro-mall/product")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Product Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='productName'
                            value={productDetail?.productName}
                            onChange={handleInputField}
                            error={inputFieldError.productName ? true : false}
                            helperText={inputFieldError.productName}
                            onFocus={() => handleInputFieldError("productName", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
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
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
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
                    </Grid>

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

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Refund Day</>} variant='outlined' fullWidth
                            name='refundDay' type="number"
                            value={productDetail?.refundDay}
                            onChange={handleInputField}
                            error={inputFieldError.refundDay ? true : false}
                            helperText={inputFieldError.refundDay}
                            onFocus={() => handleInputFieldError("refundDay", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid> */}

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Stock Quantity <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='stockQuantity' type="number"
                            value={productDetail?.stockQuantity}
                            onChange={handleInputField}
                            error={inputFieldError.stockQuantity ? true : false}
                            helperText={inputFieldError.stockQuantity}
                            onFocus={() => handleInputFieldError("stockQuantity", null)}
                            inputProps={{ min: 0 }}
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