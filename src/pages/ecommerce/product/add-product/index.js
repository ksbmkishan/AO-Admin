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
    console.log(stateData, '  ::: ');
    const { ecommerceCategoryData } = useSelector(state => state.ecommerceReducer);

    const [inputFieldDetail, setInputFieldDetail] = useState({ 
        categoryId: stateData ? stateData?.category?._id : '', 
        productName: stateData ? stateData?.name : '', 
        price: stateData ? stateData?.price : '', 
        commission: stateData ? stateData?.adminCommissionPercentage : '' 
    });
    const [inputFieldError, setInputFieldError] = useState({ 
        categoryId: '', 
        productName: '', 
        description_en: '', 
        description_hi: '', 
        price: '', 
        image: '', 
        bulkImage: '',
        commission: '' 
    });
    const [image, setImage] = useState({ 
        file: stateData ? stateData?.image : '', 
        bytes: null 
    });
    const [bulkImage, setBulkImage] = useState(stateData ? stateData?.bannerImage?.map(value => { 
        return { file: value, bytes: null } 
    }) : []);
    const [description_en, setDescription_en] = useState(stateData ? 
        RichTextEditor.createValueFromString(stateData?.description || '', 'html') : 
        RichTextEditor.createEmptyValue()
    );
    const [description_hi, setDescription_hi] = useState(stateData ? 
        RichTextEditor.createValueFromString(stateData?.description_hi || '', 'html') : 
        RichTextEditor.createEmptyValue()
    );
    const [currentLang, setCurrentLang] = useState('en');

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value }))

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value });
        // Clear error when user starts typing
        if (inputFieldError[name]) {
            handleInputFieldError(name, '');
        }
    };

    //! Handle Image : Normally
    const handleImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
            handleInputFieldError("image", null);
        }
    };

    //! Handle Image : Drop Feature
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
            handleInputFieldError("image", null);
        }
    };

    // Handle Image : Bulk Image
    const handleBulkImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files).slice(0, 5 - bulkImage.length).map(file => ({
                file: URL.createObjectURL(file),
                bytes: file,
            }));
            
            if (bulkImage.length + newImages.length <= 5) {
                setBulkImage([...bulkImage, ...newImages]);
            } else {
                alert('You can only upload up to 5 images');
            }
        }
    };

    // Remove bulk image
    const removeBulkImage = (index) => {
        setBulkImage(bulkImage.filter((_, currIndex) => currIndex !== index));
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { categoryId, productName, price, commission } = inputFieldDetail;

        // Reset errors
        const newErrors = { ...inputFieldError };
        
        if (!categoryId) {
            newErrors.categoryId = "Please Select Category Name";
            isValid = false;
        } else {
            newErrors.categoryId = '';
        }

        if (!productName) {
            newErrors.productName = "Please Enter Product Name";
            isValid = false;
        } else if (!Regex_Accept_Alpha_Dot_Comma_Space.test(productName)) {
            newErrors.productName = "Please Enter Valid Product Name";
            isValid = false;
        } else if (productName.toString().length > 70) {
            newErrors.productName = "Please Enter Product Name Less Than 70 Letters";
            isValid = false;
        } else {
            newErrors.productName = '';
        }

        if (!price || price < 0) {
            newErrors.price = "Please Enter Valid Price";
            isValid = false;
        } else {
            newErrors.price = '';
        }

        // Commission validation for specific category
        if (inputFieldDetail?.categoryId === "67de7a2dc85bfe89e5cfc012") {
            if (!commission || commission < 0) {
                newErrors.commission = "Please Enter Valid Commission";
                isValid = false;
            } else {
                newErrors.commission = '';
            }
        }

        // Description validation
        const hasEnglishText = description_en.getEditorState().getCurrentContent().hasText();
        const hasHindiText = description_hi.getEditorState().getCurrentContent().hasText();
        
        if (!hasEnglishText) {
            newErrors.description_en = "Please Enter Description in English";
            isValid = false;
        } else {
            newErrors.description_en = '';
        }

        if (!hasHindiText) {
            newErrors.description_hi = "Please Enter Description in Hindi";
            isValid = false;
        } else {
            newErrors.description_hi = '';
        }

        if (!image.file && !image.bytes) {
            newErrors.image = "Please Select Image";
            isValid = false;
        } else {
            newErrors.image = '';
        }

        setInputFieldError(newErrors);
        return isValid;
    };

    //! Handle Description Change based on language - FIXED
    const handleDescriptionChange = (value) => {
        if (currentLang === 'en') {
            setDescription_en(value);
            if (value.getEditorState().getCurrentContent().hasText()) {
                handleInputFieldError("description_en", '');
            }
        } else {
            setDescription_hi(value); // Fixed this line
            if (value.getEditorState().getCurrentContent().hasText()) {
                handleInputFieldError("description_hi", '');
            }
        }
    };

    //! Get current description value based on language
    const getCurrentDescription = () => {
        return currentLang === 'en' ? description_en : description_hi;
    };

    //! Get current description error based on language
    const getCurrentDescriptionError = () => {
        return currentLang === 'en' ? inputFieldError.description_en : inputFieldError.description_hi;
    };

    //! Handle Submit - Creating Ecommerce Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (handleValidation()) {
            const { categoryId, productName, price, commission } = inputFieldDetail;
            const bulkImageArray = bulkImage?.map((value) => value?.bytes).filter(Boolean);

            let formData = new FormData();
            formData.append("category", categoryId);
            formData.append("name", productName);
            formData.append("description", description_en.toString('html'));
            formData.append("description_hi", description_hi.toString('html'));
            formData.append("price", price);
            
            if (commission) {
                formData.append("adminCommissionPercentage", commission);
            }

            // Only append image if it's a new file
            if (image.bytes) {
                formData.append("image", image.bytes);
            }

            // Append bulk images
            bulkImageArray.forEach((value) => {
                formData.append("bannerImage", value);
            });

            if (stateData) {
                // Update existing product
                const payload = {
                    data: formData,
                    id: stateData?._id,
                    onComplete: () => navigate('/ecommerce/product')
                };
                dispatch(EcommerceActions.updateEcommerceProduct(payload));
            } else {
                // Create new product
                const payload = {
                    data: formData,
                    onComplete: () => navigate('/ecommerce/product')
                };
                dispatch(EcommerceActions.createEcommerceProduct(payload));
            }
        } else {
            console.log("Validation Error !!!");
        }
    };

    useEffect(() => {
        dispatch(EcommerceActions.getEcommerceCategory());
    }, [dispatch]);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Ecommerce Product</div>
                    <div onClick={() => navigate("/ecommerce/product")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    {/* Main Image Upload */}
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {image?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar 
                                        src={typeof image.file === 'string' ? image.file : URL.createObjectURL(image.file)} 
                                        style={{ height: '300px', minWidth: "50%", borderRadius: "initial" }} 
                                    />
                                </label>
                                :
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", padding: "100px 0", cursor: "pointer" }}>
                                    <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload <span style={{ color: "red" }}>*</span></div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                                </label>}
                            <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                        </div>
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px" }}>{inputFieldError?.image}</div>}
                    </Grid>

                    {/* Category Selection */}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControl fullWidth error={!!inputFieldError?.categoryId}>
                            <InputLabel id="select-label">Select Category Name<span style={{ color: "red" }}>* </span></InputLabel>
                            <Select
                                labelId="select-label"
                                label="Select Category Name *"
                                variant="outlined"
                                fullWidth
                                name='categoryId'
                                value={inputFieldDetail?.categoryId}
                                onChange={handleInputField}
                                onFocus={() => handleInputFieldError("categoryId", null)}
                            >
                                <MenuItem value="">---Select Category Name---</MenuItem>
                                {ecommerceCategoryData.map((value, index) => {
                                    return <MenuItem key={index} value={value?._id}>{value?.categoryName}</MenuItem>
                                })}
                            </Select>
                            {inputFieldError?.categoryId && <div style={{ color: "#D32F2F", fontSize: "12px", padding: "3px 15px 0 15px" }}>{inputFieldError?.categoryId}</div>}
                        </FormControl>
                    </Grid>

                    {/* Product Name */}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label={<>Product Name <span style={{ color: "red" }}>*</span></>}
                            variant='outlined'
                            fullWidth
                            name='productName'
                            value={inputFieldDetail?.productName}
                            onChange={handleInputField}
                            error={!!inputFieldError.productName}
                            helperText={inputFieldError.productName}
                            onFocus={() => handleInputFieldError("productName", null)}
                        />
                    </Grid>

                    {/* Price */}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label={<>Price <span style={{ color: "red" }}>*</span></>}
                            variant='outlined'
                            fullWidth
                            name='price'
                            type="number"
                            value={inputFieldDetail?.price}
                            onChange={handleInputField}
                            error={!!inputFieldError.price}
                            helperText={inputFieldError.price}
                            onFocus={() => handleInputFieldError("price", null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    {/* Commission (Conditional) */}
                    {inputFieldDetail?.categoryId === "67de7a2dc85bfe89e5cfc012" && (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                label={<>Commission <span style={{ color: "red" }}>*</span></>}
                                variant='outlined'
                                fullWidth
                                name='commission'
                                type="number"
                                value={inputFieldDetail?.commission}
                                onChange={handleInputField}
                                error={!!inputFieldError.commission}
                                helperText={inputFieldError.commission}
                                onFocus={() => handleInputFieldError("commission", null)}
                                inputProps={{ min: 0 }}
                            />
                        </Grid>
                    )}

                    {/* Language Toggle */}
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
                                    cursor: 'pointer',
                                    border: 'none'
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
                                    cursor: 'pointer',
                                    border: 'none'
                                }}
                            >
                                Hindi
                            </button>
                        </div>
                    </Grid>

                    {/* Description Editor */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>
                            Description {currentLang === 'en' ? '(English)' : '(Hindi)'} <span style={{ color: "red" }}>*</span>
                        </label>
                        <RichTextEditor
                            value={getCurrentDescription()}
                            onChange={handleDescriptionChange}
                            editorStyle={{ minHeight: '200px' }}
                        />
                        {getCurrentDescriptionError() && (
                            <div style={{ color: "#D32F2F", fontSize: "12px", padding: "3px 15px 0 15px" }}>
                                {getCurrentDescriptionError()}
                            </div>
                        )}
                    </Grid>

                    {/* Bulk Images */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkImage.map((value, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <Avatar 
                                        src={typeof value.file === 'string' ? value.file : URL.createObjectURL(value.file)} 
                                        style={{ height: '150px', width: "250px", borderRadius: "initial" }} 
                                    />
                                    <div 
                                        onClick={() => removeBulkImage(index)} 
                                        style={{ position: "absolute", top: '-13px', right: '-15px', cursor: "pointer" }}
                                    >
                                        <CrossSvg />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {bulkImage.length < 5 && (
                            <>
                                <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "13px", color: "gray" }}>
                                    Upload More Images (Max File Count: 5)
                                </div>
                                <label htmlFor="upload-bulk-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                                    <UploadImageSvg h="25" w="25" color="#000" />
                                    <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                                </label>
                                <input id="upload-bulk-image" multiple type="file" onChange={handleBulkImage} hidden accept="image/*" />
                            </>
                        )}
                    </Grid>

                    {/* Submit Button */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <div 
                                onClick={handleSubmit} 
                                style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}
                            >
                                Submit
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default AddProduct;