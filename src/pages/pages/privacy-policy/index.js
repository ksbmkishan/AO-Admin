import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import RichTextEditor from 'react-rte';
import { Color } from '../../../assets/colors';
import * as StaticPageActions from '../../../redux/actions/staticPageAction';

const PrivacyPolicy = () => {
    const dispatch = useDispatch();
    const { privacyPolicyData } = useSelector(state => state?.staticPageReducer);

    const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
    const [inputFieldError, setInputFieldError] = useState({ title: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    };

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;

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
            //! Dispatching API For Updating Privacy Policy
            const payload = {
                description: description?.toString('html')
            }

            dispatch(StaticPageActions.createPrivacyPolicy(payload));
        }
    };

    useEffect(() => {
        //! Dispatching API For Getting Privacy Policy
        dispatch(StaticPageActions.getPrivacyPolicy());
    }, [])

    useEffect(() => {
        setDescription(RichTextEditor.createValueFromString(String(privacyPolicyData), 'html'))
    }, [privacyPolicyData]);

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
            <div style={{ padding: "10px 0 30px 0", fontSize: "22px", fontWeight: "500", color: Color.black, }}>Privacy Policy</div>

            <Grid container spacing={3}>
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

export default PrivacyPolicy;