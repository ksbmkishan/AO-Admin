import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { AddCircleRounded, Delete, Edit } from '@mui/icons-material';
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useStyles, dataTableCustomStyles } from '../../assets/styles'
import CsvDownloader from "../../components/features/CsvDownloader.jsx";
import * as PagesActions from "../../redux/actions/pagesActions.js"
import { connect } from "react-redux";
import Loader from "../../components/features/Loader.jsx";

const DisplayHowToUseVideos = ({ tetorialsPhotoData, dispatch }) => {
    const classes = useStyles()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(PagesActions.getAppTutorials({ type: "Video" }));
    }, [dispatch])



    //* Data-Table Column
    const video_columns = [
        { name: 'S.No.', selector: (row, index) => tetorialsPhotoData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Youtube Link', selector: row => row?.link },
        { name: 'Discription', selector: row => <div dangerouslySetInnerHTML={{ __html: row?.description }}></div> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <Delete sx={{ cursor: "pointer" }} onClick={() => dispatch(PagesActions.deleteAppTutorials({ id: row._id, type: "Video" }))} />
            </div>,
            right: true
        }
    ];

    return (
        <div className={classes.container}>
            <Loader />
            <div className={classes.box}>
                {tetorialsPhotoData && displayTable()}
            </div>
        </div >

    );
    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <DataTable
                        title={<div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={classes.tableHead}>How To Use : Video</div>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <CsvDownloader data={tetorialsPhotoData} />
                                <div className={classes.addButton} onClick={() => navigate("/AddHowToUseVideo")}>
                                    <AddCircleRounded />
                                    <div className={classes.addButtontext}>Add New</div>
                                </div>
                            </div>
                        </div>}
                        data={tetorialsPhotoData}
                        columns={video_columns}
                        pagination
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={5}
                        customStyles={dataTableCustomStyles}
                    />
                </Grid>
            </Grid>
        )
    }
};

const mapStateToProps = state => ({
    tetorialsPhotoData: state.pages.tetorialsPhotoData
})

const mapDispatchToProps = dispatch => ({
    dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(DisplayHowToUseVideos);




