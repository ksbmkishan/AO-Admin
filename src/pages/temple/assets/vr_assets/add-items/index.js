import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { UploadImageSvg } from "../../../../../assets/svg";
import { Color } from "../../../../../assets/colors";
import { base_url } from "../../../../../utils/api-routes";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../../utils/regex-pattern";
import axios from "axios";

const AddItems = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location?.state?.stateData;

  const [inputFieldDetail, setInputFieldDetail] = useState({
    _id: stateData?._id || '',
    title: stateData?.itemName || '',
    price: stateData?.itemPrice || '',
    paymentType: stateData?.payment || '',
    duration: stateData?.duration || '',
    keywords: stateData?.keywords || '',
    animationType: stateData?.animationType || ''
  });

  const [inputFieldError, setInputFieldError] = useState({
    image: '', title: '', price: '', paymentType: '', duration: '', keywords: '', animationType: ''
  });

  const [image, setImage] = useState({
    file: stateData ? base_url + stateData?.itemImage : '',
    bytes: ''
  });

  const [audio, setAudio] = useState({ file: '', bytes: '' });

  const handleInputField = (e) => {
    setInputFieldDetail({ ...inputFieldDetail, [e.target.name]: e.target.value });
    handleInputFieldError(e.target.name, null);
  };

  const handleInputFieldError = (input, value) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }));
  };

  const handleImage = (e) => {
    if (e.target.files?.length > 0) {
      setImage({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
    }
    handleInputFieldError("image", null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) {
      setImage({
        file: URL.createObjectURL(e.dataTransfer.files[0]),
        bytes: e.dataTransfer.files[0],
      });
    }
    handleInputFieldError("image", null);
  };

  const handleAudio = (e) => {
    if (e.target.files?.length > 0) {
      const file = e.target.files[0];
      setAudio({
        file: file.name,
        bytes: file
      });
    }
  };

  const handleValidation = () => {
    let isValid = true;
    const { title, price, paymentType, duration, _id,animationType } = inputFieldDetail;

    if (!title) {
      handleInputFieldError("title", "Please Enter Title");
      isValid = false;
    } else if (!Regex_Accept_Alpha_Dot_Comma_Space.test(title)) {
      handleInputFieldError("title", "Please Enter Valid Title");
      isValid = false;
    } else if (title.length > 70) {
      handleInputFieldError("title", "Please Enter Title Less Than 70 Characters");
      isValid = false;
    }

    if (price && price > 100000) {
      handleInputFieldError("price", "Price should be less than 100000");
      isValid = false;
    }

    if (!_id && !image?.file) {
      handleInputFieldError("image", "Please Upload Image");
      isValid = false;
    }

    if (!paymentType) {
      handleInputFieldError("paymentType", "Please Select Payment Type");
      isValid = false;
    }

    if(!animationType) {
      handleInputFieldError("animationType","Please Select Animation Type");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    const { title, price, paymentType, duration, _id,animationType } = inputFieldDetail;

    const formData = new FormData();
    formData.append("itemName", title);
    formData.append("itemPrice", price || 0);
    formData.append("payment", paymentType);
    formData.append("duration", duration || 0);
    formData.append("keywords", inputFieldDetail.keywords || '');
    formData.append("animationType", animationType || '');

    if (image?.bytes) formData.append("itemImage", image.bytes);
    if (audio?.bytes) formData.append("audio", audio.bytes);
    if (_id) formData.append("_id", _id);

    try {
      const response = await axios.post(
        "https://astrooneapi.ksdelhi.net/api/admin/add_vr_items",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        alert(_id ? "Item updated successfully!" : "Item added successfully!");
        navigate(-1);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (err) {
      console.error("API Error:", err);
      alert("Something went wrong while submitting the item.");
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 22, fontWeight: "500", color: Color.black }}>{mode} Item</div>
        <div onClick={() => navigate(-1)} style={{ cursor: "pointer", backgroundColor: Color.primary, color: "#fff", padding: "6px 12px", borderRadius: "5px" }}>Back</div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
            {image?.file ? (
              <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "block", textAlign: "center", cursor: "pointer" }}>
                <Avatar src={image.file} style={{ height: 200, width: 200, margin: "auto" }} />
              </label>
            ) : (
              <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", cursor: "pointer" }}>
                <UploadImageSvg h="80" w="80" color="#ccc" />
                <div style={{ fontWeight: "500", fontSize: 16 }}>Upload or Drop Image</div>
              </label>
            )}
            <input hidden type="file" id="upload-image" accept="image/*" onChange={handleImage} />
            {inputFieldError.image && <div style={{ color: "red", fontSize: 12 }}>{inputFieldError.image}</div>}
          </div>
        </Grid>

        <Grid item xs={12}>
          <TextField label="Title *" fullWidth name="title" value={inputFieldDetail.title}
            onChange={handleInputField} error={!!inputFieldError.title} helperText={inputFieldError.title} />
        </Grid>

         <Grid item xs={12}>
          <TextField label="Keywords" fullWidth name="keywords" type="text" value={inputFieldDetail.keywords}
            onChange={handleInputField} error={!!inputFieldError.keywords} helperText={inputFieldError.keywords} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Price" fullWidth name="price" type="number" value={inputFieldDetail.price}
            onChange={handleInputField} error={!!inputFieldError.price} helperText={inputFieldError.price} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Duration (in seconds)" fullWidth name="duration" type="number" value={inputFieldDetail.duration}
            onChange={handleInputField} error={!!inputFieldError.duration} helperText={inputFieldError.duration} />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Payment Type *</InputLabel>
            <Select name="paymentType" value={inputFieldDetail.paymentType}
              onChange={handleInputField} error={!!inputFieldError.paymentType}>
              <MenuItem value="">-- Select Payment Type --</MenuItem>
              <MenuItem value="add">Add</MenuItem>
              <MenuItem value="deduct">Deduct</MenuItem>
            </Select>
            {inputFieldError.paymentType && <div style={{ color: "red", fontSize: 12 }}>{inputFieldError.paymentType}</div>}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Animation Type *</InputLabel>
            <Select name="animationType" value={inputFieldDetail.animationType}
              onChange={handleInputField} error={!!inputFieldError.animationType}>
              <MenuItem value="">-- Select Animation Type --</MenuItem>
              <MenuItem value="round">Round</MenuItem>
              <MenuItem value="pendulum">Pendulum</MenuItem>
              <MenuItem value="cracking">Cracking</MenuItem>
              <MenuItem value="updown">Up Down</MenuItem>
            </Select>
            {inputFieldError.paymentType && <div style={{ color: "red", fontSize: 12 }}>{inputFieldError.paymentType}</div>}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <label style={{ fontWeight: "500", marginBottom: "10px", display: "block" }}>Upload Audio (optional)</label>
          <input type="file" accept="audio/*" onChange={handleAudio} />
          {audio?.file && <div style={{ marginTop: "8px", fontSize: "14px", color: "grey" }}>Selected: {audio.file}</div>}
        </Grid>

        <Grid item xs={12}>
          <div onClick={handleSubmit} style={{ cursor: "pointer", backgroundColor: Color.primary, color: "#fff", padding: "10px 20px", borderRadius: "5px", textAlign: "center", fontWeight: "500" }}>
            Submit
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddItems;
