import RichTextEditor from 'react-rte';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar } from "@mui/material";
import { UploadImageSvg } from "../../../assets/svg";
import { Color } from "../../../assets/colors";
import { img_url } from "../../../utils/api-routes";
import { Regex_Accept_Alpha } from "../../../utils/regex-pattern";
import * as AddAstroBlog from "../../../redux/actions/astroBlogActions";

const AddAstroblog = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const stateData = location.state?.stateData;

    console.log('state ::: ', stateData)

    const [astroblogDetail, setAstroblogDetail] = useState({
        title: stateData ? stateData.title : '',
        created_by: stateData ? stateData.created_by : '',
        category: stateData ? stateData.blogCategory : '',

    });
    const [customCategory, setCustomCategory] = useState('');
    const [error, setError] = useState('');
    const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
    const [inputFieldError, setInputFieldError] = useState({
        title: '', created_by: '', category: '', description: '', image: '', images: ''
    });
    const [image, setImage] = useState({
        file: stateData ? img_url + stateData.image : '',
        bytes: ''
    });

    const [images, setImages] = useState({
        files: stateData && Array.isArray(stateData.images) ? stateData.images.map(img => img_url + img) : [],
        bytes: ''
    });

    console.log('Images :: ', images.bytes)


    useEffect(() => {
        if (stateData) {
            const data = RichTextEditor.createValueFromString(stateData.description, 'html');
            setDescription(data);
        }
    }, [stateData]);

    const handleInputFieldError = (input, value) => {
        setInputFieldError(prev => ({ ...prev, [input]: value }));
    };

    const handleInputField = (e) => {
        const { name, value } = e.target;
        setAstroblogDetail(prev => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        console.log('adsgas')
        if (e.target.files && e.target.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }
        handleInputFieldError("image", null);
    };

    const handleImageMultiple = (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            const newImages = [...images.files, ...Array.from(files).map(file => URL.createObjectURL(file))];
            const bytesImages = [...images.bytes, ...Array.from(files).map(file => file)];
            setImages({ files: newImages, bytes: bytesImages });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
        }
        handleInputFieldError("image", null);
    };

    const handleDropMultiple = (event) => {
        event.preventDefault();
        const files = event.target.files;
        if (files.length > 0) {
            const newImages = [...images.files, ...Array.from(files).map(file => URL.createObjectURL(file))];
            const bytesImages = [...images.bytes, ...Array.from(files).map(file => file)];

            setImages({ files: newImages, bytes: bytesImages });
        }
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setAstroblogDetail(prev => ({ ...prev, category: value }));
        if (value !== 'Others') {
            setCustomCategory('');
        }
    };

    const handleCustomCategoryChange = (event) => {
        setCustomCategory(event.target.value);
    };

    const handleBlur = () => {
        if (astroblogDetail.category === 'Others' && !customCategory) {
            setError('Custom category is required.');
        } else {
            setError('');
        }
    };

    const handleValidation = () => {
        let isValid = true;
        const { title, category, created_by } = astroblogDetail;
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
        // if (!category) {
        //     handleInputFieldError("category", "Please Select Category");
        //     isValid = false;
        // } else if (category === 'Others' && !customCategory) {
        //     handleInputFieldError("category", "Custom category is required.");
        //     isValid = false;
        // }
        if (description.toString('html') === "<p><br></p>") {
            handleInputFieldError("description", "Please Enter Description");
            isValid = false;
        }
        if (!file) {
            handleInputFieldError("image", "Please Upload Image");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('images.bytes ',images.bytes, image.bytes)

        if (handleValidation()) {
            const { title, category, created_by } = astroblogDetail;
            const formData = new FormData();
            formData.append("title", title);
            formData.append("created_by", created_by);
            formData.append("blogCategory", 'Category');
            // formData.append("blogCategory", category === 'Others' ? customCategory : category);
            formData.append("description", description.toString('html'));
            // ✅ Single Image Append करें
            if (image.bytes) {
                formData.append("image", image.bytes);
            }

            // ✅ Multiple Images Append करें
            if (images.bytes && images.bytes.length > 0) {
                images.bytes.forEach((file, index) => {
                    formData.append(`images`, file);  // ✅ Same key `images` for multiple files
                });
            }

            console.log('images files :: ', images.bytes);

            if (stateData) {
                formData.append("blogId", stateData._id);
                dispatch(AddAstroBlog.updateAstroBlog({
                    data: formData,
                    onComplete: () => navigate("/astro-blog")
                }));
            } else {
                dispatch(AddAstroBlog.addAstroBlog({
                    data: formData,
                    onComplete: () => navigate("/astro-blog")
                }));
            }
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>{mode} Astroblog</div>
                <div onClick={() => navigate("/astro-blog")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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



                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                        label={<>Title <span style={{ color: "red" }}>*</span></>}
                        variant='outlined'
                        fullWidth
                        name='title'
                        value={astroblogDetail.title}
                        onChange={handleInputField}
                        error={!!inputFieldError.title}
                        helperText={inputFieldError.title}
                        onFocus={() => handleInputFieldError("title", null)}
                    />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                        label={<>Author <span style={{ color: "red" }}>*</span></>}
                        variant='outlined'
                        fullWidth
                        name='created_by'
                        value={astroblogDetail.created_by}
                        onChange={handleInputField}
                        error={!!inputFieldError.created_by}
                        helperText={inputFieldError.created_by}
                        onFocus={() => handleInputFieldError("created_by", null)}
                    />
                </Grid>

                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormControl variant="outlined" fullWidth error={!!inputFieldError.category || !!error}>
                        <InputLabel id="select-label">Select Category <span style={{ color: "red" }}>*</span></InputLabel>
                        <Select
                            id="category-select"
                            value={astroblogDetail.category}
                            onChange={handleCategoryChange}
                            onBlur={handleBlur}
                            label="Select Category *"
                        >
                            <MenuItem value="" disabled>---Select Category---</MenuItem>
                            <MenuItem value="Love">Love</MenuItem>
                            <MenuItem value="Health">Health</MenuItem>
                            <MenuItem value="Success">Success</MenuItem>
                            <MenuItem value="Marriage">Marriage</MenuItem>
                            <MenuItem value="Life">Life</MenuItem>
                            <MenuItem value="Financial">Financial</MenuItem>
                            <MenuItem value="Vastu">Vastu</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Festival">Festive</MenuItem>
                            <MenuItem value="Relationship">Relationship</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>
                        {astroblogDetail.category === 'Others' && (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Custom Category"
                                value={customCategory}
                                onChange={handleCustomCategoryChange}
                                onBlur={handleBlur}
                                helperText={error}
                                error={!!error}
                            />
                        )}
                        {inputFieldError.category && <FormHelperText error>{inputFieldError.category}</FormHelperText>}
                    </FormControl>
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

                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px", padding: "20px" }}>
                        <label onDragOver={(e) => e.preventDefault()} onDrop={handleDropMultiple} htmlFor="upload-images"
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                            {Array.isArray(images.files) && images.files.length > 0 ? (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                                    {images.files.map((img, index) => (
                                        <Avatar key={index} src={img} style={{ height: '100px', width: '100px', borderRadius: "initial" }} />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Multiple Images to Upload</div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Images Here</div>
                                </>
                            )}
                        </label>
                        <input id="upload-images" onChange={handleImageMultiple} hidden accept="images/*" type="file" multiple />
                    </div>
                    {inputFieldError.images && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px" }}>{inputFieldError.images}</div>}
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