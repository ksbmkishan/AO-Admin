import { Dialog, DialogContent, Grid } from '@mui/material'
import { Color } from '../../assets/colors'
import { CrossSvg } from '../../assets/svg'

const EditMandir = ({imageForEdit , handleModelResetEdit , dimensions, inputFieldDetail , handleSaveEdit, canvasRef , handlePointerDown, handlePointerMove , handlePointerUp , zoom , setZoom}) => {
  return (
     <Dialog open={imageForEdit} PaperProps={{ sx: { maxWidth: { xs: '190vw', sm: '150vw' }, minWidth: { xs: '200vw', sm: '32vw' } } }}>
            <DialogContent>
                <Grid container sx={{ alignItems: "center" }} spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                            <div>Edit View</div>
                            <div onClick={() => handleModelResetEdit()} style={{ cursor: "pointer" }}><CrossSvg /></div>
                        </div>
                    </Grid>
                </Grid>

                <div style={{ marginTop: 10, fontWeight: '500' }}>
                    Width: {(dimensions.width).toFixed(0)}px &nbsp; | &nbsp;
                    Height: {(dimensions.height).toFixed(0)}px
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
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 10,

                                    }}>
                                    <canvas
                                        style={{
                                            width: '65%',
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
                                    // onWheel={handleWheel}
                                    />
                                </div>
                       

                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label>Zoom</label>
                            <input type="range" min="0.1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
                        </div>

                        <button
                            onClick={handleSaveEdit}

                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',

                            }}
                        >
                            💾 Save Edit
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

                          
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 10,
                                    }}>
                                    <canvas
                                        style={{
                                            width: '100%',
                                            height: '65%',
                                            maxHeight: '42rem',
                                            maxWidth: '46rem',
                                            touchAction: 'auto',
                                            marginTop: '-5%'
                                            // backgroundColor:'red'
                                        }}
                                        ref={canvasRef}
                                        onPointerDown={handlePointerDown}
                                        onPointerMove={handlePointerMove}
                                        onPointerUp={handlePointerUp}
                                    // onWheel={handleWheel}
                                    />
                                </div>
                        

                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label>Zoom</label>
                            <input type="range" min="0.1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
                        </div>

                        <button
                            onClick={handleSaveEdit}

                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',

                            }}
                        >
                            💾 Save Edit
                        </button>

                    </Grid>
                }
            </DialogContent>
        </Dialog>
  )
}

export default EditMandir