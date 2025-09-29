import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import RichTextEditor from "react-rte";
import { Color } from "../../../assets/colors";
import * as PanchangActions from "../../../redux/actions/panchangActions";

const MuhuratSampatti = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { panchangSampatti } = useSelector((state) => state.panchangReducer);

  const [inputFieldDetail, setInputFieldDetail] = useState({
    description: RichTextEditor.createEmptyValue(),
    year: "2025",
    lang: "en", // default language
  });

  const [inputFieldError, setInputFieldError] = useState({
    description: "",
    year: "",
    lang: "",
  });

  // Initial fetch
  useEffect(() => {
    dispatch(PanchangActions.getPanchangSampatti({ year: 2025 }));
  }, [dispatch]);

  // Sync redux → local state
  useEffect(() => {
    if (panchangSampatti) {
      setInputFieldDetail((prev) => ({
        description: panchangSampatti.description
          ? RichTextEditor.createValueFromString(panchangSampatti.description, "html")
          : RichTextEditor.createEmptyValue(),
        year: panchangSampatti.year?.toString() || prev.year,
        lang: panchangSampatti.lang || prev.lang,
      }));
    }
  }, [panchangSampatti]);

  const handleInputFieldError = (input, value) =>
    setInputFieldError((prev) => ({ ...prev, [input]: value }));

  const handleYearChange = (e) => {
    const { value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, year: value }));
    dispatch(PanchangActions.getPanchangSampatti({ year: Number(value) }));
  };

  // Update language handler
  const handleLangChange = (e) => {
    const { value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, lang: value }));

    // Fetch description for selected year + language
    dispatch(PanchangActions.getPanchangSampatti({
      year: Number(inputFieldDetail.year),
      lang: value
    }));
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
    if (panchangSampatti?._id) {
      formData.append("id", panchangSampatti._id);
    }
    formData.append("description", description.toString("html"));
    formData.append("year", year);
    formData.append("lang", lang);

    dispatch(
      PanchangActions.onPanchangSampatti({
        data: formData,
        onComplete: () => navigate("/admin/panchang/muhurat-sampatti"),
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
      {/* Year Selector */}
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="select-year-label">Select Year</InputLabel>
          <Select
            label="Select Year"
            variant="outlined"
            fullWidth
            name="year"
            value={inputFieldDetail.year}
            onChange={handleYearChange}
            error={!!inputFieldError.year}
            onFocus={() => handleInputFieldError("year", null)}
          >
            <MenuItem disabled value="">
              ---Select year---
            </MenuItem>
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
            <MenuItem value="2027">2027</MenuItem>
            <MenuItem value="2028">2028</MenuItem>
          </Select>
        </FormControl>
        {inputFieldError.year && (
          <div
            style={{
              color: "#D32F2F",
              fontSize: "13px",
              padding: "5px 15px 0 12px",
              fontWeight: "500",
            }}
          >
            {inputFieldError.year}
          </div>
        )}
      </Grid>

      {/* Language Selector */}
      <Grid item lg={4} md={12} sm={12} xs={12} style={{ marginTop: "20px" }}>
        <FormControl fullWidth>
          <InputLabel id="select-lang-label">Select Language</InputLabel>
          <Select
            label="Select Language"
            variant="outlined"
            fullWidth
            name="lang"
            value={inputFieldDetail.lang}
            onChange={handleLangChange}
            error={!!inputFieldError.lang}
            onFocus={() => handleInputFieldError("lang", null)}
          >
            <MenuItem disabled value="">
              ---Select language---
            </MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
          </Select>
        </FormControl>
        {inputFieldError.lang && (
          <div
            style={{
              color: "#D32F2F",
              fontSize: "13px",
              padding: "5px 15px 0 12px",
              fontWeight: "500",
            }}
          >
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

export default MuhuratSampatti;
