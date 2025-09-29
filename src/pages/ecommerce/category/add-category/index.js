import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar, CircularProgress, Box } from "@mui/material";
import { UploadImageSvg } from "../../../../assets/svg";
import * as EcommerceActions from '../../../../redux/actions/ecommerceAction';
import { Color } from "../../../../assets/colors";
import { base_url } from "../../../../utils/api-routes";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import Swal from "sweetalert2";
import RichTextEditor from "react-rte";

const AddCategory = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const [loading, setLoading] = useState(false);

    const [categoryDetail, setCategoryDetail] = useState({ 
        title: stateData ? stateData?.categoryName : '',  
        description: stateData && stateData.description 
            ? RichTextEditor.createValueFromString(stateData.description, 'html') 
            : RichTextEditor.createEmptyValue() 
    });
    
    const [inputFieldError, setInputFieldError] = useState({ title: '', image: '', description: '' });
    const [image, setImage] = useState({ 
        file: stateData ? stateData?.image : '', 
        bytes: '' 
    });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setCategoryDetail({ ...categoryDetail, [name]: value });
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
        const { title, description } = categoryDetail;
        const { file } = image;

        // Reset errors
        setInputFieldError({ title: '', image: '', description: '' });

        if (!title) {
            handleInputFieldError("title", "Please Enter Title")
            isValid = false;
        } else if (!Regex_Accept_Alpha_Dot_Comma_Space.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title")
            isValid = false;
        } else if (title.toString().length > 70) {
            handleInputFieldError("title", "Please Enter Title Less Than 70 Letter")
            isValid = false;
        }

        if (!file) {
            handleInputFieldError("image", "Please Upload Image")
            isValid = false;
        }

        // Check if description is empty
        if (!description || description.toString('html').replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            setLoading(true);
            const { title, description } = categoryDetail;

            try {
                if (stateData) {
                    let formData = new FormData()
                    formData.append("categoryId", stateData?._id);
                    formData.append("categoryName", title)
                    if (image.bytes) {
                        formData.append("image", image?.bytes);
                    }
                    formData.append("description", description.toString('html'));

                    const payload = {
                        data: formData,
                        onComplete: () => {
                            setLoading(false);
                            navigate("/ecommerce/category");
                        }
                    }
                    dispatch(EcommerceActions.updateEcommerceCategory(payload))
                } else {
                    let formData = new FormData()
                    formData.append("categoryName", title)
                    formData.append("image", image?.bytes);
                    formData.append("description", description.toString('html'));

                    const payload = {
                        data: formData,
                        onComplete: () => {
                            setLoading(false);
                            navigate("/ecommerce/category");
                        }
                    }

                    //! Dispatching API for Creating Category
                    dispatch(EcommerceActions.createEcommerceCategory(payload))
                }
            } catch (error) {
                setLoading(false);
                Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
            }
        }
    };

    const handleCancel = () => {
        navigate("/ecommerce/category");
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Mall Category</div>
                    <div onClick={() => navigate("/ecommerce/category")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {image?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar 
                                        src={image.file} 
                                        style={{ 
                                            height: '300px', 
                                            width: "300px", 
                                            borderRadius: "initial",
                                            objectFit: 'contain'
                                        }} 
                                    />
                                    <div style={{ marginTop: '10px', color: Color.primary }}>
                                        Click or drag to change image
                                    </div>
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

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} 
                            variant='outlined' 
                            fullWidth
                            name='title'
                            value={categoryDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid>

                    {/* Description */}
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: "20px" }}>
                        <label>
                            Description <span style={{ color: "red" }}>*</span>
                        </label>
                        <RichTextEditor
                            value={categoryDetail.description}
                            onChange={(value) =>
                                setCategoryDetail((prev) => ({ ...prev, description: value }))
                            }
                            editorStyle={{ 
                                minHeight: "200px", 
                                border: inputFieldError.description ? '1px solid #D32F2F' : '1px solid #C4C4C4',
                                borderRadius: '4px'
                            }}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
                        {inputFieldError.description && (
                            <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px" }}>
                                {inputFieldError.description}
                            </div>
                        )}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <Box display="flex" gap={2}>
                                <div 
                                    onClick={handleSubmit} 
                                    style={{ 
                                        fontWeight: "500", 
                                        backgroundColor: Color.primary, 
                                        color: Color.white, 
                                        padding: "10px 20px", 
                                        borderRadius: "5px", 
                                        cursor: "pointer", 
                                        fontSize: "15px",
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        minWidth: '100px',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
                                </div>
                                <div 
                                    onClick={handleCancel} 
                                    style={{ 
                                        fontWeight: "500", 
                                        backgroundColor: '#f5f5f5', 
                                        color: Color.black, 
                                        padding: "10px 20px", 
                                        borderRadius: "5px", 
                                        cursor: "pointer", 
                                        fontSize: "15px",
                                        border: '1px solid #ddd'
                                    }}
                                >
                                    Cancel
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        </>
    );
};

export default AddCategory;