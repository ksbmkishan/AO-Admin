import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { Color } from "../../../assets/colors";
import { img_url } from "../../../utils/api-routes";
import * as RemediesActions from "../../../redux/actions/remediesAction";
import { Regex_Accept_Alpha } from "../../../utils/regex-pattern";

const AddRemedies = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);
    const dispatch = useDispatch();

    const [remediesDetail, setRemediesDetail] = useState({
        title: stateData ? stateData?.title : '',
        description: stateData ? stateData?.description : '',
        description_hi: stateData ? stateData?.description_hi : ''
    });

    const [inputFieldError, setInputFieldError] = useState({ title: '', image: '' });
    const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setRemediesDetail({ ...remediesDetail, [name]: value });
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

    //! Handle Validation
    // Validation
    const handleValidation = () => {
        let isValid = true;
        const { title, description, description_hi } = remediesDetail;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title");
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title");
            isValid = false;
        }

        if (!description) {
            handleInputFieldError("description", "Please Enter Description");
            isValid = false;
        }
        if (!Regex_Accept_Alpha.test(description)) {
            handleInputFieldError("description", "Please Enter Valid Description");
            isValid = false;
        }

        if (!description_hi) {
            handleInputFieldError("description_hi", "Please Enter Description in Hindi");
            isValid = false;
        }
        // अगर आप हिंदी description के लिए regex चाहते हैं तो यहाँ जोड़ सकते हैं

        return isValid;
    };

    //! Handle Submit - Creating Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { title, description, description_hi } = remediesDetail;
            let formData = new FormData();

            if (stateData) formData.append("remedyId", stateData?._id);

            formData.append("title", title);
            formData.append("description", description);
            formData.append("description_hi", description_hi);
            // formData.append("remedyIcon", image.bytes); // अगर image use करनी हो

            const payload = {
                data: formData,
                onComplete: () => navigate("/remedies")
            }

            stateData
                ? dispatch(RemediesActions.updateRemedies(payload))
                : dispatch(RemediesActions.createRemedies(payload));
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Remedies</div>
                    <div onClick={() => navigate("/remedies")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={remediesDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Description <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='description'
                            value={remediesDetail?.description}
                            onChange={handleInputField}
                            error={inputFieldError.description ? true : false}
                            helperText={inputFieldError.description}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Description (Hindi) <span style={{ color: "red" }}>*</span></>}
                            variant='outlined' fullWidth
                            name='description_hi'
                            value={remediesDetail?.description_hi}
                            onChange={handleInputField}
                            error={inputFieldError.description_hi ? true : false}
                            helperText={inputFieldError.description_hi}
                            onFocus={() => handleInputFieldError("description_hi", null)}
                        />
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

export default AddRemedies;