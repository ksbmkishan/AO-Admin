import { Dialog, DialogContent, Grid } from '@mui/material'
import React from 'react'
import { Color } from '../../assets/colors'
import { CrossSvg } from '../../assets/svg'

function VideoMandir({ modalVideo, handleModalVideoClose, imageViewVideo, base_url, inputFieldDetail }) {
    return (
        <div>
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
                                    controls={false}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        zIndex: 4,
                                    }}
                                >
                                    <source src={imageViewVideo?.file} type="video/mp4" />
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

                                <video controls={false} style={{ height: '200px', maxWidth: '300px', zIndex: 1 }}>
                                    <source src={base_url + imageViewVideo} />
                                </video>


                            </div>

                        </Grid>

                    </DialogContent>
                </Dialog>
            }
        </div>
    )
}

export default VideoMandir