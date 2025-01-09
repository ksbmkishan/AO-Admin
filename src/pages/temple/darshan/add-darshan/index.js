import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Color } from "../../../../assets/colors";
import { img_url } from "../../../../utils/api-routes";
import { CrossSvg, UploadImageSvg } from "../../../../assets/svg";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import * as TempleActions from '../../../../redux/actions/templeAction';
import { api_urls } from "../../../../utils/api-urls";

const AddDarshan = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [inputFieldDetail, setInputFieldDetail] = useState({ title: stateData ? stateData?.title : '', temple: stateData ? stateData?.temple : '', description: stateData ? stateData?.description : '' });
    const [inputFieldError, setInputFieldError] = useState({ image: '', temple: '', title: '', description: '', bulkImage: '', bulkAudio: '' });
    const [image, setImage] = useState({ file: stateData ? api_urls + stateData?.image : '', bytes: '' });
    const [bulkImage, setBulkImage] = useState([]);
    const [bulkAudio, setBulkAudio] = useState([]);

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

        if (selectedFiles?.length > 5) {
            alert('Please select file less than 5');
        } else {
            if (selectedFiles && selectedFiles.length > 0) {
                const updatedImage = Array.from(selectedFiles).map(file => ({
                    file: URL.createObjectURL(file),
                    bytes: file
                }));
                setBulkImage(updatedImage);
            }
        }
    };

    //! Handle Bulk Audio 
    const handleBulkAudio = (event) => {
        const selectedFiles = event.target.files;
        console.log("Selected files: ", selectedFiles);

        if (selectedFiles?.length > 5) {
            alert('Please select file less than 5');
        } else {
            if (selectedFiles && selectedFiles.length > 0) {
                const updatedAudio = Array.from(selectedFiles).map(file => ({
                    file: URL.createObjectURL(file),
                    bytes: file
                }));
                setBulkAudio(updatedAudio);
            }
        }
    };

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

    //! Handle Submit - Creating Darshan
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Darshan Data :: ", { ...inputFieldDetail, image, bulkImage, bulkAudio })
        const { title, description, temple } = inputFieldDetail;

        if (handleValidation()) {

            if (stateData) {
                let formData = new FormData();
                formData.append("id", stateData?._id);
                formData.append("temple", temple);
                formData.append("title", title);
                formData.append("description", description);
                formData.append("image", image?.bytes);
                bulkImage.forEach(image => { formData.append(`bulkImageUpload`, image?.bytes); });
                bulkAudio.forEach(audio => { formData.append(`bulkAudioUpload`, audio?.bytes); });


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
                formData.append("description", description);
                formData.append("image", image?.bytes);
                bulkImage.forEach(image => { formData.append(`bulkImageUpload`, image?.bytes); });
                bulkAudio.forEach(audio => { formData.append(`bulkAudioUpload`, audio?.bytes); });
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

                    <Grid item lg={4} md={12} sm={12} xs={12} >
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

                    <Grid item lg={4} md={12} sm={12} xs={12} >
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

                    <Grid item lg={4} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Description <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='description'
                            value={inputFieldDetail?.description}
                            onChange={handleInputField}
                            error={inputFieldError.description ? true : false}
                            helperText={inputFieldError.description}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
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
                        <label htmlFor="upload-bulk-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        <input id="upload-bulk-image" multiple type="file" onChange={handleBulkImage} hidden />
                    </Grid>



                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkAudio.length > 0 && bulkAudio?.map((value, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <audio controls className="h-10" ><source src={value?.file} /></audio>
                                    <div onClick={() => setBulkAudio(bulkAudio.filter((curr, currIndex) => currIndex !== index))} style={{ position: "absolute", top: '-13px', right: '-15px', cursor: "pointer" }}><CrossSvg /></div>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "13px", color: "gray" }}>Upload More Audio(Max File Count : 5)</div>
                        <label htmlFor="upload-bulk-audio" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        <input id="upload-bulk-audio" accept="audio/*" multiple type="file" onChange={handleBulkAudio} hidden />
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