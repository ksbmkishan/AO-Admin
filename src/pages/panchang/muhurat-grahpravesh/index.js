
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import RichTextEditor from "react-rte";
import { Color } from "../../../assets/colors";
import * as PanchangActions from "../../../redux/actions/panchangActions";

const MuhuratGrahPravesh = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { panchangGrahPravesh } = useSelector((state) => state.panchangReducer);

  const [inputFieldDetail, setInputFieldDetail] = useState({
    description: RichTextEditor.createEmptyValue(),
    year: "2025",
  });
  console.log(inputFieldDetail);
  const [inputFieldError, setInputFieldError] = useState({
    description: "",
    year: "",
  });

  // Initial fetch
  useEffect(() => {
    dispatch(PanchangActions.getPanchangGrahPravesh({ year: 2025 }));
  }, [dispatch]);

  // Sync redux → local state
useEffect(() => {
  if (panchangGrahPravesh) {
    setInputFieldDetail(prev => ({
      description: panchangGrahPravesh.description
        ? RichTextEditor.createValueFromString(panchangGrahPravesh.description, "html")
        : RichTextEditor.createEmptyValue(),
      year: panchangGrahPravesh.year?.toString() || prev?.year,
    }));
  }
}, [panchangGrahPravesh]);

  const handleInputFieldError = (input, value) =>
   
    setInputFieldError((prev) => ({ ...prev, [input]: value }));

  const handleInputField = (e) => {
    const { value } = e.target;
    setInputFieldDetail((prev) => ({ ...prev, year: value }));

    dispatch(PanchangActions.getPanchangGrahPravesh({ year: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, year } = inputFieldDetail;

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
    if (panchangGrahPravesh?._id) {
      formData.append("id", panchangGrahPravesh._id);
    }
    formData.append("description", description.toString("html"));
    formData.append("year", year);

    dispatch(
      PanchangActions.onPanchangGrahPravesh({
        data: formData,
        onComplete: () => navigate("/admin/panchang/muhurat-grah-pravesh"),
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

export default MuhuratGrahPravesh;
