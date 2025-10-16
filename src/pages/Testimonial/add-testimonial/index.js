import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button, Avatar, Dialog, DialogContent, FormControlLabel, Checkbox } from "@mui/material";
import { img_url } from "../../../utils/api-routes";
import { UploadImageSvg } from "../../../assets/svg";
import { Color } from "../../../assets/colors";
import { Regex_Accept_Alpha, Regex_Accept_Number } from "../../../utils/regex-pattern";
import * as TestimonialActions from '../../../redux/actions/TestimonialActions';
import RichTextEditor from "react-rte";

const AddTestimonial = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;

    const [testimonialDetail, setTestimonialDetail] = useState({ 
        name: stateData ? stateData?.name : '', 
        rating: stateData ? stateData?.rating : '', 
    });
    
    const [description_en, setDescription_en] = useState(
        stateData && stateData.description
            ? RichTextEditor.createValueFromString(stateData.description, 'html')
            : RichTextEditor.createEmptyValue()
    );
    
    const [description_hi, setDescription_hi] = useState(
        stateData && stateData.description_hi
            ? RichTextEditor.createValueFromString(stateData.description_hi, 'html') // Fixed: was using description instead of description_hi
            : RichTextEditor.createEmptyValue()
    );
    
    const [inputFieldError, setInputFieldError] = useState({ 
        name: '', 
        rating: '', 
        description_en: '', 
        description_hi: '',  
        images: '' 
    });
    
    const [images, setImages] = useState({ 
        file: stateData ? stateData?.image : '', 
        bytes: null 
    });
    
    const [currentLang, setCurrentLang] = useState('en');

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setTestimonialDetail({ ...testimonialDetail, [name]: value });
        
        // Clear error when user starts typing
        if (inputFieldError[name]) {
            handleInputFieldError(name, '');
        }
    };

    //! Handle Image : Normally
    const handleImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImages({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
            handleInputFieldError("images", null);
        }
    };

    //! Handle Image : Drop Feature
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImages({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
            handleInputFieldError("images", null);
        }
    };

    //* Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { name, rating } = testimonialDetail;
        const { file } = images;

        // Reset errors
        const newErrors = { ...inputFieldError };

        if (!name) {
            newErrors.name = "Please Enter Name";
            isValid = false;
        } else if (!Regex_Accept_Alpha.test(name)) {
            newErrors.name = "Please Enter Valid Name (Letters Only)";
            isValid = false;
        } else {
            newErrors.name = '';
        }

        if (!rating) {
            newErrors.rating = "Please Enter Rating";
            isValid = false;
        } else if (!Regex_Accept_Number.test(rating)) {
            newErrors.rating = "Please Enter Valid Rating (Numbers Only)";
            isValid = false;
        } else if (parseFloat(rating) <= 0 || parseFloat(rating) > 5) {
            newErrors.rating = "Please Enter Valid Rating (1-5)";
            isValid = false;
        } else {
            newErrors.rating = '';
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

        if (!file && !images.bytes) {
            newErrors.images = "Please Select Image";
            isValid = false;
        } else {
            newErrors.images = '';
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
            setDescription_hi(value);
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

    //! Handle Submit - Creating Testimonial - FIXED
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            const { name, rating } = testimonialDetail;

            let formData = new FormData();
            formData.append("name", name);
            formData.append("rating", rating);
            formData.append("description", description_en.toString('html')); // Fixed: convert to HTML string
            formData.append("description_hi", description_hi.toString('html')); // Fixed: convert to HTML string
            
            // Only append image if it's a new file
            if (images.bytes) {
                formData.append("image", images.bytes); // Fixed: changed from "images" to "image"
            }

            if (stateData) {
                formData.append("testimonialId", stateData?._id);
                
                const payload = {
                    data: formData,
                    onComplete: () => navigate('/testimonial')
                }

                //! Dispatching API for Updating Testimonial
                dispatch(TestimonialActions.updateTestimonial(payload));
            } else {
                const payload = {
                    data: formData,
                    onComplete: () => navigate('/testimonial')
                }

                //! Dispatching API for Creating Testimonial
                dispatch(TestimonialActions.createTestimonial(payload));
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                        {stateData ? 'Edit' : 'Add'} Testimonial
                    </div>
                    <div onClick={() => navigate("/testimonial")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    {/* Image Upload */}
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {images?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar 
                                        src={typeof images.file === 'string' ? images.file : URL.createObjectURL(images.file)} 
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
                        {inputFieldError?.images && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.images}</div>}
                    </Grid>

                    {/* Name Field */}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label={<>Name <span style={{ color: "red" }}>*</span></>}
                            variant='outlined'
                            fullWidth
                            name='name'
                            value={testimonialDetail?.name}
                            onChange={handleInputField}
                            error={!!inputFieldError.name}
                            helperText={inputFieldError.name}
                            onFocus={() => handleInputFieldError("name", null)}
                        />
                    </Grid>

                    {/* Rating Field */}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label={<>Rating <span style={{ color: "red" }}>*</span></>}
                            variant='outlined'
                            fullWidth
                            name='rating'
                            type="number"
                            value={testimonialDetail?.rating}
                            onChange={handleInputField}
                            error={!!inputFieldError.rating}
                            helperText={inputFieldError.rating}
                            onFocus={() => handleInputFieldError("rating", null)}
                            inputProps={{ 
                                min: 1, 
                                max: 5,
                                step: 0.1 
                            }}
                        />
                    </Grid>

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

                    {/* Submit Button */}
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <div 
                                onClick={handleSubmit} 
                                style={{ 
                                    fontWeight: "500", 
                                    backgroundColor: Color.primary, 
                                    color: Color.white, 
                                    padding: "10px 20px", 
                                    borderRadius: "5px", 
                                    cursor: "pointer", 
                                    fontSize: "15px" 
                                }}
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

export default AddTestimonial;