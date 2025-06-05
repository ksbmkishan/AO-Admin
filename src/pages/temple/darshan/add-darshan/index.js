import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Color } from "../../../../assets/colors";
import { base_url, img_url } from "../../../../utils/api-routes";
import { CrossSvg, UploadImageSvg } from "../../../../assets/svg";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import * as TempleActions from '../../../../redux/actions/templeAction';
import { api_urls } from "../../../../utils/api-urls";
import ReactQuill from 'react-quill'; // import the Quill component
import 'react-quill/dist/quill.snow.css';
import RichTextEditor from 'react-rte';

const AddDarshan = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const id = location.state && location.state.stateData?._id
    console.log("State Data ::: ", stateData);

    const [inputFields, setInputFields] = useState(['']);

    const [inputFieldDetail, setInputFieldDetail] = useState({
        title: stateData ? stateData?.title : '',
        temple: stateData ? stateData?.temple : '',
        description: stateData ? RichTextEditor.createValueFromString(stateData?.description, 'html') : RichTextEditor.createEmptyValue(),
        aarti: stateData ? stateData?.aarti : '',
        aartilyrics: stateData ? RichTextEditor.createValueFromString(stateData?.aartilyrics, 'html') : RichTextEditor.createEmptyValue(),
        chalisa: stateData ? stateData?.chalisa : '',
        chalisalyrics: stateData ? RichTextEditor.createValueFromString(stateData?.chalisalyrics, 'html') : RichTextEditor.createEmptyValue(),
        mantralink: stateData ? stateData?.mantralink : '',
        mantralyrics: stateData ? RichTextEditor.createValueFromString(stateData?.mantralyrics, 'html') : RichTextEditor.createEmptyValue(),
        bhajan: stateData ? stateData?.bhajan : '',
        bhjanlyrics: stateData ? RichTextEditor.createValueFromString(stateData?.bhjanlyrics, 'html') : RichTextEditor.createEmptyValue(),
    });
    const [inputFieldError, setInputFieldError] = useState({
        image: '', temple: '', title: '', description: '', bulkImage: '', bulkVideo: '',
        aarti: '', aartilyrics: '', chalisa: '', chalisalyrics: '', mantralink: '', mantralyrics: '', bhajan: '', bhjanlyrics: ''
    });
    const [image, setImage] = useState({ file: stateData ? api_urls + stateData?.image : '', bytes: '' });
    const [bulkImage, setBulkImage] = useState(
        Array.isArray(stateData?.bulkImageOnly)
            ? stateData.bulkImageOnly.map(value => ({ file: base_url + value, inputs: [''] }))
            : []
    );
    const [bulkVideo, setbulkVideo] = useState(stateData ? stateData?.
        bulkVideoUpload.map(value => ({ file: base_url + value })) : []);

    console.log('bulkImage :: ', bulkImage);

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

    //! Handle Bulk Image 
    const handleBulkImage = (event) => {
        const selectedFiles = event.target.files;

        console.log("Selected files: ", selectedFiles);

        if (bulkImage?.length >= 5) {
            alert('Please select less than 5 files');
            return;
        }

        if (selectedFiles && selectedFiles.length > 0) {
            const updatedImage = Array.from(selectedFiles).map(file => ({
                file: URL.createObjectURL(file),
                bytes: file
            }));

            // अगर आप नई images को पुराने के साथ जोड़ना चाहते हैं:
            setBulkImage((prev) => [...prev, ...updatedImage]);

            // अगर आप नई images को पुराने पर ओवरराइड करना चाहते हैं:
            // setBulkImage(updatedImage);
        }
    };

    //! Handle Bulk Video 
    const handlebulkVideo = (event) => {

        const selectedFiles = event.target.files;

        console.log("Selected files: ", selectedFiles);

        if (bulkVideo?.length >= 5) {
            alert('Please select less than 5 files');
            return;
        }

        if (selectedFiles && selectedFiles.length > 0) {
            const updatedVideo = Array.from(selectedFiles).map(file => ({
                file: URL.createObjectURL(file),
                bytes: file
            }));

            // अगर आप नई images को पुराने के साथ जोड़ना चाहते हैं:
            setbulkVideo((prev) => [...prev, ...updatedVideo]);

            // अगर आप नई images को पुराने पर ओवरराइड करना चाहते हैं:
            // setBulkImage(updatedImage);
        }
    };
    console.log("Bulk Video :::", bulkVideo);

    //! Handle validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = inputFieldDetail;
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
        if (!file) {
            handleInputFieldError("image", "Please Upload Image")
            isValid = false;
        }

        return isValid;
    };

    const handleImageDelete = (data) => {
        console.log('data ', data);
        const payload = {
            data: {
                id: stateData?._id,
                image: data
            },
            onComplete: () => console.log('test')
        }

        dispatch(TempleActions.deleteTempleImage(payload))
    }

    const handleVideoDelete = (data) => {
        console.log('video file ', data);
        const payload = {
            data: {
                id: stateData?._id,
                video: data
            },
            onComplete: () => console.log('test')
        }

        dispatch(TempleActions.deleteTempleVideo(payload))
    }

    const handleInputChange = (imgIndex, inputIndex, value) => {
        const updated = [...bulkImage];
        updated[imgIndex].inputs[inputIndex] = value;
        setBulkImage(updated);
    };

    const handleAddField = (imgIndex) => {
        const updated = [...bulkImage];
        updated[imgIndex].inputs.push('');
        setBulkImage(updated);
    };

    const handleRemoveField = (imgIndex, inputIndex) => {
        const updated = [...bulkImage];
        updated[imgIndex].inputs.splice(inputIndex, 1);
        setBulkImage(updated);
    };



    //! Handle Submit - Creating Darshan
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Darshan Data :: ", { ...inputFieldDetail, image, bulkImage, bulkVideo })
        const { title, description, temple, aarti, aartilyrics, chalisa, chalisalyrics, mantralink, mantralyrics, bhajan, bhjanlyrics } = inputFieldDetail;

        console.log('Audio ', bulkVideo)

        if (handleValidation()) {

            if (stateData) {
                let formData = new FormData();
                formData.append("id", stateData?._id);
                formData.append("temple", temple);
                formData.append("title", title);
                formData.append("description", description?.toString('html'));
                formData.append("aarti", aarti);
                formData.append("aartilyrics", aartilyrics?.toString('html'));
                formData.append("chalisa", chalisa);
                formData.append("chalisalyrics", chalisalyrics?.toString('html'));
                formData.append("mantralink", mantralink);
                formData.append("mantralyrics", mantralyrics?.toString('html'));
                formData.append("bhajan", bhajan);
                formData.append("bhjanlyrics", bhjanlyrics?.toString('html'));
                formData.append("image", image?.bytes);
                bulkImage.forEach(image => { formData.append(`bulkImageUpload`, image?.bytes); });
                bulkVideo.forEach(video => { formData.append(`bulkVideoUpload`, video?.bytes); });


                const payload = {
                    data: formData,
                    onComplete: () => navigate("/temple/darshan")
                }

                //! Dispatching API for Updating Darshan
                dispatch(TempleActions.createTempleDarshan(payload))

            } else {
                let formData = new FormData();
                formData.append("temple", temple);
                formData.append("title", title);
                formData.append("description", description?.toString('html'));
                formData.append("aarti", aarti);
                formData.append("aartilyrics", aartilyrics?.toString('html'));
                formData.append("chalisa", chalisa);
                formData.append("chalisalyrics", chalisalyrics?.toString('html'));
                formData.append("mantralink", mantralink);
                formData.append("mantralyrics", mantralyrics?.toString('html'));
                formData.append("bhajan", bhajan);
                formData.append("bhjanlyrics", bhjanlyrics?.toString('html'));
                formData.append("image", image?.bytes);
                bulkImage.forEach(image => { formData.append(`bulkImageUpload`, image?.bytes); });
                bulkVideo.forEach(video => { formData.append(`bulkVideoUpload`, video?.bytes); });

                const payload = {
                    data: formData,
                    onComplete: () => navigate("/temple/darshan")
                }

                //! Dispatching API for Creating Darshan
                dispatch(TempleActions.createTempleDarshan(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Darshan</div>
                    <div onClick={() => navigate("/temple/darshan")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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

                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Temple <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                label="Select Temple *" variant="outlined" fullWidth
                                name='temple'
                                value={inputFieldDetail?.temple}
                                onChange={handleInputField}
                                error={inputFieldError?.temple ? true : false}
                                onFocus={() => handleInputFieldError("temple", null)}
                            >
                                <MenuItem disabled>---Select Temple---</MenuItem>
                                <MenuItem value="Sanatan">Sanatan</MenuItem>
                                <MenuItem value="Navgrah">Navgrah</MenuItem>
                            </Select>
                        </FormControl>
                        {inputFieldError?.temple && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.temple}</div>}
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12} >
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

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Description <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.description}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, description: value })}
                            editorStyle={{ minHeight: '50vh', }}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.description && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.description}
                            </span>
                        )}
                    </Grid>

                    {/* {inputFields.map((field, index) => (
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                            <div key={index} style={{ marginBottom: '10px', flexDirection: 'row', alignItems: 'center' }}>
                            {bulkImage.length > 0 && bulkImage?.map((value, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <Avatar src={value.file} style={{ height: '150px', width: "250px", borderRadius: "initial" }} />
                                  
                                </div>
                            ))}
                                <label htmlFor="upload-bulk-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        <input id="upload-bulk-image" multiple type="file" onChange={handleBulkImage} hidden />
                                <input
                                    type="Priority"
                                    value={field}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder={`Input ${index + 1}`}
                                />
                                {inputFields.length > 1 && (
                                    <div onClick={() => handleRemoveField(index)} style={{ top: '-13px', right: '-15px', cursor: "pointer" }}>
                                        <CrossSvg />
                                    </div>
                                )}
                            </div>

                            <button type="button" style={{ backgroundColor: 'green' }} onClick={handleAddField}>Add Input</button>
                            <br /><br />
                        </Grid>
                    ))} */}

                   {/** <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <label htmlFor="upload-bulk-image" style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', backgroundColor: '#F1F1F7', display: 'inline-block' }}>
                                Upload Images
                            </label>
                            <input id="upload-bulk-image" type="file" multiple onChange={handleBulkImage} hidden />
                        </Grid>

                        {bulkImage.length > 0 && bulkImage.map((image, imgIndex) => (
                            <Grid item xs={12} key={imgIndex}>
                                <Avatar src={image.file} style={{ height: '150px', width: "250px", borderRadius: "initial" }} />

                                {image.inputs.map((input, inputIndex) => (
                                    <div key={inputIndex} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <input
                                            type="text"
                                            value={input}
                                            placeholder={`Priority ${inputIndex + 1}`}
                                            onChange={(e) => handleInputChange(imgIndex, inputIndex, e.target.value)}
                                            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                        />
                                        {image.inputs.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveField(imgIndex, inputIndex)}>Remove</button>
                                        )}
                                    </div>
                                ))}

                                <button type="button" onClick={() => handleAddField(imgIndex)} style={{ backgroundColor: 'green', color: '#fff', padding: '6px 12px', borderRadius: '4px' }}>
                                    Add Input
                                </button>
                            </Grid>
                        ))}
                    </Grid> */} 



                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkImage.length > 0 && bulkImage?.map((value, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <Avatar src={value.file} style={{ height: '150px', width: "250px", borderRadius: "initial" }} />
                                    <div onClick={() => {
                                        value?.bytes ?
                                            setBulkImage(bulkImage.filter((curr, currIndex) => currIndex !== index)) : handleImageDelete(value?.file)
                                    }} style={{ position: "absolute", top: '-13px', right: '-15px', cursor: "pointer" }}><CrossSvg /></div>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "13px", color: "gray" }}>Upload More Images(Max File Count : 5)</div>
                        <label htmlFor="upload-bulk-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        <input id="upload-bulk-image" multiple type="file" onChange={handleBulkImage} hidden />
                    </Grid>



                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkVideo.length > 0 && bulkVideo.map((value, index) => {
                                return (
                                    <div key={index} style={{ position: "relative" }}>
                                        <video controls style={{ height: '200px', maxWidth: '300px' }}>
                                            {value?.file ?
                                                <source src={value?.file} /> :
                                                <source src={base_url + value} />}
                                        </video>
                                        <div
                                            onClick={() => {
                                                value?.file ?
                                                    handleVideoDelete(value?.file) : setbulkVideo(bulkVideo.filter((curr, currIndex) => currIndex !== index))
                                            }
                                            }
                                            style={{
                                                position: "absolute",
                                                top: '-13px',
                                                right: '-15px',
                                                cursor: "pointer"
                                            }}
                                        >
                                            <CrossSvg />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "13px", color: "gray" }}>Upload More GIF/Video</div>
                        <label htmlFor="upload-bulk-audio" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        <input id="upload-bulk-audio" accept="video/*" type="file" onChange={handlebulkVideo} hidden />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField
                            label={<>Aarti Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='aarti'
                            value={inputFieldDetail?.aarti}
                            onChange={handleInputField}
                            error={inputFieldError.aarti ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("aarti", null)}
                        />
                    </Grid>



                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField
                            label={<>Chalisa Link<span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='chalisa'
                            value={inputFieldDetail?.chalisa}
                            onChange={handleInputField}
                            error={inputFieldError.chalisa ? true : false}
                            helperText={inputFieldError.chalisa}
                            onFocus={() => handleInputFieldError("chalisa", null)}
                        />
                    </Grid>



                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField
                            label={<>Mantra Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='mantralink'
                            value={inputFieldDetail?.mantralink}
                            onChange={handleInputField}
                            error={inputFieldError.mantralink ? true : false}
                            helperText={inputFieldError.mantralink}
                            onFocus={() => handleInputFieldError("mantralink", null)}
                        />
                    </Grid>



                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField
                            label={<>Bhajan Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='bhajan'
                            value={inputFieldDetail?.bhajan}
                            onChange={handleInputField}
                            error={inputFieldError.bhajan ? true : false}
                            helperText={inputFieldError.bhajan}
                            onFocus={() => handleInputFieldError("bhajan", null)}
                        />
                    </Grid>



                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Aarti Lyrics <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.aartilyrics}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, aartilyrics: value })}
                            editorStyle={{ minHeight: '20vh', }}
                            onFocus={() => handleInputFieldError("aartilyrics", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.aartilyrics && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.aartilyrics}
                            </span>
                        )}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Chalisa Lyrics <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.chalisalyrics}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, chalisalyrics: value })}
                            editorStyle={{ minHeight: '20vh', }}
                            onFocus={() => handleInputFieldError("chalisalyrics", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.chalisalyrics && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.chalisalyrics}
                            </span>
                        )}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Mantra Lyrics <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.mantralyrics}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, mantralyrics: value })}
                            editorStyle={{ minHeight: '20vh', }}
                            onFocus={() => handleInputFieldError("mantralyrics", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.mantralyrics && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.mantralyrics}
                            </span>
                        )}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Bhajan Lyrics <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.bhjanlyrics}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, bhjanlyrics: value })}
                            editorStyle={{ minHeight: '20vh', }}
                            onFocus={() => handleInputFieldError("bhjanlyrics", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.bhjanlyrics && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.bhjanlyrics}
                            </span>
                        )}
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

export default AddDarshan;
