import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Grid, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup } from "@mui/material";
import RichTextEditor from "react-rte";
import { Color } from "../../../assets/colors";
import * as PanchangActions from "../../../redux/actions/panchangActions";

const Panchang = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { panchang } = useSelector((state) => state.panchangReducer);

  const [lang, setLang] = useState("en"); // 🌐 language toggle

  const [inputFieldDetail, setInputFieldDetail] = useState({
    description: RichTextEditor.createEmptyValue(),
    year: "2025",
  });

  const [inputFieldError, setInputFieldError] = useState({
    description: "",
    year: "",
  });

  // Initial fetch
  useEffect(() => {
    dispatch(PanchangActions.getPanchang({ year: 2025, lang }));
  }, [dispatch, lang]);

  // Sync redux → local state
  useEffect(() => {
    if (panchang) {
      setInputFieldDetail((prev) => ({
        description: panchang.description
          ? RichTextEditor.createValueFromString(panchang.description, "html")
          : RichTextEditor.createEmptyValue(),
        year: panchang.year?.toString() || prev?.year,
      }));
    }
  }, [panchang]);

  const handleInputFieldError = (input, value) =>
    setInputFieldError((prev) => ({ ...prev, [input]: value }));

  const handleInputField = (e) => {
    const { value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, year: value }));
    dispatch(PanchangActions.getPanchang({ year: Number(value), lang }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, year } = inputFieldDetail;

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
    if (panchang?._id) {
      formData.append("id", panchang._id);
    }
    formData.append("description", description.toString("html"));
    formData.append("year", year);
    formData.append("lang", lang); // ✅ language info भेजा

    dispatch(
      PanchangActions.onPanchang({
        data: formData,
        onComplete: () => navigate("/admin/panchang/monthly"),
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
      <Grid item xs={12} style={{ marginBottom: "20px" }}>
        <ToggleButtonGroup
          value={lang}
          exclusive
          onChange={(e, newLang) => newLang && setLang(newLang)}
        >
          <ToggleButton value="en">English</ToggleButton>
          <ToggleButton value="hi">हिन्दी</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

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
          Description ({lang === "en" ? "English" : "हिन्दी"}){" "}
          <span style={{ color: "red" }}>*</span>
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

export default Panchang;
