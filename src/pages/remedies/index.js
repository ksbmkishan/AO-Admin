import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as RemediesActions from "../../redux/actions/remediesAction";
import * as CommonActions from "../../redux/actions/commonAction";

const Remedies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { remediesData } = useSelector(state => state?.remediesReducer);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => remediesData.indexOf(row) + 1, width: '80px' },
        { name: 'Remedies', selector: row => row?.title, width: "200px" },
        { name: 'Description', selector: row => row?.description ? <div onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Description', text: row?.description }))} style={{ cursor: 'pointer' }}>{row?.description}</div> : 'N/A' },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/remedies/edit-remedies', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(RemediesActions.deleteRemedies({ remedyId: row?._id, remedy: row?.remedy }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px", centre: true
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(RemediesActions.getRemedies())
    }, []);

    return (
        <>
            <MainDatatable data={remediesData} columns={columns} title={'Remedies'} url={'/remedies/add-remedies'} />

        </ >
    );
}

export default Remedies;