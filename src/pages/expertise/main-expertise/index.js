import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as ExpertiesActions from '../../../redux/actions/expertiseAction';

const MainExpertise = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mainExpertiseData } = useSelector(state => state?.expertiseReducer);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => mainExpertiseData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Main Expertise', selector: row => row?.mainExpertise },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/main-expertise/edit-main-expertise', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ExpertiesActions.deleteMainExpertise({ main_experties: row?.mainExpertise, mainExpertiseId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Main Expertise
        dispatch(ExpertiesActions.getMainExpertise());
    }, []);

    return (
        <>
            <MainDatatable data={mainExpertiseData} columns={columns} title={'Main Expertise'} url={'/main-expertise/add-main-expertise'} />

        </ >
    );
}

export default MainExpertise;