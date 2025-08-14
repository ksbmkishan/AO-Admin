import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import RichTextEditor from 'react-rte';
import { Color } from "../../../assets/colors";
import * as PanchangActions from "../../../redux/actions/panchangActions";

const MuhuratGrahPravesh = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { panchangGrahPravesh } = useSelector(state => state.panchangReducer);

    console.log("Panchang Grah Pravesh Data:", panchangGrahPravesh?.description);

    const [inputFieldDetail, setInputFieldDetail] = useState({
        description: panchangGrahPravesh?.description ? RichTextEditor.createValueFromString(panchangGrahPravesh?.description, 'html') : RichTextEditor.createEmptyValue(),
    });

    const [inputFieldError, setInputFieldError] = useState({
        description: '',
    });

    useEffect(() => {
        dispatch(PanchangActions.getPanchangGrahPravesh())
    }, []);

    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { description } = inputFieldDetail;

        let formData = new FormData();
        // formData.append("id", panchang?._id);
        formData.append("description", description?.toString('html'));

        const payload = {
            data: formData,
            onComplete: () => navigate("/admin/panchang/muhurat-grah-pravesh")
        }
        //! Dispatching API for Updating Darshan
        dispatch(PanchangActions.onPanchangGrahPravesh(payload))

    };


    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px", alignItems: 'center', marginBottom: "20px", backgroundColor: "#fff" }}>
            </div>


            <Grid item lg={12} md={12} sm={12} xs={12}>
                <label>
                    Description <span style={{ color: "red" }}>*</span>
                </label>

                <RichTextEditor
                    value={inputFieldDetail?.description}
                    onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, description: value })}
                    editorStyle={{ minHeight: '50vh', }}
                    onFocus={() => handleInputFieldError("description", null)}
                />
                {/* Optionally, display error */}
                {inputFieldError.description && (
                    <span style={{ color: "red" }}>
                        {inputFieldError.description}
                    </span>
                )}
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container sx={{ justifyContent: "space-between" }}>
                    <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                </Grid>
            </Grid>
        </div>
    );
}

export default MuhuratGrahPravesh;