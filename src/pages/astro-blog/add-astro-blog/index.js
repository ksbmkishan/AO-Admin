import RichTextEditor from 'react-rte';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { UploadImageSvg } from "../../../assets/svg";
import { Color } from "../../../assets/colors";
import { img_url } from "../../../utils/api-routes";
import { Regex_Accept_Alpha } from "../../../utils/regex-pattern";
import * as AstroblogActions from "../../../redux/actions/astroBlogActions";

const AddAstroblog = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const stateData = location.state?.stateData;

    const { astroblogCategoryData } = useSelector(state => state.blogs);

    const [inputFieldDetail, setInputFieldDetail] = useState({ title: stateData ? stateData?.title : '', created_by: stateData ? stateData?.created_by : '', categoryId: stateData ? stateData?.blogCategoryId?._id : '' });
    const [description_en, setDescription_en] = useState(stateData ?
        RichTextEditor.createValueFromString(stateData?.description || '', 'html') :
        RichTextEditor.createEmptyValue()
    );
    const [description_hi, setDescription_hi] = useState(stateData ?
        RichTextEditor.createValueFromString(stateData?.description_hi || '', 'html') :
        RichTextEditor.createEmptyValue()
    );
    const [currentLang, setCurrentLang] = useState('en');
    const [inputFieldError, setInputFieldError] = useState({ title: '', created_by: '', category: '', description_en: '', image: '', categoryId: '', description_hi: '' });
    const [image, setImage] = useState({ file: stateData ? stateData.image : '', bytes: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value }))

    //* Handle Input Field : Data
    const handleInputField = (event) => setInputFieldDetail({ ...inputFieldDetail, [event?.target?.name]: event?.target?.value });

    //* Handle Image
    const handleImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0]?.size < 1 * 1024 * 1024) {
                setImage({
                    file: URL.createObjectURL(e.target.files[0]),
                    bytes: e.target.files[0],
                });
            } else {
                alert("Please upload images having size less than 1 MB")
            }
        }

        handleInputFieldError("image", null)
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (e.dataTransfer.files[0]?.size < 1 * 1024 * 1024) {
                setImage({
                    file: URL.createObjectURL(e.dataTransfer.files[0]),
                    bytes: e.dataTransfer.files[0],
                });
            } else {
                alert("Please upload images having size less than 1 MB")
            }
        }
        handleInputFieldError("image", null);
    };

    //! Handle Validation 
    const handleValidation = () => {
        let isValid = true;
        const { title, created_by, categoryId } = inputFieldDetail;
        const { file } = image;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title");
            isValid = false;
        } else if (!Regex_Accept_Alpha.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title");
            isValid = false;
        }
        if (!created_by) {
            handleInputFieldError("created_by", "Please Enter Author Name");
            isValid = false;
        } else if (!Regex_Accept_Alpha.test(created_by)) {
            handleInputFieldError("created_by", "Please Enter Valid Author Name");
            isValid = false;
        }
        if (!categoryId) {
            handleInputFieldError("categoryId", "Please Select Category");
            isValid = false;
        }
       
        if (!file) {
            handleInputFieldError("image", "Please Upload Image");
            isValid = false;
        }

        // Description validation
        const hasEnglishText = description_en.getEditorState().getCurrentContent().hasText();
        const hasHindiText = description_hi.getEditorState().getCurrentContent().hasText();
        
        if (!hasEnglishText) {
            handleInputFieldError("description_en" , "Please Enter Description in English");
            isValid = false;
        } 

        if (!hasHindiText) {
            handleInputFieldError("description_hi" , "Please Enter Description in Hindi");
            isValid = false;
        } 


        return isValid;
    };

    //! Handle Description Change based on language
    const handleDescriptionChange = (value) => {
        if (currentLang === 'en') {
            setDescription_en(value);
            if (value.getEditorState().getCurrentContent().hasText()) {
                handleInputFieldError("description_en", null);
            }
        } else {
            setDescription_hi(value);
            if (value.getEditorState().getCurrentContent().hasText()) {
                handleInputFieldError("description_hi", null);
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

    //! Handle Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ ...inputFieldDetail });

        if (handleValidation()) {
            const { title, created_by, categoryId } = inputFieldDetail;
            console.log('categories: ' + categoryId);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("created_by", created_by);
            formData.append("blogCategoryId", categoryId);
            formData.append("description", description_en.toString('html'));
            formData.append("description_hi", description_hi.toString('html'));
            formData.append("image", image.bytes);

            if (stateData) {
                formData.append("blogId", stateData._id);
                dispatch(AstroblogActions.updateAstroBlog({ data: formData, onComplete: () => navigate("/astro-blog/blog") }));
            } else {
                dispatch(AstroblogActions.addAstroBlog({ data: formData, onComplete: () => navigate("/astro-blog/blog") }));
            }
        }
    };

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(AstroblogActions.getAstroblogCategory());
    }, []);

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", backgroundColor: "#fff" }}>
                <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>{mode} Astroblog</div>
                <div onClick={() => navigate("/astro-blog/blog")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
            </div>

            <Grid container sx={{ alignItems: "center" }} spacing={3}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                        {image.file ?
                            <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                <Avatar src={image.file} style={{ height: '300px', width: '300px', borderRadius: "initial" }} />
                            </label>
                            :
                            <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", padding: "100px 0", cursor: "pointer" }}>
                                <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                                <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload</div>
                                <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                            </label>}
                        <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                    </div>
                    {inputFieldError.image && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px" }}>{inputFieldError.image}</div>}
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        label={<>Title <span style={{ color: "red" }}>*</span></>}
                        variant='outlined'
                        fullWidth
                        name='title'
                        value={inputFieldDetail.title}
                        onChange={handleInputField}
                        error={!!inputFieldError.title}
                        helperText={inputFieldError.title}
                        onFocus={() => handleInputFieldError("title", null)}
                    />
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
                            {astroblogCategoryData.map((value, index) => {
                                return <MenuItem key={index} value={value?._id}>{value?.blog_category}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    {inputFieldError?.categoryId && <div style={{ color: "#D32F2F", fontSize: "10px", padding: "3px 15px 0 15px" }}>{inputFieldError?.categoryId}</div>}
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                        label={<>Author <span style={{ color: "red" }}>*</span></>}
                        variant='outlined'
                        fullWidth
                        name='created_by'
                        value={inputFieldDetail.created_by}
                        onChange={handleInputField}
                        error={!!inputFieldError.created_by}
                        helperText={inputFieldError.created_by}
                        onFocus={() => handleInputFieldError("created_by", null)}
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

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container sx={{ justifyContent: "space-between" }}>
                        <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddAstroblog;