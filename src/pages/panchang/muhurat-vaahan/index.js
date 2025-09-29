
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import RichTextEditor from "react-rte";
import { Color } from "../../../assets/colors";
import * as PanchangActions from "../../../redux/actions/panchangActions";

const MuhuratVaahan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { panchangVaahan } = useSelector((state) => state.panchangReducer);

  const [inputFieldDetail, setInputFieldDetail] = useState({
    description: RichTextEditor.createEmptyValue(),
    year: "2025",
    lang: "en", // ✅ default language
  });

  const [inputFieldError, setInputFieldError] = useState({
    description: "",
    year: "",
    lang: "",
  });

  // Initial fetch
  useEffect(() => {
    dispatch(
      PanchangActions.getPanchangVaahan({
        year: Number(inputFieldDetail.year),
        lang: inputFieldDetail.lang,
      })
    );
  }, [dispatch, inputFieldDetail.year, inputFieldDetail.lang]);

  // Sync redux → local state
  useEffect(() => {
    if (panchangVaahan) {
      setInputFieldDetail((prev) => ({
        ...prev,
        description: panchangVaahan.description
          ? RichTextEditor.createValueFromString(
              panchangVaahan.description,
              "html"
            )
          : RichTextEditor.createEmptyValue(),
        year: panchangVaahan.year?.toString() || prev.year,
        lang: panchangVaahan.lang || prev.lang,
      }));
    }
  }, [panchangVaahan]);

  const handleInputFieldError = (input, value) =>
    setInputFieldError((prev) => ({ ...prev, [input]: value }));

  const handleYearChange = (e) => {
    const { value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, year: value }));
  };

  const handleLangChange = (e) => {
    const { value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, lang: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, year, lang } = inputFieldDetail;

    // simple validation
    if (!year) {
      setInputFieldError((prev) => ({ ...prev, year: "Year is required" }));
      return;
    }
    if (!lang) {
      setInputFieldError((prev) => ({ ...prev, lang: "Language is required" }));
      return;
    }
    if (!description || !description.toString("html").trim()) {
      setInputFieldError((prev) => ({
        ...prev,
        description: "Description is required",
      }));
      return;
    }

    const formData = new FormData();
    if (panchangVaahan?._id) {
      formData.append("id", panchangVaahan._id);
    }
    formData.append("description", description.toString("html"));
    formData.append("year", year);
    formData.append("lang", lang); // ✅ add lang in formData

    dispatch(
      PanchangActions.onPanchangVaahan({
        data: formData,
        onComplete: () => navigate("/admin/panchang/muhurat-vaahan"),
      })
    );
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: "0px 0px 5px lightgrey", borderRadius: "10px" }}>
      
      {/* Year */}
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel>Select Year</InputLabel>
          <Select
            value={inputFieldDetail.year}
            onChange={handleYearChange}
            error={!!inputFieldError.year}
            onFocus={() => handleInputFieldError("year", null)}
          >
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
            <MenuItem value="2027">2027</MenuItem>
            <MenuItem value="2028">2028</MenuItem>
          </Select>
        </FormControl>
        {inputFieldError.year && (
          <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>
            {inputFieldError.year}
          </div>
        )}
      </Grid>

      {/* Language */}
      <Grid item lg={4} md={12} sm={12} xs={12} style={{ marginTop: "20px" }}>
        <FormControl fullWidth>
          <InputLabel>Select Language</InputLabel>
          <Select
            value={inputFieldDetail.lang}
            onChange={handleLangChange}
            error={!!inputFieldError.lang}
            onFocus={() => handleInputFieldError("lang", null)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">हिंदी</MenuItem>
          </Select>
        </FormControl>
        {inputFieldError.lang && (
          <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>
            {inputFieldError.lang}
          </div>
        )}
      </Grid>

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


export default MuhuratVaahan;
