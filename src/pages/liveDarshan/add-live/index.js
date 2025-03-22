import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar } from "@mui/material";
import { Color } from "../../../assets/colors/index.js";
import { img_url } from "../../../utils/api-routes";
import { UploadImageSvg } from "../../../assets/svg/index.js";

const AddLive = ({ mode }) => {
  // State variables to hold form input
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location?.state?.stateData;
  const [videoLink, setVideoLink] = useState("");
  const [fromTimeOfArti, setFromTimeOfArti] = useState("");
  const [toTimeOfArti, setToTimeOfArti] = useState("");
  const [templeName, setTempleName] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [inputFieldError, setInputFieldError] = useState({});
  const [image, setImage] = useState({ file: stateData ? img_url + stateData?.image : '', bytes: '' });


  const handleInputFieldError = (input, value) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }))
  }

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

const handleImage = (e) => {
  if (e.target.files && e.target.files.length > 0) {
      setImage({
          file: URL.createObjectURL(e.target.files[0]),
          bytes: e.target.files[0],
      });
  }

  handleInputFieldError("image", null)
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!videoLink || !fromTimeOfArti || !toTimeOfArti || !templeName || !description) {
      setResponseMessage("Please fill out all fields.");
      return;
    }

    // API payload
    const payload = {
      videoLink,
      fromTimeOfArti,
      toTimeOfArti,
      templeName,
      description,
    };

    try {
      const response = await fetch("http://192.168.29.16:5018/api/admin/add_Darshan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Success: ${data.message || "Darshan added successfully!"}`);
        // Reset form fields
        setVideoLink("");
        setFromTimeOfArti("");
        setToTimeOfArti("");
        setTempleName("");
        setDescription("");


        navigate("/live");
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.message || "Failed to add Darshan."}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
    <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher' }}>
        <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>{mode === 'Edit' ? 'Edit Customer' : 'Add Live'}</div>
        <div onClick={() => navigate("/live")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
      </div>



      <form onSubmit={handleSubmit}>
        <Grid container sx={{ alignItems: "center" }} spacing={3} >


          <Grid item lg={12} sm={12} md={12} xs={12} >
                <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                    {image?.file ?
                        <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                            <Avatar src={image.file} style={{ height: '300px', minWidth: "50%", borderRadius: "initial" }} />
                        </label>
                        :
                        <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", padding: "100px 0", cursor: "pointer" }}>
                            <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                            <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload</div>
                            <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                        </label>}
                    <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                </div>
                {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.image}</div>}
            </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} >
            <TextField label={<> Temple Name <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
              name='customerName'
              value={templeName}
              onChange={(e) => setTempleName(e.target.value)}
              error={inputFieldError.customerName ? true : false}
              helperText={inputFieldError.customerName}
              onFocus={() => handleInputFieldError("customerName", null)}
            />
          </Grid>


          <Grid item lg={6} md={6} sm={12} xs={12} >
            <TextField label={<> Video Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
              name='customerName'
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              error={inputFieldError.customerName ? true : false}
              helperText={inputFieldError.customerName}
              onFocus={() => handleInputFieldError("customerName", null)}
            />
          </Grid>


          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              variant="outlined"
              label={
                <>
                  From Time of Aarati <span style={{ color: "red" }}>*</span>
                </>
              }
              fullWidth
              type="time"
              name="fromTimeOfBirth"
              value={fromTimeOfArti}
              onChange={(e) => setFromTimeOfArti(e.target.value)}
              error={inputFieldError.fromTimeOfBirth ? true : false}
              helperText={inputFieldError.fromTimeOfBirth}
              onFocus={() => handleInputFieldError("fromTimeOfBirth", null)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>


          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              variant="outlined"
              label={
                <>
                  To Time of Aarati <span style={{ color: "red" }}>*</span>
                </>
              }
              fullWidth
              type="time"
              name="fromTimeOfBirth"
              value={toTimeOfArti}
              onChange={(e) => setToTimeOfArti(e.target.value)}
              error={inputFieldError.fromTimeOfBirth ? true : false}
              helperText={inputFieldError.fromTimeOfBirth}
              onFocus={() => handleInputFieldError("fromTimeOfBirth", null)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} >
            <TextField label={<> Description <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
              name='customerName'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={inputFieldError.customerName ? true : false}
              helperText={inputFieldError.customerName}
              onFocus={() => handleInputFieldError("customerName", null)}
            />
          </Grid>

        </Grid>

         <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <div onClick={handleSubmit} style={{ marginTop: 30, fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
          </Grid>
        </Grid>
      </form>

      {responseMessage && (
        <p style={{ marginTop: "20px", color: responseMessage.startsWith("Success") ? "green" : "red" }}>
          {responseMessage}
        </p>
      )}
      </div>
    </div>
  );
};

export default AddLive;
