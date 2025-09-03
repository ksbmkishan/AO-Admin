
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  Grid, } from "@mui/material";
import RichTextEditor from "react-rte";
import { Color } from "../../../assets/colors";
import * as LetterToGodActions from "../../../redux/actions/lettertogodActions";

const Prompt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { letterPrompt } = useSelector((state) => state.letterToGodReducer);

  const [inputFieldDetail, setInputFieldDetail] = useState({
    description: RichTextEditor.createEmptyValue(),
  });
  const [inputFieldError, setInputFieldError] = useState({
    description: "",
  });

  // Initial fetch
  useEffect(() => {
    dispatch(LetterToGodActions.getUpdatePrompt({ }));
  }, [dispatch]);

   //! Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

  // Sync redux → local state
useEffect(() => {
  if (letterPrompt) {
    setInputFieldDetail(prev => ({
      description: letterPrompt.description
        ? RichTextEditor.createValueFromString(letterPrompt.description, "html")
        : RichTextEditor.createEmptyValue(),
    }));
  }
}, [letterPrompt]);

  


  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, year } = inputFieldDetail;

    // simple validation
    if (!description || !description.toString("html").trim()) {
      setInputFieldError((prev) => ({
        ...prev,
        description: "Description is required",
      }));
      return;
    }

    const formData = new FormData();
    if (letterPrompt?._id) {
      formData.append("id", letterPrompt._id);
    }
    formData.append("description", description.toString("html"));

    dispatch(
      LetterToGodActions.onUpdatePrompt({
        data: formData,
        onComplete: () => navigate("/letter-to-god/prompt"),
      })
    );
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

      {/* Description */}
      <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: "20px" }}>
        <label>
          Description <span style={{ color: "red" }}>*</span>
        </label>
        <RichTextEditor
          value={inputFieldDetail.description}
          onChange={(value) =>
            setInputFieldDetail((prev) => ({ ...prev, description: value }))
          }
          editorStyle={{ minHeight: "50vh" }}
          onFocus={() => handleInputFieldError("description", null)}
        />
        {inputFieldError.description && (
          <span style={{ color: "red" }}>{inputFieldError.description}</span>
        )}
      </Grid>

      {/* Submit */}
      <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: "20px" }}>
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
    </div>
  );
};

export default Prompt;
