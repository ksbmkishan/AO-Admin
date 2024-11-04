import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Color } from "../../../assets/colors";
import RichTextEditor from 'react-rte';
import * as PagesActions from "../../../redux/actions/pagesActions.js";

const AddAnnouncement = ({ mode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const dispatch = useDispatch();

    const [description, setDescription] = useState(stateData ? RichTextEditor.createValueFromString(stateData?.description, 'html') : RichTextEditor.createEmptyValue());
    const [inputFieldError, setInputFieldError] = useState({ title: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //! Handle validation
    const handleValidation = () => {
        let isValid = true;

        if (description?.toString('html') == "<p><br></p>") {
            handleInputFieldError("description", "Please Enter Description")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ description: description?.toString('html') })

        if (handleValidation()) {
            if (stateData) {
                const payload = {
                    data: { announcementId: stateData?._id, description: description?.toString('html') },
                    onComplete: () => navigate("/announcement")
                }

                //! Dispatching API for Creating Announcement
                dispatch(PagesActions.updateAnnouncement(payload))

            } else {
                const payload = {
                    data: { description: description?.toString('html') },
                    onComplete: () => navigate("/announcement")
                }

                //! Dispatching API for Creating Announcement
                dispatch(PagesActions.addAnnouncement(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Announcement</div>
                    <div onClick={() => navigate("/announcement")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
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
        </>
    );
};

export default AddAnnouncement;