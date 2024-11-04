import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as ExpertiesActions from '../../redux/actions/expertiseAction';

const Expertise = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { expertiesData } = useSelector(state => state?.expertiseReducer);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => expertiesData.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" } },
        { name: 'Expertise', selector: row => row?.expertise },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/expertise/edit-expertise', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ExpertiesActions.deleteExpertise({ experties: row?.expertise, expertiseId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(ExpertiesActions.getExpertise())
    }, []);

    return (
        <>
            <MainDatatable data={expertiesData} columns={columns} title={'Expertise'} url={'/expertise/add-expertise'} />

        </ >
    );
}

export default Expertise;