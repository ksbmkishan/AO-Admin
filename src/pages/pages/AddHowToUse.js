import React, { useState } from "react";
import { useStyles } from "../../assets/styles";
import { Grid, Avatar } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import RichTextEditor from 'react-rte';
import * as PagesActions from "../../redux/actions/pagesActions.js";
import { connect } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Colors } from "../../assets/styles";

export const AddHowToUse = ({ dispatch }) => {
  var classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    profilePhoto: "",
  });

  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [discription, setDiscription] = useState(RichTextEditor.createEmptyValue());
  const [profilePhoto, setProfilePhoto] = useState({
    file: logo,
    bytes: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      setError({ profilePhoto: "Please select a profile image." });
    } else if (!file.type.startsWith("image/")) {
      setError({ profilePhoto: "Please upload a valid image file." });
    } else if (file.size > 5242880) { // 5 MB in bytes
      setError({ profilePhoto: "File size exceeds 5 MB. Please choose a smaller image." });
    } else {
      setError({ profilePhoto: "" });
      // Perform any additional checks or actions if needed
      setProfilePhoto({ file: URL.createObjectURL(file), bytes: e.target.files[0] });
    }
  };

  const handleClickOpenSnack = (msg) => {
    setOpenSnack(true);
    setMessageSnack(msg);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleSubmit = () => {
    if (!discription) {
      handleError("discription", "Please Enter Description");
      handleClickOpenSnack("Please Enter Description");
    } else if (!profilePhoto.bytes) {
      handleError("profilePhoto", "Please Upload Image");
      handleClickOpenSnack("Please Upload Image");
    } else {
      console.log(profilePhoto.bytes);
      const formData = new FormData();
      formData.append("description", discription.toString('html'));
      formData.append("image", profilePhoto.bytes);
      formData.append("type", "Photo");

      const payload = {
        data: formData,
        onComplete: handleReset
      };
      // Dispatching API for Creating Skill 
      dispatch(PagesActions.createAppTutorials(payload));
    }
  };

  const handleReset = () => {
    // Reset the state or perform any other necessary actions
    setError({ profilePhoto: "", discription: "" });
    setDiscription(RichTextEditor.createEmptyValue());
    navigate('/displayHowToUse')
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2} padding={"20px"}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer} style={{ padding: "0 25px 15px 25px" }}>
              <div className={classes.tableHead}>How to Use ScreenShots</div>
              <div onClick={() => navigate("/displayHowToUse")} className={classes.addButton} >
                <DvrIcon />
                <div className={classes.addButtontext}>Display/AddScreenshot</div>
              </div>
            </div>
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12} sx={{ display: "flex", alignItems: "center", gap: "40px", justifyContent: "space-between", }} >
            <Grid>
              <Grid component="label" className={classes.uploadImageButton} >
                Upload Image <span style={{ color: "red" }}>*</span>
                <input onChange={handleImageUpload} hidden accept="image/*" type="file" />
              </Grid>
              <div className={classes.errorstyles}>{error.profilePhoto}</div>
            </Grid>

            <Avatar src={profilePhoto.file} color={Colors.primaryDark} style={{ width: 56, height: 56 }} />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <label><h6> Description </h6></label>
            <RichTextEditor
              value={discription}
              onChange={setDiscription}
              editorStyle={{ minHeight: '50vh' }}
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(null, mapDispatchToProps)(AddHowToUse);
