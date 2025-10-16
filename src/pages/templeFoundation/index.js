import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as TempleFoundationActions from "../../redux/actions/templeActions.js";
import { base_url, img_url } from "../../utils/api-routes/index.js";

const TempleFoundation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { templeFoundation } = useSelector(state => state?.templeFoundationReducer);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => templeFoundation.indexOf(row) + 1 },
        { name: 'Name', selector: row => row?.name},
        { name: 'Image', cell: row => <img src={row?.image} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/templeFoundation/edit-testimonial', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(TempleFoundationActions.deleteTempleFoundation({ testimonial: row?.id, id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(TempleFoundationActions.getTempleFoundation())
    }, []);

    return (
        <>
            <MainDatatable data={templeFoundation} columns={columns} title={'Temple Foundation'} url={'/templeFoundation/add-testimonial'} />

        </ >
    );
}

export default TempleFoundation;
