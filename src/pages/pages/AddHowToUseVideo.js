import React, { useState } from "react";
import { useStyles } from "../../assets/styles";
import { Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import RichTextEditor from 'react-rte';
import * as PagesActions from "../../redux/actions/pagesActions.js";
import { connect } from "react-redux";
import { Regex_Youtube } from "../../utils/regex-pattern";

export const AddHowToUseVideo = ({ dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [discription, setDiscription] = useState(RichTextEditor.createEmptyValue());

  const handleYoutubeLink = (e) => {
    const value = e.target.value;
    setLink(value);
  };

  const handleSubmit = () => {
    if (!link) {
      setError('Please enter a YouTube link')
    } else if (!Regex_Youtube.test(link)) {
      setError("Please enter a valid YouTube link.");
    } else {
      const formData = new FormData();
      formData.append("description", discription.toString('html'));
      formData.append("link", link);
      formData.append("type", "Video");

      const payload = {
        data: formData,
        onComplete: handleReset
      };
      dispatch(PagesActions.createAppTutorials(payload));
    }
  };

  const handleReset = () => {
    navigate('/displayHowToUseVideos')
    setLink("");
    setError("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2} padding={"20px"}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer} style={{ padding: "0 25px 15px 25px" }}>
              <div className={classes.tableHead}>How to use - Videos</div>
              <div
                onClick={() => navigate("/displayHowToUseVideos")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/How To Use Videos
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label={<>Enter Youtube Link <span style={{ color: "red" }}>*</span></>}
              value={link}
              variant="outlined"
              fullWidth
              onChange={handleYoutubeLink}
            />
            <div className={classes.errorstyles}>{error}</div>
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

export default connect(null, mapDispatchToProps)(AddHowToUseVideo);