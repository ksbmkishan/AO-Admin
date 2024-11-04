import Select from 'react-select';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar, FormControl } from "@mui/material";
import { Color } from "../../../assets/colors";
import { UploadImageSvg } from "../../../assets/svg";
import * as CustomerActions from "../../../redux/actions/customerAction";
import * as AstrologerActions from "../../../redux/actions/astrologerAction";
import * as NotificationActions from "../../../redux/actions/notificationActions";

const AddNotification = ({ type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologerData } = useSelector(state => state?.astrologerReducer);
    const { customerData } = useSelector(state => state?.customerReducer);

    const [notificationDetail, setNotificationDetail] = useState({ title: '', description: '', });
    let multiPageOptions;
    if (type == 'Customer') {
        multiPageOptions = customerData && [{ value: 'all', label: 'Select All' }, ...customerData?.map(item => ({ value: item?._id, label: item?.customerName ? item?.customerName : null }))]; //! multi-Page Option
    } else {
        multiPageOptions = astrologerData && [{ value: 'all', label: 'Select All' }, ...astrologerData?.map(item => ({ value: item?._id, label: item?.astrologerName ? item?.astrologerName : null }))]; //! multi-Page Option
    }
    const [multiPage, setMultiPage] = useState([]);

    const [inputFieldError, setInputFieldError] = useState({ title: '', multiPage: '' });
    const [image, setImage] = useState({ file: '', bytes: '' });

    //* Handle Input Field : Error
    const handleInputFieldError = (input, value) => {
        setInputFieldError((prev) => ({ ...prev, [input]: value }))
    }

    //* Handle Input Field : Data
    const handleInputField = (e) => {
        const { name, value } = e.target;
        setNotificationDetail({ ...notificationDetail, [name]: value });
    };

    //* Handle multi Page Option 
    const handleChangeMultiPageOption = (selectedItems) => {
        console.log("Selected Items :: ", selectedItems)
        if (selectedItems?.some(item => item?.value === 'all')) {
            if (type === 'Customer') {
                setMultiPage(customerData?.map(item => item?._id));
            } else {
                setMultiPage(astrologerData?.map(item => item?._id));
            }
        } else {
            const selectedIds = selectedItems && selectedItems?.map(item => item?.value !== 'all' ? item?.value : null)?.filter(Boolean);
            setMultiPage(selectedIds);
        }
    };

    //! Handle Image : Normally
    const handleImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }

        handleInputFieldError("image", null)
    };

    //! Handle Image : Drop Feature
    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setImage({
                file: URL.createObjectURL(e.dataTransfer.files[0]),
                bytes: e.dataTransfer.files[0],
            });
        }

        handleInputFieldError("image", null)
    };

    //! Handle Validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = notificationDetail;
        console.log("multiPage.length ", multiPage.length)
        if (!title) {
            handleInputFieldError("title", "Please Enter Title")
            isValid = false;
        }
        if ((title.toString().length > 50)) {
            handleInputFieldError("title", "Please Enter Title Less Than 50 Character")
            isValid = false;
        }
        if (multiPage.length <= 0) {
            handleInputFieldError("multiPage", "Please Select At Least One User")
            isValid = false;
        }

        return isValid;
    };

    //! Handle Submit - Creating Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Notification Data :: ", { ...notificationDetail, multiPage, image })
        const { title, description } = notificationDetail;

        if (handleValidation()) {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image?.bytes);
            formData.append("redirectTo", "Redirect");

            // Append each item in the multiPage array with a unique key
            multiPage.forEach((id, index) => {
                if (type == 'Customer') {
                    formData.append(`customerIds[${index}]`, id);
                } else {
                    formData.append(`astrologerIds[${index}]`, id);
                }
            });

            const payload = {
                data: formData,
                onComplete: () => {
                    if (type == 'Customer') {
                        navigate("/customer-notification");
                    } else {
                        navigate("/astrologer-notification");
                    }
                }
            };

            //! Dispatching API for Creating Notification
            if (type == 'Customer') {
                dispatch(NotificationActions.sendCustomerNotification(payload));
            } else {
                dispatch(NotificationActions.sendAstrologerNotification(payload));
            }
        }
    };

    useEffect(function () {
        //! Dispatching API for Get Customer 
        dispatch(CustomerActions.getCustomer());

        //! Dispatching API for Get Astrologer 
        dispatch(AstrologerActions.getAstrologer());
    }, []);

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>Send Notification</div>
                    <div onClick={() => navigate(`${type === 'Customer' ? "/customer-notification" : "/astrologer-notification"}`)} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
                </div>

                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} sm={12} md={12} xs={12} >
                        <div style={{ color: "#000", border: "1px solid #C4C4C4", borderRadius: "3px" }}>
                            {image?.file ?
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", cursor: "pointer" }}>
                                    <Avatar src={image.file} style={{ height: '300px', width: "300px", borderRadius: "initial" }} />
                                </label>
                                :
                                <label onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} htmlFor="upload-image" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", padding: "100px 0", cursor: "pointer" }}>
                                    <UploadImageSvg h="80" w="80" color="#C4C4C4" />
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Image to Upload</div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop a Image Here</div>
                                </label>}
                            <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                        </div>
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.image}</div>}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={notificationDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label="Description" variant='outlined' fullWidth
                            name='description'
                            value={notificationDetail?.description}
                            onChange={handleInputField}
                            error={inputFieldError.description ? true : false}
                            helperText={inputFieldError.description}
                            onFocus={() => handleInputFieldError("description", null)}
                        />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <Select
                                isMulti
                                options={multiPageOptions}
                                value={multiPageOptions?.filter(option => multiPage.includes(option.value))}
                                onChange={handleChangeMultiPageOption}
                                styles={{
                                    control: (base, state) => ({ ...base, minHeight: "45px", maxHeight: "150px", fontSize: "14px", overflow: "scroll" }),
                                    option: (base) => ({ ...base, fontSize: '12px', padding: '5px 10px', }),
                                    menu: (base) => ({ ...base, fontSize: '12px', }),
                                    clearIndicator: (base) => ({ ...base, alignSelf: 'flex-start', padding: '10px 2px 0 0', cursor: 'pointer', }),
                                }}
                                onFocus={() => handleInputFieldError("multiPage", null)}
                            />
                        </FormControl>
                        {inputFieldError?.multiPage && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.multiPage}</div>}
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

export default AddNotification;