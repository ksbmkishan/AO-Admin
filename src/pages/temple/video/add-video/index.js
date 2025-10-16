import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Grid, TextField } from "@mui/material";
import { Color } from "../../../../assets/colors";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import * as TempleActions from "../../../../redux/actions/templeActions";
import moment from "moment";
import { api_urls } from "../../../../utils/api-urls";
import { UploadImageSvg, UploadvideoSvg } from "../../../../assets/svg"; // ✅ make sure UploadvideoSvg is imported

const AddVideo = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [inputFieldDetail, setInputFieldDetail] = useState({
        title: stateData ? stateData?.title : "",
    });
    const [inputFieldError, setInputFieldError] = useState({
        title: "",
        video: "",
    });
    const [video, setVideo] = useState({
        file: stateData ? stateData?.video : "",
        bytes: "",
    });

    // Handle input change
    const handleInputField = (e) =>
        setInputFieldDetail({
            ...inputFieldDetail,
            [e?.target?.name]: e?.target?.value,
        });

    // Handle error
    const handleInputFieldError = (input, value) =>
        setInputFieldError((prev) => ({ ...prev, [input]: value }));

    //! Handle Video : Normally
    const handleVideo = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setVideo({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
            handleInputFieldError("video", null); // ✅ fixed key name
        }
    };

    //! Handle Video : Drop Feature
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setVideo({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
            handleInputFieldError("video", null);
        }
    };

    //! Validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = inputFieldDetail;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title");
            isValid = false;
        }

        if (!video.file && !stateData) {
            handleInputFieldError("video", "Please Upload Video");
            isValid = false;
        }

        return isValid;
    };

    //! Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title } = inputFieldDetail;

        if (!handleValidation()) {
            console.log("Validation Failed!!!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        if (video && video.bytes) {
            formData.append("video", video.bytes);
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        const action = stateData
            ? TempleActions.createTempleVideo({
                _id: stateData._id,
                formData,
                onComplete: () => navigate("/temple/video"),
            })
            : TempleActions.createTempleVideo({
                formData,
                onComplete: () => navigate("/temple/video"),
            });

        dispatch(action);
    };

    return (
        <div
            style={{
                padding: "20px",
                backgroundColor: "#fff",
                marginBottom: "20px",
                boxShadow: "0px 0px 5px lightgrey",
                borderRadius: "10px",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                    fontFamily: "Philosopher",
                    backgroundColor: "#fff",
                }}
            >
                <div
                    style={{
                        fontSize: "22px",
                        fontWeight: "500",
                        color: Color.black,
                    }}
                >
                    {mode} Temple Video
                </div>
                <div
                    onClick={() => navigate("/temple/video")}
                    style={{
                        fontWeight: "500",
                        backgroundColor: Color.primary,
                        color: Color.white,
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Display
                </div>
            </div>

            {/* Form */}
            <Grid container sx={{ alignItems: "center" }} spacing={3}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                    <TextField
                        label={
                            <>
                                Title <span style={{ color: "red" }}>*</span>
                            </>
                        }
                        variant="outlined"
                        fullWidth
                        name="title"
                        value={inputFieldDetail?.title}
                        onChange={handleInputField}
                        error={!!inputFieldError.title}
                        helperText={inputFieldError.title}
                        onFocus={() => handleInputFieldError("title", null)}
                    />
                </Grid>

                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <div
                        style={{
                            color: "#000",
                            border: "1px solid #C4C4C4",
                            borderRadius: "3px",
                        }}
                    >
                        {video?.file ? (
                            <label
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                htmlFor="upload-video"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    padding: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                <video controls style={{ height: '200px', maxWidth: '300px' }}>
                                    <source src={video?.file} />
                                </video>
                            </label>
                        ) : (
                            <label
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                htmlFor="upload-video"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    alignItems: "center",
                                    padding: "100px 0",
                                    cursor: "pointer",
                                }}
                            >
                                <UploadvideoSvg h="80" w="80" color="#C4C4C4" />
                                <div style={{ fontWeight: "600", fontSize: "18px" }}>
                                    Choose Your Video to Upload
                                </div>
                                <div
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        color: "grey",
                                    }}
                                >
                                    Or Drop Your Video Here
                                </div>
                            </label>
                        )}
                        <input
                            id="upload-video"
                            onChange={handleVideo} // ✅ fixed lowercase typo
                            hidden
                            accept="video/*"
                            type="file"
                        />
                    </div>
                    {inputFieldError?.video && (
                        <div
                            style={{
                                color: "#D32F2F",
                                fontSize: "12.5px",
                                padding: "10px 0 0 12px",
                            }}
                        >
                            {inputFieldError?.video}
                        </div>
                    )}
                </Grid>

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
                                fontSize: "15px",
                            }}
                        >
                            Submit
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddVideo;
