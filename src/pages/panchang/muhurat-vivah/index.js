import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import RichTextEditor from "react-rte";
import { Color } from "../../../assets/colors";
import * as PanchangActions from "../../../redux/actions/panchangActions";

const MuhuratVivah = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { panchangVivah } = useSelector((state) => state.panchangReducer);

  const [inputFieldDetail, setInputFieldDetail] = useState({
    description: RichTextEditor.createEmptyValue(),
    year: "2025",
    lang: "en",
  });

  const [inputFieldError, setInputFieldError] = useState({
    description: "",
    year: "",
    lang: "",
  });

  // Initial fetch
  useEffect(() => {
    dispatch(
      PanchangActions.getPanchangVivah({
        year: 2025,
        lang: inputFieldDetail?.lang,
      })
    );
  }, [dispatch]);

  // Sync redux → local state
  useEffect(() => {
    if (panchangVivah) {
      setInputFieldDetail((prev) => ({
        description: panchangVivah.description
          ? RichTextEditor.createValueFromString(
              panchangVivah.description,
              "html"
            )
          : RichTextEditor.createEmptyValue(),
        year: panchangVivah.year?.toString() || prev?.year,
        lang: panchangVivah.lang || prev?.lang,
      }));
    }
  }, [panchangVivah]);

  const handleInputFieldError = (input, value) =>
    setInputFieldError((prev) => ({ ...prev, [input]: value }));

  const handleInputField = (e) => {
    const { value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, year: value }));

    dispatch(
      PanchangActions.getPanchangVivah({
        year: Number(value),
        lang: inputFieldDetail.lang,
      })
    );
  };

  const handleLangChange = (lang) => {
    setInputFieldDetail((prev) => ({ ...prev, lang }));
    dispatch(
      PanchangActions.getPanchangVivah({
        year: Number(inputFieldDetail.year),
        lang,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, year, lang } = inputFieldDetail;

    // simple validation
    if (!year) {
      setInputFieldError((prev) => ({ ...prev, year: "Year is required" }));
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
    if (panchangVivah?._id) {
      formData.append("id", panchangVivah._id);
    }
    formData.append("description", description.toString("html"));
    formData.append("year", year);
    formData.append("lang", lang);

    dispatch(
      PanchangActions.onPanchangVivah({
        data: formData,
        onComplete: () => navigate("/admin/panchang/muhurat-vivah"),
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
      {/* Language Toggle */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["en", "hi"].map((lang) => (
          <button
            key={lang}
            onClick={() => handleLangChange(lang)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid lightgrey",
              cursor: "pointer",
              fontWeight: "500",
              backgroundColor:
                inputFieldDetail.lang === lang ? Color.primary : "#f9f9f9",
              color: inputFieldDetail.lang === lang ? "#fff" : "#333",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              if (inputFieldDetail.lang !== lang) {
                e.target.style.backgroundColor = "#e0e0e0";
              }
            }}
            onMouseLeave={(e) => {
              if (inputFieldDetail.lang !== lang) {
                e.target.style.backgroundColor = "#f9f9f9";
              }
            }}
          >
            {lang === "en" ? "English" : "हिंदी"}
          </button>
        ))}
      </div>

      {/* Year */}
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Select Year</InputLabel>
          <Select
            label="Select Year"
            variant="outlined"
            fullWidth
            name="year"
            value={inputFieldDetail.year}
            onChange={handleInputField}
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

export default MuhuratVivah;
