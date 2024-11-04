import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import { Color } from "../../../assets/colors";
import * as AstrologerActions from "../../../redux/actions/astrologerAction";
import * as CustomerActions from "../../../redux/actions/customerAction";
import * as ReviewActions from "../../../redux/actions/reviewsActions";
import { Regex_Accept_Alpha } from "../../../utils/regex-pattern";

const AddReview = ({ mode, dispatch, astrologerListData, customerListData }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    console.log("State Data ::: ", stateData);

    const [reviewDetail, setReviewDetail] = useState({ customer: stateData ? stateData?.customer?._id : '', astrologer: stateData ? stateData?.astrologer?._id : '', rating: stateData ? stateData?.ratings : '', comment: stateData ? stateData?.comments : '' });
    const [inputFieldError, setInputFieldError] = useState({ customer: '', astrologer: '', rating: '', comment: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))

    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setReviewDetail({ ...reviewDetail, [name]: value });
        if (name === 'rating') {
            if (value < 1 || value > 5) {
                setInputFieldError({ ...inputFieldError, rating: 'Rating must be 1 to 5' });
            } else {
                setInputFieldError({ ...inputFieldError, rating: '' });
                setReviewDetail({ ...reviewDetail, [name]: value });
            }
        } else {
            setReviewDetail({ ...reviewDetail, [name]: value });
        }

    };

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { astrologer, customer, rating, comment } = reviewDetail;
        if (!astrologer) {
            handleInputFieldError("astrologer", "Please Select Astrologer Name")
            isValid = false;
        }
        if (!customer) {
            handleInputFieldError("customer", "Please Select Customer Name")
            isValid = false;
        }
        if (!rating) {
            handleInputFieldError("rating", "Please Enter Rating")
            isValid = false;
        }
        // if (!comment) {
        //     handleInputFieldError("comment", "Please Enter Comment")
        //     isValid = false;
        // }
        if (!Regex_Accept_Alpha.test(comment)) {
            handleInputFieldError("comment", "Please Enter Valid Comment")

            isValid = false;
        }
        return isValid;
    };

    //! Handle Submit - Creating Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("Review Data :: ", { ...reviewDetail })
            const { astrologer, customer, rating, comment, reviewId } = reviewDetail;

            if (handleValidation()) {
                if (stateData) {
                    // let formData = new FormData();
                    // formData.append("astrologerId", astrologer);
                    // formData.append("customerId", customer);
                    // formData.append("ratings", rating);
                    // formData.append("comments", comment);
                    // formData.append("reviewId", stateData._id);

                    const data = {
                        "ratings": rating,
                        "comments": comment,
                        "reviewId": stateData._id,
                    }

                    const payload = {
                        data: data,
                        onComplete: () => navigate("/review")
                    }

                    //! Dispatching API for update Astro Blog  
                    console.log(payload);
                    dispatch(ReviewActions.updateAstrologerReivew(payload))

                } else {
                    let formData = new FormData();
                    formData.append("astrologerId", astrologer);
                    formData.append("customerId", customer);
                    formData.append("ratings", rating);
                    formData.append("comments", comment);


                    const payload = {
                        data: formData,
                        onComplete: () => navigate("/review")
                    }

                    //! Dispatching API for add Astro Blog  
                    console.log(payload);
                    dispatch(ReviewActions.addAstrologersReviews(payload))
                }
            }
        };
    };

    useEffect(() => {
        //! Dispatching API for Getting Customer
        dispatch(CustomerActions.getCustomer());

        //! Dispatching API for Getting Astrologer
        dispatch(AstrologerActions.getAstrologer());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Review</div>
                    <div onClick={() => navigate("/review")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Astrologer <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                label="Select Astrologer * " variant="outlined"
                                name='astrologer' disabled={stateData && Object.keys(stateData).length > 0}
                                value={reviewDetail?.astrologer}
                                onChange={handleInputField}
                                error={inputFieldError.astrologer ? true : false}
                                onFocus={() => handleInputFieldError("astrologer", null)}
                            >
                                <MenuItem value="-Select Astrologer-" disabled>-Select Astrologer-</MenuItem>
                                {astrologerListData && astrologerListData.length > 0 && astrologerListData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item._id}>{item?.astrologerName}</MenuItem>
                                    )
                                })}

                            </Select>
                            {inputFieldError?.astrologer && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.astrologer}</div>}
                        </FormControl>
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Customer <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                label="Select Customer * " variant="outlined"
                                name='customer' disabled={stateData && Object.keys(stateData).length > 0}
                                value={reviewDetail?.customer}
                                onChange={handleInputField}
                                error={inputFieldError.customer ? true : false}
                                onFocus={() => handleInputFieldError("customer", null)}
                            >
                                <MenuItem value="-Select Astrologer-" disabled>-Select Customer-</MenuItem>
                                {customerListData && customerListData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item._id}>{item?.customerName}</MenuItem>
                                    )
                                })}
                            </Select>
                            {inputFieldError?.customer && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.customer}</div>}
                        </FormControl>
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <TextField
                            label={<>Rating <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='rating' type="number"
                            value={reviewDetail?.rating}
                            onChange={handleInputField}
                            error={inputFieldError.rating ? true : false}
                            helperText={inputFieldError.rating}
                            onFocus={() => handleInputFieldError("rating", null)}
                            inputProps={{ min: 1, max: 5 }}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Comment</>} variant='outlined' fullWidth
                            multiline
                            rows={4}
                            name='comment'
                            value={reviewDetail?.comment}
                            onChange={handleInputField}
                            error={inputFieldError.comment ? true : false}
                            helperText={inputFieldError.comment}
                            onFocus={() => handleInputFieldError("comment", null)}
                        />
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


const mapStateToProps = (state) => ({
    astrologerListData: state.astrologerReducer.astrologerData,
    customerListData: state.customerReducer.customerData,
    astrologersReviews: state.review.astrologersReviews,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);