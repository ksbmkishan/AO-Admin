import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewModal from "../../../../components/modal/ViewModal.jsx";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as CustomerActions from '../../../../redux/actions/customerAction';

const ReviewHistory = ({ customerId }) => {
    const dispatch = useDispatch();
    const { reviewHistoryByCustomerIdData } = useSelector(state => state?.customerReducer);

    const [text, setText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (text) => {
        setModalIsOpen(true);
        setText(text);
    };
    const closeModal = () => setModalIsOpen(false);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: (row) => reviewHistoryByCustomerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Customer', selector: row => row?.customer?.customerName },
        { name: 'Astrologer', selector: row => row?.astrologer?.astrologerName },
        { name: 'Rating', selector: row => row.ratings },
        { name: 'Comment', selector: row => row?.comments ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.comments)}>{row.comments}</div> : 'N/A' },
        { name: "Status", cell: (row) => <div >{row.is_verified ? "Verified" : "Unverified"}</div> },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Review
        dispatch(CustomerActions.getReviewHistoryByCustomerId({ customerId }));
    }, []);

    return (
        <>
            <MainDatatable data={reviewHistoryByCustomerIdData} columns={columns} title={'Review'} />

            <ViewModal openModal={modalIsOpen} text={text} title={'Rating'} handleCloseModal={closeModal} />
        </>
    );
}

export default ReviewHistory;