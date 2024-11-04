import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as AstrologerActions from '../../../../redux/actions/astrologerAction.js';
import ViewModal from "../../../../components/modal/ViewModal.jsx";

const Review = ({ astrologerId }) => {
    const dispatch = useDispatch();
    const { reviewByAstrologerIdData } = useSelector(state => state?.astrologerReducer);

    const [text, setText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (text) => {
        setModalIsOpen(true);
        setText(text);
    };
    const closeModal = () => setModalIsOpen(false);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: (row) => reviewByAstrologerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Astrologer', selector: row => row?.astrologer?.astrologerName },
        { name: 'Customer', selector: row => row?.customer?.customerName },
        { name: 'Rating', selector: row => row.ratings },
        { name: 'Comment', selector: row => row?.comments ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.comments)}>{row.comments}</div> : 'N/A' },
        { name: "Status", cell: (row) => <div >{row.is_verified ? "Verified" : "Unverified"}</div> },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Review
        dispatch(AstrologerActions.getReviewByAstrologerId({ astrologerId }));
    }, []);

    return (
        <>
            <MainDatatable data={reviewByAstrologerIdData} columns={columns} title={'Review'} />

            <ViewModal openModal={modalIsOpen} text={text} title={'Rating'} handleCloseModal={closeModal} />
        </>
    );
}

export default Review;