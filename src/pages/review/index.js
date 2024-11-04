import moment from "moment/moment.js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditSvg, DeleteSvg, SwitchOnSvg, SwitchOffSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as ReviewActions from "../../redux/actions/reviewsActions.js";
import * as CommonActions from "../../redux/actions/commonAction";

const Review = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { astrologersReviews } = useSelector(state => state?.review);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => astrologersReviews.indexOf(row) + 1, style: { backGroundColor: "#000", paddingLeft: "20px" }, width: "80px" },
        { name: 'Customer', selector: row => row?.customer?.customerName },
        { name: 'Astrologer', selector: row => row?.astrologer?.astrologerName },
        { name: 'Rating', selector: row => row.ratings },
        { name: 'Comment', selector: row => row?.comments ? <div style={{ cursor: "pointer" }} onClick={() => dispatch(CommonActions?.openTextModal({ title: 'Comment', text: row?.comments }))}>{row.comments}</div> : 'N/A' },
        { name: 'Date', selector: row => moment(row.createdAt).format('DD MMM YYYY') },
        { name: 'Status', selector: row => <div style={{ cursor: 'pointer' }} onClick={() => dispatch(ReviewActions.updateAstrologerReviewStatus({ status: row.is_verified ? "Verified" : "Unverified", reviewId: row?._id }))}>{row?.is_verified ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "140px", centre: true, },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/review/edit-review', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(ReviewActions.deleteAstrologerReivew(row?._id))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Review
        dispatch(ReviewActions.getAstrologersReviews())

    }, []);

    return (
        <>
            <MainDatatable data={astrologersReviews} columns={columns} title={'Review'} url={'/review/add-review'} />

        </>
    );
}

export default Review;