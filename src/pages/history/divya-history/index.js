import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IndianRupee } from "../../../utils/common-function/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as CommonActions from '../../../redux/actions/commonAction';
import * as HistoryActions from '../../../redux/actions/historyAction';

const MudraHistory = () => {
    const dispatch = useDispatch();
    const { mudraHistoryData } = useSelector(state => state?.historyReducer);

    //* Data-Table Column
    

   const columns = [
           { name: 'S.No.', selector: (row) => mudraHistoryData?.indexOf(row) + 1, width: '80px' },
           { name: 'Name', selector: row => row?.name },
           { name: 'Amount', selector: row => row?.price && IndianRupee(row?.price) },
           { name: 'Status', selector: row => row?.status && row?.status },
           { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMMM YYYY') : 'N/A' },
       ];

    useEffect(function () {
        //! Dispatching API
        dispatch(HistoryActions.getMudraHistory());
    }, []);

    return (
        <>
            <MainDatatable data={mudraHistoryData} columns={columns} title={'Divya Rashi History'} />

        </>
    )
};

export default MudraHistory;