import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as TestimonialActions from "../../redux/actions/TestimonialActions.js";
import { img_url } from "../../utils/api-routes/index.js";

const Testimonial = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { testimonialData } = useSelector(state => state?.testimonialReducer);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => testimonialData.indexOf(row) + 1 },
        { name: 'Title', selector: row => row?.name },
        { name: 'Rating', selector: row => row?.rating },
        { name: 'Image', cell: row => <img src={row?.image && img_url + row?.image} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/testimonial/edit-testimonial', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(TestimonialActions.deleteTestimonial({ testimonial: row?.testimonialId, testimonialId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(TestimonialActions.getTestimonial())
    }, []);

    return (
        <>
            <MainDatatable data={testimonialData} columns={columns} title={'Testimonial'} url={'/testimonial/add-testimonial'} />

        </ >
    );
}

export default Testimonial;
