import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Color } from "../../../assets/colors";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as NotifciationAction from "../../../redux/actions/notificationActions";

const AddAarti = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const stateData = location.state && location.state.stateData;

  const [aartiDetail, setAartiDetail] = useState({
    title: stateData?.title || "",
    time: stateData?.time || "",
  });

  // store file separately for upload, preview separately for audio player
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [inputFieldError, setInputFieldError] = useState({});

  // Handle input change
  const handleInputField = (e) => {
    const { name, value } = e.target;
    setAartiDetail({ ...aartiDetail, [name]: value });
  };

  // Handle video upload
  const handleVideo = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.startsWith("video/")) {
        setInputFieldError({ video: "Only video files allowed (mp4, mov, avi, etc.)" });
        return;
      }

      setVideoFile(file); // ✅ real File object
      setVideoPreview(URL.createObjectURL(file)); // ✅ preview only
      setInputFieldError({ ...inputFieldError, video: "" });
    }
  };


  // Validation
  const handleValidation = () => {
    let isValid = true;
    const { title, time } = aartiDetail;

    if (!title) {
      setInputFieldError((prev) => ({ ...prev, title: "Please enter title" }));
      isValid = false;
    }
    // if (!audioFile) {
    //   setInputFieldError((prev) => ({
    //     ...prev,
    //     audio: "Please upload audio file",
    //   }));
    //   isValid = false;
    // }
    if (!time) {
      setInputFieldError((prev) => ({
        ...prev,
        time: "Please select play time",
      }));
      isValid = false;
    }

    return isValid;
  };

  // Submit
  const handleSubmit = () => {
    if (handleValidation()) {
      const formData = new FormData();
      formData.append("title", aartiDetail.title);
      formData.append("time", aartiDetail.time);

     if (videoFile) {
        formData.append("video", videoFile, videoFile.name); // ✅ attach File
      }

      if (stateData?._id) {
        formData.append("id", stateData._id);
      }

      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const payload = {
        data: formData,
        onComplete: () => {
          navigate("/admin/AartiList"); // redirect to list page
        },
      };

      dispatch(NotifciationAction.onAaartiNotification(payload));
    }
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
        }}
      >
        <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
          Add Aarti
        </div>
        <div
          onClick={() => navigate("/admin/AartiList")}
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

      <Grid container spacing={3}>
        {/* Upload Audio */}
       {/* Upload Video */}
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <div
            style={{
              border: "1px solid #C4C4C4",
              borderRadius: "5px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <input
              id="upload-video"
              onChange={handleVideo}
              accept="video/*"
              type="file"
            />
            {videoPreview && (
              <video
                controls
                src={videoPreview}
                style={{ marginTop: "10px", width: "100%", maxHeight: "400px" }}
              />
            )}
          </div>
          {inputFieldError?.video && (
            <div style={{ color: "#D32F2F", fontSize: "12.5px" }}>
              {inputFieldError.video}
            </div>
          )}
        </Grid>


        {/* Title */}
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField
            label={
              <>
                Title <span style={{ color: "red" }}>*</span>
              </>
            }
            variant="outlined"
            fullWidth
            name="title"
            value={aartiDetail?.title}
            onChange={handleInputField}
            error={!!inputFieldError.title}
            helperText={inputFieldError.title}
            onFocus={() =>
              setInputFieldError({ ...inputFieldError, title: "" })
            }
          />
        </Grid>

        {/* Play Time */}
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField
            label={
              <>
                Play Time <span style={{ color: "red" }}>*</span>
              </>
            }
            type="time"
            fullWidth
            name="time"
            value={aartiDetail?.time}
            onChange={handleInputField}
            error={!!inputFieldError.time}
            helperText={inputFieldError.time}
            onFocus={() =>
              setInputFieldError({ ...inputFieldError, time: "" })
            }
          />
        </Grid>

        {/* Submit */}
        <Grid item lg={12}>
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
              textAlign: "center",
            }}
          >
            Submit
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddAarti;
