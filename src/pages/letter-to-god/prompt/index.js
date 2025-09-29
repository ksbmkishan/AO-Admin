import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, MenuItem, Select, FormControl, InputLabel, Tabs, Tab, Box } from "@mui/material";
import RichTextEditor from "react-rte";
import { Color } from "../../../assets/colors";
import * as LetterToGodActions from "../../../redux/actions/lettertogodActions";

const Prompt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { letterPrompt } = useSelector((state) => state.letterToGodReducer);
  
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "hi-en", name: "Hinglish" },
  ];

  const [inputFieldDetail, setInputFieldDetail] = useState({
    descriptions: {
      en: RichTextEditor.createEmptyValue(),
      hi: RichTextEditor.createEmptyValue(),
      "hi-en": RichTextEditor.createEmptyValue(),
    },
    language: "en", // Default language
  });
  
  const [inputFieldError, setInputFieldError] = useState({
    description: "",
    language: "",
  });

  const [currentTab, setCurrentTab] = useState(0);

  // Initial fetch
  useEffect(() => {
    dispatch(LetterToGodActions.getUpdatePrompt({}));
  }, [dispatch]);

  //! Handle Input Field : Error
  const handleInputFieldError = (input, value) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }));
  };

  // Sync redux → local state
  useEffect(() => {
  console.log('letterPrompt: ', letterPrompt);
  
  if (letterPrompt && Array.isArray(letterPrompt)) {
    const updatedDescriptions = {
      en: RichTextEditor.createEmptyValue(),
      hi: RichTextEditor.createEmptyValue(),
      "hi-en": RichTextEditor.createEmptyValue(),
    };

    // Process each prompt in the array
    letterPrompt.forEach(prompt => {
      if (prompt.description && languages.some(lang => lang.code === prompt.language)) {
        updatedDescriptions[prompt.language] = RichTextEditor.createValueFromString(
          prompt.description,
          "html"
        );
      }
    });

    console.log('updated Descriptions: ', updatedDescriptions);
    
    // Set the first language as default or keep current selection
    const defaultLanguage = letterPrompt[0]?.language || "en";
    
    setInputFieldDetail((prev) => ({
      ...prev,
      descriptions: updatedDescriptions,
      language: prev.language || defaultLanguage,
    }));

    // Set the active tab based on the first language
    const defaultTabIndex = languages.findIndex(lang => lang.code === defaultLanguage);
    if (defaultTabIndex !== -1) {
      setCurrentTab(defaultTabIndex);
    }
  }
}, [letterPrompt]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    const selectedLanguage = languages[newValue].code;
    setInputFieldDetail(prev => ({ ...prev, language: selectedLanguage }));
  };

  const handleDescriptionChange = (value) => {
    const currentLanguage = languages[currentTab].code;
    setInputFieldDetail(prev => ({
      ...prev,
      descriptions: {
        ...prev.descriptions,
        [currentLanguage]: value
      }
    }));
    handleInputFieldError("description", null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { descriptions, language } = inputFieldDetail;

    // Validate current language description
    const currentDescription = descriptions[language];
    if (!currentDescription || !currentDescription.toString("html").trim()) {
      setInputFieldError((prev) => ({
        ...prev,
        description: "Description is required for the selected language",
      }));
      return;
    }

    if (!language) {
      setInputFieldError((prev) => ({
        ...prev,
        language: "Language is required",
      }));
      return;
    }

    const formData = new FormData();
    if (letterPrompt?._id) {
      formData.append("id", letterPrompt._id);
    }
    
    // Add only the current language description to formData (without language code prefix)
    formData.append("description", descriptions[language].toString("html"));
    formData.append("language", language);

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
      {/* Language Tabs */}
      <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: "20px" }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            {languages.map((lang, index) => (
              <Tab key={lang.code} label={lang.name} />
            ))}
          </Tabs>
        </Box>
      </Grid>

      {/* Description for current language */}
      <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: "20px" }}>
        <label>
          Description ({languages[currentTab].name}) <span style={{ color: "red" }}>*</span>
        </label>
        <RichTextEditor
          value={inputFieldDetail.descriptions[languages[currentTab].code]}
          onChange={handleDescriptionChange}
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