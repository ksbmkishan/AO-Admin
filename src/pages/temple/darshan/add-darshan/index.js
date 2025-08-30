
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Avatar, FormControl, InputLabel, Select, MenuItem, DialogContent, Dialog, Slider } from "@mui/material";
import { Color } from "../../../../assets/colors";
import { base_url, img_url } from "../../../../utils/api-routes";
import { CrossSvg, UploadImageSvg } from "../../../../assets/svg";
import { Regex_Accept_Alpha_Dot_Comma_Space } from "../../../../utils/regex-pattern";
import * as TempleActions from '../../../../redux/actions/templeAction';
import { api_urls } from "../../../../utils/api-urls";
import 'react-quill/dist/quill.snow.css';
import RichTextEditor from 'react-rte';
import Moveable from "react-moveable";
import { Rnd } from "react-rnd"
import { usePhotoEditor } from 'react-photo-editor';

const AddDarshan = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stateData = location.state && location.state.stateData;
    const id = location.state && location.state.stateData?._id
    // console.log("State Data ::: ", stateData);

    const [inputFieldDetail, setInputFieldDetail] = useState({
        title: stateData ? stateData?.title : '',
        temple: stateData ? stateData?.temple : '',
        description: stateData ? RichTextEditor.createValueFromString(stateData?.description, 'html') : RichTextEditor.createEmptyValue(),
        aarti: stateData ? stateData?.aarti : '',
        aartilyrics: stateData ? RichTextEditor.createValueFromString(stateData?.aartilyrics, 'html') : RichTextEditor.createEmptyValue(),
        chalisa: stateData ? stateData?.chalisa : '',
        chalisalyrics: stateData ? RichTextEditor.createValueFromString(stateData?.chalisalyrics, 'html') : RichTextEditor.createEmptyValue(),
        mantralink: stateData ? stateData?.mantralink : '',
        mantralyrics: stateData ? RichTextEditor.createValueFromString(stateData?.mantralyrics, 'html') : RichTextEditor.createEmptyValue(),
        bhajan: stateData ? stateData?.bhajan : '',
        bhjanlyrics: stateData ? RichTextEditor.createValueFromString(stateData?.bhjanlyrics, 'html') : RichTextEditor.createEmptyValue(),
        vr_mode: stateData?.vr_mode?.length ? stateData.vr_mode.map(vr => ({
            vr_title: vr.vr_title || "",
            vr_image: base_url + vr.vr_image || null,
            vr_image_file: null,
            tags: Array.isArray(vr.tags) ? vr.tags.join(",") : vr.tags || "",
            vr_type: vr.vr_type || "VR",
            vr_visible_puja: vr.vr_visible_puja || 0,
            vr_darshan_fake_user: vr.vr_darshan_fake_user || 0,
        })) : [
            {
                vr_title: "",
                vr_image: null,
                vr_image_file: null,
                tags: "",
                vr_type: "VR",
                vr_visible_puja:  0,
                vr_darshan_fake_user: 0,
            }
        ],
        temple_vr_darshan: {
            price: stateData?.temple_vr_darshan?.price ?? "",
            type: stateData?.temple_vr_darshan?.type || "Deduct",
        }
    });
    const [inputFieldError, setInputFieldError] = useState({
        image: '', temple: '', title: '', description: '', bulkImage: '', bulkVideo: '',
        aarti: '', aartilyrics: '', chalisa: '', chalisalyrics: '', mantralink: '', mantralyrics: '', bhajan: '', bhjanlyrics: ''
    });
    const [image, setImage] = useState({ file: stateData ? api_urls + stateData?.image : '', bytes: '' });
    const [bulkImage, setBulkImage] = useState(stateData ? stateData?.bulkImageOnly && stateData?.bulkImageOnly?.map(value => ({ file: base_url + value })) : []);
    const [bulkVideo, setbulkVideo] = useState(stateData ? stateData?.
        bulkVideoUpload.map(value => ({ file: base_url + value })) : []);

    const [modal, setModal] = useState(false);
    const [modalVideo, setModalVideo] = useState(false);
    const [imageView, setImageView] = useState(null);
    const [imageViewVideo, setImageViewVideo] = useState(null);
    // console.log('bulkImage :: ', bulkImage);

    const handleInputField = (e) => setInputFieldDetail({ ...inputFieldDetail, [e?.target?.name]: e?.target?.value });  //* Handle Input Field : Data
    const handleInputFieldError = (input, value) => setInputFieldError((prev) => ({ ...prev, [input]: value })); //* Handle Input Field : Error
    console.log('inputFieldDetail. ',inputFieldDetail)
    //     // VR Mode Handlers
    const handleVRChange = (index, field, value) => {
        const updatedVR = [...inputFieldDetail.vr_mode];
        if (field === "vr_image") {
            updatedVR[index].vr_image_file = value;
            updatedVR[index].vr_image = URL.createObjectURL(value);
        } else if (field === "tags") {
            updatedVR[index][field] = value; // comma separated string
        } else {
            updatedVR[index][field] = value;
        }
        setInputFieldDetail(prev => ({ ...prev, vr_mode: updatedVR }));
    };

    const addVRMode = () => {
        setInputFieldDetail(prev => ({
            ...prev,
            vr_mode: [...prev.vr_mode, { vr_title: "", vr_image: null, vr_image_file: null, tags: "", vr_type: "VR", vr_darshan_fake_user: 0 }],
        }));
    };

    const removeVRMode = (index) => {
        const updatedVR = [...inputFieldDetail.vr_mode];
        updatedVR.splice(index, 1);
        setInputFieldDetail(prev => ({ ...prev, vr_mode: updatedVR }));
    };

    // Temple VR Darshan handler
    const handleTempleVRDarshan = (field, value) => {
        setInputFieldDetail(prev => ({
            ...prev,
            temple_vr_darshan: {
                ...prev.temple_vr_darshan,
                [field]: value,
            }
        }));
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


    //! Handle Bulk Video 
    const handlebulkVideo = (event) => {

        const selectedFiles = event.target.files;

        console.log("Selected files: ", selectedFiles);

        // if (bulkVideo?.length >= 5) {
        //     alert('Please select less than 5 files');
        //     return;
        // }

        if (selectedFiles && selectedFiles.length > 0) {
            const updatedVideo = Array.from(selectedFiles).map(file => ({
                file: URL.createObjectURL(file),
                bytes: file
            }));

            // अगर आप नई images को पुराने के साथ जोड़ना चाहते हैं:
            setbulkVideo((prev) => [...prev, ...updatedVideo]);

            // अगर आप नई images को पुराने पर ओवरराइड करना चाहते हैं:
            // setBulkImage(updatedImage);
        }
    };


    //! Handle validation
    const handleValidation = () => {
        let isValid = true;
        const { title } = inputFieldDetail;
        const { file } = image;

        if (!title) {
            handleInputFieldError("title", "Please Enter Title")
            isValid = false;
        }
        if (!Regex_Accept_Alpha_Dot_Comma_Space.test(title)) {
            handleInputFieldError("title", "Please Enter Valid Title")
            isValid = false;
        }
        if (title.toString().length > 70) {
            handleInputFieldError("title", "Please Enter Title Less Than 70 Letter")
            isValid = false;
        }
        if (!file) {
            handleInputFieldError("image", "Please Upload Image")
            isValid = false;
        }

        return isValid;
    };

    const handleImageDelete = (data) => {
        console.log('data ', data);
        const payload = {
            data: {
                id: stateData?._id,
                image: data
            },
            onComplete: () => console.log('test')
        }

        dispatch(TempleActions.deleteTempleImage(payload))
    }

    const handleVideoDelete = (data) => {
        console.log('video file ', data);
        const payload = {
            data: {
                id: stateData?._id,
                video: data
            },
            onComplete: () => console.log('test')
        }

        dispatch(TempleActions.deleteTempleVideo(payload))
    }

    const handleModalClose = () => {
        setModal(false);
        setImageView();
    }

    const handleModalOpen = (data) => {
        setModal(true);
        setImageView(data);
    }

    const handleModalVideoClose = () => {
        setModalVideo(false);
        setImageViewVideo();
    }

    const handleModalVideoOpen = (data) => {
        console.log('data ', data);
        setModalVideo(true);
        setImageViewVideo(data);
    }

    // cropper
    const inputRef = useRef();
    const [imageUpload, setImageSrcUpload] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [modalOpen, setModalOpen] = useState(false);


    const [scale, setScale] = useState(1);
    const [edit, setEdit] = useState(false);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [file,setFile] = useState(null);

    useEffect(() => {
        setFile(imageUpload);
    },[imageUpload])

    const imgRef = useRef(null);

    const {
        canvasRef,
        imageSrc,
        brightness,
        setBrightness,
        contrast,
        setContrast,
        saturate,
        setSaturate,
        grayscale,
        setGrayscale,
        rotate,
        setRotate,
        flipHorizontal,
        setFlipHorizontal,
        flipVertical,
        setFlipVertical,
        zoom,
        setZoom,
        setMode,
        setLineColor,
        lineColor,
        setLineWidth,
        lineWidth,
        handlePointerDown,
        handlePointerUp,
        handlePointerMove,
        handleWheel,
        downloadImage,
        resetFilters,
    } = usePhotoEditor({ file });

    useEffect(() => {
        if (!imgRef.current) return;

        const img = imgRef.current;

        if (scale && imgRef.current) {
            console.log("Image Ref :: ", scale);
            setDimensions({
                width: img.offsetWidth * scale,
                height: img.offsetHeight * scale,
            });
        }
    }, [scale, imgRef.current]);


   const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageSrcUpload(file); // store file in state

    // Read file as Data URL
    const imageDataUrl = await readFile(file);

    const img = new Image();
    img.src = imageDataUrl;

    img.onload = () => {
        console.log("Image width:", img.width, "Image height:", img.height);

        setDimensions({
            width: img.width,
            height: img.height
        });

        const width = 1024;
        const height = 1024;
        const scaleX = width / img.width;
        const scaleY = height / img.height;
        console.log(scaleX,scaleY);
        setScale(scaleX - scaleY);
        setModalOpen(true);
    };

    // ✅ Reset input so same file can be selected again
    e.target.value = "";
};



    const handleModalImageClose = () => {
        setModalOpen(false);
        setImageSrcUpload(null);
        setCroppedAreaPixels(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
    };

    const handleEdit = () => {
        setEdit(!edit);
    }

    
    const handleSave = () => {
        if (!canvasRef.current) {
            alert("Canvas not ready");
            return;
        }

        const canvas = canvasRef.current;

        canvas.toBlob((blob) => {
            if (blob) {
                // You can use this blob to upload via FormData
                const file = new File([blob], 'transformed-image.png', { type: 'image/png' });

                console.log("Saved Blob File:", file);

                // For example, to preview it:
                const imageURL = URL.createObjectURL(file);
                const updatedImage = {
                    file: imageURL, // preview
                    bytes: file     // blob as File
                };
                setBulkImage(prev => [...prev, updatedImage]);
            }
        }, 'image/png', 10);
        setModalOpen(false);
        setImageSrcUpload(null);
    }


    //! Handle Submit - Creating Darshan
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Darshan Data :: ", { ...inputFieldDetail, image, bulkImage, bulkVideo })
        const { title, description, temple, aarti, aartilyrics, chalisa, chalisalyrics, mantralink, mantralyrics, bhajan, bhjanlyrics } = inputFieldDetail;

        console.log('Vr Mode ', inputFieldDetail.vr_mode)

        if (handleValidation()) {

            if (stateData) {
                let formData = new FormData();
                formData.append("id", stateData?._id);
                formData.append("temple", temple);
                formData.append("title", title);
                formData.append("description", description?.toString('html'));
                formData.append("aarti", aarti);
                formData.append("aartilyrics", aartilyrics?.toString('html'));
                formData.append("chalisa", chalisa);
                formData.append("chalisalyrics", chalisalyrics?.toString('html'));
                formData.append("mantralink", mantralink);
                formData.append("mantralyrics", mantralyrics?.toString('html'));
                formData.append("bhajan", bhajan);
                formData.append("bhjanlyrics", bhjanlyrics?.toString('html'));
                formData.append("image", image?.bytes);

                // Append VR mode images and data
                inputFieldDetail.vr_mode.forEach((vr, i) => {
                    formData.append(`vr_mode[${i}][vr_title]`, vr.vr_title);
                    formData.append(`vr_mode[${i}][tags]`, vr.tags);
                    formData.append(`vr_mode[${i}][vr_type]`, vr.vr_type);
                    formData.append(`vr_mode[${i}][vr_darshan_fake_user]`, vr.vr_darshan_fake_user);
                    formData.append(`vr_mode[${i}][vr_visible_puja]`, vr.vr_visible_puja);
                    if (vr.vr_image_file) {
                        formData.append(`vr_mode[${i}].vr_image`, vr.vr_image_file);
                    }
                });

                // Append temple_vr_darshan price and type
                formData.append("temple_vr_darshan[price]", inputFieldDetail.temple_vr_darshan.price);
                formData.append("temple_vr_darshan[type]", inputFieldDetail.temple_vr_darshan.type);

                bulkImage.forEach(image => { formData.append(`bulkImageUpload`, image?.bytes); });
                bulkVideo.forEach(video => { formData.append(`bulkVideoUpload`, video?.bytes); });


                const payload = {
                    data: formData,
                    onComplete: () => navigate("/temple/darshan")
                }

                console.log('payload :: ', payload);

                //! Dispatching API for Updating Darshan
                dispatch(TempleActions.createTempleDarshan(payload))

            } else {
                let formData = new FormData();
                formData.append("temple", temple);
                formData.append("title", title);
                formData.append("description", description?.toString('html'));
                formData.append("aarti", aarti);
                formData.append("aartilyrics", aartilyrics?.toString('html'));
                formData.append("chalisa", chalisa);
                formData.append("chalisalyrics", chalisalyrics?.toString('html'));
                formData.append("mantralink", mantralink);
                formData.append("mantralyrics", mantralyrics?.toString('html'));
                formData.append("bhajan", bhajan);
                formData.append("bhjanlyrics", bhjanlyrics?.toString('html'));
                formData.append("image", image?.bytes);
                bulkImage.forEach(image => { formData.append(`bulkImageUpload`, image?.bytes); });
                bulkVideo.forEach(video => { formData.append(`bulkVideoUpload`, video?.bytes); });

                //         // Append VR mode images and data
                inputFieldDetail.vr_mode.forEach((vr, i) => {
                    formData.append(`vr_mode[${i}][vr_title]`, vr.vr_title);
                    formData.append(`vr_mode[${i}][tags]`, vr.tags);
                    formData.append(`vr_mode[${i}][vr_type]`, vr.vr_type);
                    formData.append(`vr_mode[${i}][vr_darshan_fake_user]`, vr.vr_darshan_fake_user);
                     formData.append(`vr_mode[${i}][vr_visible_puja]`, vr.vr_visible_puja);
                    if (vr.vr_image_file) {
                        formData.append(`vr_mode[${i}].vr_image`, vr.vr_image_file);
                    }
                });

                // Append temple_vr_darshan price and type
                formData.append("temple_vr_darshan[price]", inputFieldDetail.temple_vr_darshan.price);
                formData.append("temple_vr_darshan[type]", inputFieldDetail.temple_vr_darshan.type);

                const payload = {
                    data: formData,
                    onComplete: () => navigate("/temple/darshan")
                }

                //! Dispatching API for Creating Darshan
                dispatch(TempleActions.createTempleDarshan(payload))
            }
        }
    };

    return (
        <>
            <div style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "20px", boxShadow: '0px 0px 5px lightgrey', borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", fontFamily: 'Philosopher', backgroundColor: "#fff" }}>
                    <div style={{ fontSize: "22px", fontWeight: "500", color: Color.black, }}>{mode} Darshan</div>
                    <div onClick={() => navigate("/temple/darshan")} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>Display</div>
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
                                    <div style={{ fontWeight: "600", fontSize: "18px" }}>Choose Your Image to Upload</div>
                                    <div style={{ fontWeight: "500", fontSize: "16px", color: 'grey' }}>Or Drop Your Image Here</div>
                                </label>}
                            <input id="upload-image" onChange={handleImage} hidden accept="image/*" type="file" />
                        </div>
                        {inputFieldError?.image && <div style={{ color: "#D32F2F", fontSize: "12.5px", padding: "10px 0 0 12px", }}>{inputFieldError?.image}</div>}
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Temple <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                label="Select Temple *" variant="outlined" fullWidth
                                name='temple'
                                value={inputFieldDetail?.temple}
                                onChange={handleInputField}
                                error={inputFieldError?.temple ? true : false}
                                onFocus={() => handleInputFieldError("temple", null)}
                            >
                                <MenuItem disabled>---Select Temple---</MenuItem>
                                <MenuItem value="Sanatan">Sanatan</MenuItem>
                                <MenuItem value="Navgrah">Navgrah</MenuItem>
                            </Select>
                        </FormControl>
                        {inputFieldError?.temple && <div style={{ color: "#D32F2F", fontSize: "13px", padding: "5px 15px 0 12px", fontWeight: "500" }}>{inputFieldError?.temple}</div>}
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12} >
                        <TextField
                            label={<>Title <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='title'
                            value={inputFieldDetail?.title}
                            onChange={handleInputField}
                            error={inputFieldError.title ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("title", null)}
                        />
                    </Grid>

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


                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkImage.length > 0 && bulkImage?.map((value, index) => (
                                <div key={index} style={{ position: "relative" }} onClick={() => handleModalOpen(value?.file)}>
                                    <Avatar src={value.file} style={{ height: '150px', width: "250px", borderRadius: "initial" }} />
                                    <div onClick={(e) => {
                                        e.stopPropagation();
                                        value?.bytes ?
                                            setBulkImage(bulkImage.filter((curr, currIndex) => currIndex !== index)) : handleImageDelete(value?.file)
                                    }} style={{ position: "absolute", top: '-13px', right: '-15px', cursor: "pointer" }}><CrossSvg /></div>
                                </div>
                            ))}
                        </div>

                        {/* <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "13px", color: "gray" }}>Upload More Images(Max File Count : 5)</div> */}
                        <label htmlFor="upload-bulk-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        {/* <input id="upload-bulk-image" multiple type="file" onChange={handleBulkImage} ref={inputRef} hidden /> */}
                        <input id="upload-bulk-image" multiple type="file" onChange={handleFileChange} ref={inputRef} hidden />


                    </Grid>



                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "space-evenly", marginBottom: "20px" }}>
                            {bulkVideo.length > 0 && bulkVideo.map((value, index) => {
                                return (
                                    <div key={index} style={{ position: "relative" }} >
                                        <video controls style={{ height: '200px', maxWidth: '300px' }}>
                                            {value?.file ?
                                                <source src={value?.file} /> :
                                                <source src={base_url + value} />}
                                        </video>
                                        <div
                                            onClick={() => {
                                                value?.file ?
                                                    handleVideoDelete(value?.file) : setbulkVideo(bulkVideo.filter((curr, currIndex) => currIndex !== index))
                                            }
                                            }
                                            style={{
                                                position: "absolute",
                                                top: '-13px',
                                                right: '-15px',
                                                cursor: "pointer"
                                            }}
                                        >
                                            <CrossSvg />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* <div style={{ textAlign: "center", marginBottom: "10px", fontSize: "13px", color: "gray" }}>Upload More GIF/Video</div> */}
                        <label htmlFor="upload-bulk-audio" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", cursor: "pointer", border: "1px solid #C4C4C4", borderRadius: "3.5px", padding: "5px 0", backgroundColor: "#F1F1F7" }}>
                            <UploadImageSvg h="25" w="25" color="#000" />
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Upload</div>
                        </label>
                        <input id="upload-bulk-audio" accept="video/*" type="file" onChange={handlebulkVideo} hidden />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField
                            label={<>Aarti Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='aarti'
                            value={inputFieldDetail?.aarti}
                            onChange={handleInputField}
                            error={inputFieldError.aarti ? true : false}
                            helperText={inputFieldError.title}
                            onFocus={() => handleInputFieldError("aarti", null)}
                        />
                    </Grid>



                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField
                            label={<>Chalisa Link<span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='chalisa'
                            value={inputFieldDetail?.chalisa}
                            onChange={handleInputField}
                            error={inputFieldError.chalisa ? true : false}
                            helperText={inputFieldError.chalisa}
                            onFocus={() => handleInputFieldError("chalisa", null)}
                        />
                    </Grid>



                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField
                            label={<>Mantra Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='mantralink'
                            value={inputFieldDetail?.mantralink}
                            onChange={handleInputField}
                            error={inputFieldError.mantralink ? true : false}
                            helperText={inputFieldError.mantralink}
                            onFocus={() => handleInputFieldError("mantralink", null)}
                        />
                    </Grid>



                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <TextField
                            label={<>Bhajan Link <span style={{ color: "red" }}>*</span></>} variant='outlined' fullWidth
                            name='bhajan'
                            value={inputFieldDetail?.bhajan}
                            onChange={handleInputField}
                            error={inputFieldError.bhajan ? true : false}
                            helperText={inputFieldError.bhajan}
                            onFocus={() => handleInputFieldError("bhajan", null)}
                        />
                    </Grid>



                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Aarti Lyrics <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.aartilyrics}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, aartilyrics: value })}
                            editorStyle={{ minHeight: '20vh', }}
                            onFocus={() => handleInputFieldError("aartilyrics", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.aartilyrics && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.aartilyrics}
                            </span>
                        )}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Chalisa Lyrics <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.chalisalyrics}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, chalisalyrics: value })}
                            editorStyle={{ minHeight: '20vh', }}
                            onFocus={() => handleInputFieldError("chalisalyrics", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.chalisalyrics && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.chalisalyrics}
                            </span>
                        )}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Mantra Lyrics <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.mantralyrics}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, mantralyrics: value })}
                            editorStyle={{ minHeight: '20vh', }}
                            onFocus={() => handleInputFieldError("mantralyrics", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.mantralyrics && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.mantralyrics}
                            </span>
                        )}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <label>
                            Bhajan Lyrics <span style={{ color: "red" }}>*</span>
                        </label>

                        <RichTextEditor
                            value={inputFieldDetail?.bhjanlyrics}
                            onChange={(value) => setInputFieldDetail({ ...inputFieldDetail, bhjanlyrics: value })}
                            editorStyle={{ minHeight: '20vh', }}
                            onFocus={() => handleInputFieldError("bhjanlyrics", null)}
                        />
                        {/* Optionally, display error */}
                        {inputFieldError.bhjanlyrics && (
                            <span style={{ color: "red" }}>
                                {inputFieldError.bhjanlyrics}
                            </span>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <label style={{ fontWeight: "600", fontSize: "18px" }}>VR Mode</label>
                        {inputFieldDetail.vr_mode.map((vr, index) => (
                            <div
                                key={index}
                                style={{
                                    border: "1px solid #C4C4C4",
                                    borderRadius: "8px",
                                    padding: "15px",
                                    marginBottom: "15px",
                                    position: "relative",
                                }}
                            >
                                <Grid container spacing={2}>
                                    {/* VR Title */}
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth required error={!!inputFieldError[`vr_mode_${index}_vr_title`]}>
                                            <InputLabel id={`vr-title-label-${index}`}>VR Title</InputLabel>
                                            <Select
                                                labelId={`vr-title-label-${index}`}
                                                value={vr.vr_title}
                                                label="VR Title *"
                                                onChange={(e) => handleVRChange(index, "vr_title", e.target.value)}
                                            >
                                                <MenuItem value="Garbh Grah">Garbh Grah</MenuItem>
                                                <MenuItem value="Sarovar">Sarovar</MenuItem>
                                                <MenuItem value="Entry Gate">Entry Gate</MenuItem>
                                                <MenuItem value="Mandap">Mandap</MenuItem>
                                                <MenuItem value="Parikrama">Parikrama</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                     <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id={`vr_visible_puja-${index}`}>VR Visible Puja</InputLabel>
                                        <Select
                                            labelId={`vr_visible_puja-${index}`}
                                            value={vr.vr_visible_puja}
                                            label="VR Visible Puja"
                                            onChange={(e) => handleVRChange(index,"vr_visible_puja", e.target.value)}
                                        >
                                            <MenuItem value="1">Yes</MenuItem>
                                            <MenuItem value="0">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Fake User Count"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            value={vr.vr_darshan_fake_user}
                                            id={`fake-user-count-${index}`}
                                            onChange={(e) => handleVRChange(index, "vr_darshan_fake_user", e.target.value)}
                                        />
                                    </Grid>
                                    {/* VR Image Upload */}
                                    <Grid item xs={12} md={4}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <label
                                                    htmlFor={`vr_image_upload_${index}`}
                                                    style={{
                                                        display: "inline-block",
                                                        cursor: "pointer",
                                                        border: "1px solid #C4C4C4",
                                                        borderRadius: "4px",
                                                        padding: "6px 10px",
                                                    }}
                                                >
                                                    Upload VR Image
                                                </label>
                                                <input
                                                    id={`vr_image_upload_${index}`}
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={(e) => {
                                                        if (e.target.files[0]) {
                                                            handleVRChange(index, "vr_image", e.target.files[0]);
                                                        }
                                                    }}
                                                />
                                            </Grid>

                                            {vr.vr_image && (
                                                <Grid item>
                                                    <Avatar
                                                        src={vr.vr_image}
                                                        variant="square"
                                                        style={{ width: "60px", height: "60px", borderRadius: "5px" }}
                                                    />
                                                </Grid>
                                            )}

                                            {inputFieldDetail.vr_mode.length > 1 && (
                                                <Grid item>
                                                    <div
                                                        onClick={() => removeVRMode(index)}
                                                        style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}
                                                    >
                                                        <CrossSvg />
                                                    </div>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>

                                    {/* Tags */}
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Tags (comma separated)"
                                            variant="outlined"
                                            fullWidth
                                            value={vr.tags}
                                            onChange={(e) => handleVRChange(index, "tags", e.target.value)}
                                        />
                                    </Grid>

                                    {/* Fake User Count */}
                                    {/* <Grid item xs={12} md={4}>
                                <TextField
                                    label="Fake User Count"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={vr.vr_darshan_fake_user}
                                    onChange={(e) => handleVRChange(index, "vr_darshan_fake_user", e.target.value)}
                                />
                                </Grid> */}
                                </Grid>
                            </div>
                        ))}

                        {/* Add More Button */}
                        <div
                            onClick={addVRMode}
                            style={{
                                cursor: "pointer",
                                fontWeight: "600",
                                color: Color.primary,
                                marginTop: "10px",
                                userSelect: "none",
                            }}
                        >
                            + Add Another VR Mode
                        </div>
                    </Grid>


                    {/* Temple VR Darshan Section */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Temple VR Darshan Price"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={inputFieldDetail.temple_vr_darshan.price}
                            onChange={(e) => handleTempleVRDarshan("price", Number(e.target.value))}
                        // inputProps={{ min: 0, step: "0.01" }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="temple_vr_type_label">Price Type</InputLabel>
                            <Select
                                labelId="temple_vr_type_label"
                                value={inputFieldDetail.temple_vr_darshan.type}
                                label="Price Type"
                                onChange={(e) => handleTempleVRDarshan("type", e.target.value)}
                            >
                                <MenuItem value="Add">Add</MenuItem>
                                <MenuItem value="Deduct">Deduct</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid container sx={{ justifyContent: "space-between" }}>
                            <div onClick={handleSubmit} style={{ fontWeight: "500", backgroundColor: Color.primary, color: Color.white, padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "15px" }}>Submit</div>
                        </Grid>
                    </Grid>
                </Grid>
                {inputFieldDetail?.temple == "Sanatan" ?
                    <Dialog open={modal} PaperProps={{ sx: { maxWidth: { xs: '190vw', sm: '150vw' }, minWidth: { xs: '200vw', sm: '32vw' } } }}>
                        <DialogContent>
                            <Grid container sx={{ alignItems: "center" }} spacing={3}>
                                <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                        <div>Image View</div>
                                        <div onClick={() => handleModalClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>

                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        width: "100%",
                                        maxWidth: "400px", // adjust as needed for max width
                                        aspectRatio: "9 / 16", // portrait mobile ratio
                                        marginInline: "auto", // center in container
                                    }}
                                >
                                    <img
                                        src="/images/mandirmin.png"
                                        alt="Mandir Foreground"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            zIndex: 2,
                                        }}
                                    />
                                    <img
                                        src="/images/mandirbackground.jpg"
                                        alt="Mandir Background"
                                        style={{
                                            position: "absolute",
                                            width: "88%",
                                            height: "50%",
                                            marginTop: "165px",
                                            objectFit: "fill",
                                            zIndex: 1,
                                        }}
                                    />

                                    <img
                                        src={imageView}
                                        alt="Main Image"
                                        style={{
                                            position: "relative",
                                            height: "55%",
                                            width: "100%",
                                            marginTop: "40%",
                                            objectFit: "contain",
                                            zIndex: 1,
                                        }}
                                    />


                                </div>

                            </Grid>

                        </DialogContent>
                    </Dialog>
                    :
                    <Dialog open={modal} PaperProps={{ sx: { maxWidth: { xs: '190vw', sm: '150vw' }, minWidth: { xs: '200vw', sm: '32vw' } } }}>
                        <DialogContent>
                            <Grid container sx={{ alignItems: "center" }} spacing={3}>
                                <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                        <div>Image View</div>
                                        <div onClick={() => handleModalClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                                    </div>
                                </Grid>
                            </Grid>



                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>

                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        width: "100%",
                                        maxWidth: "400px", // adjust as needed for max width
                                        aspectRatio: "9 / 16", // portrait mobile ratio
                                        marginInline: "auto", // center in container
                                    }}
                                >
                                    <img
                                        src="/images/outernavgarhnew.png"
                                        alt="Mandir Foreground"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            zIndex: 2,
                                        }}
                                    />
                                    <img
                                        src="/images/innernavgarh3.png"
                                        alt="Mandir Background"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "49%",
                                            objectFit: "contain",
                                            zIndex: 1,
                                        }}
                                    />

                                    <img
                                        src={imageView}
                                        alt="Main Image"
                                        style={{
                                            position: "relative",
                                            height: "65%",
                                            width: "100%",
                                            objectFit: "contain",
                                            zIndex: 1,
                                            marginTop:'-5%'
                                            // backgroundColor:'red'
                                          
                                        }}
                                    />


                                </div>

                            </Grid>

                        </DialogContent>
                    </Dialog>
                }



                {/* Video Mandir */}
                {inputFieldDetail?.temple == "Sanatan" ?
                    <Dialog open={modalVideo} PaperProps={{ sx: { maxWidth: { xs: '190vw', sm: '150vw' }, minWidth: { xs: '200vw', sm: '32vw' } } }}>
                        <DialogContent>
                            <Grid container sx={{ alignItems: "center" }} spacing={3}>
                                <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                        <div>Video View</div>
                                        <div onClick={() => handleModalVideoClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        width: "100%",
                                        maxWidth: "400px",
                                        aspectRatio: "9 / 16",
                                        marginInline: "auto",
                                        backgroundColor: "#000", // fallback in case video doesn't load
                                    }}
                                >
                                    {/* Background video */}
                                    <video
                                        controls
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            zIndex: 4,
                                        }}
                                    >
                                        <source src={imageViewVideo?.file} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Foreground frame/image */}
                                    <img
                                        src="/images/mandirmin.png"
                                        alt="Mandir Foreground"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            zIndex: 2,
                                        }}
                                    />
                                </div>
                            </Grid>


                        </DialogContent>
                    </Dialog>
                    :
                    <Dialog open={modalVideo} PaperProps={{ sx: { maxWidth: { xs: '190vw', sm: '150vw' }, minWidth: { xs: '200vw', sm: '32vw' } } }}>
                        <DialogContent>
                            <Grid container sx={{ alignItems: "center" }} spacing={3}>
                                <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                        <div>Image View</div>
                                        <div onClick={() => handleModalVideoClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                                    </div>
                                </Grid>
                            </Grid>



                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>

                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        width: "100%",
                                        maxWidth: "400px", // adjust as needed for max width
                                        aspectRatio: "9 / 16", // portrait mobile ratio
                                        marginInline: "auto", // center in container
                                    }}
                                >
                                    <img
                                        src="/images/outernavgarhnew.png"
                                        alt="Mandir Foreground"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            zIndex: 2,
                                        }}
                                    />
                                    <img
                                        src="/images/innernavgarh3.png"
                                        alt="Mandir Background"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "60%",
                                            objectFit: "fill",
                                            zIndex: 1,
                                        }}
                                    />

                                    <video controls style={{ height: '200px', maxWidth: '300px', zIndex: 1 }}>
                                        <source src={base_url + imageViewVideo} />
                                    </video>


                                </div>

                            </Grid>

                        </DialogContent>
                    </Dialog>
                }

                <Dialog open={modalOpen} PaperProps={{ sx: { maxWidth: { xs: '190vw', sm: '150vw' }, minWidth: { xs: '200vw', sm: '32vw' } } }}>
                    <DialogContent>
                        <Grid container sx={{ alignItems: "center" }} spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                    <div>Image View</div>
                                    <div onClick={() => handleModalImageClose()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                                </div>
                            </Grid>
                        </Grid>

                        <div style={{ marginTop: 10, fontWeight: '500' }}>
                            Width: {(dimensions.width).toFixed(0)}px &nbsp; | &nbsp;
                            Height: {(dimensions.height).toFixed(0)}px
                        </div>
                        <div style={{}}>
                            <button onClick={handleEdit}
                            style={{
                                        marginTop: '20px',
                                        padding: '10px 20px',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',

                                    }}>
                                {edit ? `Show` : `Edit`}
                            </button>
                        </div>

                        {inputFieldDetail?.temple == "Sanatan" ?
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>

                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        height: "20%", // or auto
                                        aspectRatio: "9 / 16",
                                    }}
                                >
                                    <img
                                        src="/images/mandirmin.png"
                                        alt="Mandir Background"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "fill",
                                            zIndex: 2,
                                        }}
                                    />
                                    <img
                                        src="/images/mandirbackground.jpg"
                                        alt="Mandir Background"
                                        style={{
                                            position: "absolute",
                                            width: "88%",
                                            height: "50%",
                                            objectFit: "fill",
                                            zIndex: 1,
                                            marginTop: "41%",
                                        }}
                                    />

                                    {imageSrc && (
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                zIndex: edit ? 40 : 1,

                                            }}>
                                            <canvas
                                                style={{
                                                    width: '100%',
                                                    height: '55%',
                                                    maxHeight: '42rem',
                                                    maxWidth: '46rem',
                                                    touchAction: 'auto',
                                                    marginTop: '40%'
                                                    // backgroundColor:'red'
                                                }}
                                                ref={canvasRef}
                                                onPointerDown={handlePointerDown}
                                                onPointerMove={handlePointerMove}
                                                onPointerUp={handlePointerUp}
                                                onWheel={handleWheel}
                                            />
                                        </div>
                                    )}

                                </div>

                                <button
                                    onClick={handleSave}

                                    style={{
                                        marginTop: '20px',
                                        padding: '10px 20px',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',

                                    }}
                                >
                                    💾 Save Transformed Image
                                </button>

                            </Grid>
                            :
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ color: "#000" }}>

                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "20px",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        height: "850px", // or auto
                                        aspectRatio: "9 / 16",
                                       
                                    }}
                                >
                                    <img
                                        src="/images/outernavgarhnew.png"
                                        alt="Mandir Background"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "fill",
                                            zIndex: 2,
                                        }}
                                    />
                                    <img
                                        src="/images/innernavgarh3.png"
                                        alt="Mandir Background"
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "50%",
                                            objectFit: "fill",
                                            zIndex: 1,
                                        }}
                                    />

                                    {imageSrc && (
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                zIndex: edit ? 40 : 1,
                                            }}>
                                            <canvas
                                                style={{
                                                    width: '100%',
                                                    height: '65%',
                                                    maxHeight: '42rem',
                                                    maxWidth: '46rem',
                                                    touchAction: 'auto',
                                                    marginTop:'-5%'
                                                    // backgroundColor:'red'
                                                }}
                                                ref={canvasRef}
                                                onPointerDown={handlePointerDown}
                                                onPointerMove={handlePointerMove}
                                                onPointerUp={handlePointerUp}
                                                onWheel={handleWheel}
                                            />
                                        </div>
                                    )}

                                </div>

                                <button
                                    onClick={handleSave}

                                    style={{
                                        marginTop: '20px',
                                        padding: '10px 20px',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',

                                    }}
                                >
                                    💾 Save Transformed Image
                                </button>

                            </Grid>
                        }
                    </DialogContent>
                </Dialog>

            </div >
        </>
    );
};

export default AddDarshan;

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.readAsDataURL(file);
    });
}