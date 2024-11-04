import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import RichTextEditor from 'react-rte';
import { Color } from '../../../assets/colors';
import * as StaticPageActions from '../../../redux/actions/staticPageAction';

const TermsAndConditions = () => {
  const dispatch = useDispatch();
  const { termsAndConditionData } = useSelector(state => state?.staticPageReducer);

  const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
  const [type, setType] = useState('Astrologer');
  const [inputFieldError, setInputFieldError] = useState({ title: '' });

  //* Handle Input Field : Error
  const handleInputFieldError = (input, value) => {
    setInputFieldError((prev) => ({ ...prev, [input]: value }))
  };

  //! Handle Validation
  const handleValidation = () => {
    let isValid = true;

    if (!type) {
      handleInputFieldError("type", "Please Select type")
      isValid = false;
    }
    if (description?.toString('html') == "<p><br></p>") {
      handleInputFieldError("description", "Please Enter Description")
      isValid = false;
    }

    return isValid;
  };

  //! Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ description: description?.toString('html') })
    if (handleValidation()) {
      //! Dispatching API For Updating TermsAndConditions
      const payload = {
        type,
        description: description?.toString('html')
      }

      dispatch(StaticPageActions.createTermsAndCondition(payload));
    }
  };

  useEffect(() => {
    //! Dispatching API For Getting TermsAndConditions
    dispatch(StaticPageActions.getTermsAndCondition({ type }));
  }, [type])

  useEffect(() => {
    setDescription(RichTextEditor.createValueFromString(String(termsAndConditionData), 'html'))
  }, [termsAndConditionData]);

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
      <div style={{ padding: "10px 0 30px 0", fontSize: "22px", fontWeight: "500", color: Color.black, }}>Terms And Conditions</div>

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12} >
          <FormControl fullWidth>
            <InputLabel id="select-label">Select Type <span style={{ color: "red" }}>*</span></InputLabel>
            <Select
              label="Select Type *" variant="outlined" fullWidth
              name='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
              error={inputFieldError?.type ? true : false}
              onFocus={() => handleInputFieldError("type", null)}
            >
              <MenuItem disabled>---Select Type---</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Astrologer">Astrologer</MenuItem>
            </Select>
          </FormControl>
          {inputFieldError?.type && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.type}</div>}
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            editorStyle={{ minHeight: '50vh', }}
            onFocus={() => handleInputFieldError("description", null)}
          />
          {inputFieldError?.description && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "400" }}>{inputFieldError?.description}</div>}
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}

export default TermsAndConditions;