import moment from "moment";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as RechargeActions from '../../redux/actions/rechargeActions.js';
import { DeleteSvg, SwitchOffSvg, SwitchOnSvg } from "../../assets/svg/index.js";

const Recharge = () => {
    const dispatch = useDispatch();
    const { rechargePlanData } = useSelector(state => state.recharge);

    //* Datatable Column
    const astrologerColumns = [
        { name: "S.No.", selector: (row, index) => rechargePlanData.indexOf(row) + 1, width: '80px' },
        { name: "Amount", selector: (row) => row?.amount },
        { name: "Extra P.Amount", selector: (row) => row?.percentage + '%' },
        { name: "Start Date", selector: (row) => row?.startDate && moment(row?.startDate).format("DD-MM-YYYY"), width: "120px" },
        { name: "End Date", selector: (row) => row?.endDate && moment(row?.endDate).format("DD-MM-YYYY"), width: "120px" },
        { name: 'Status', selector: row => <div onClick={() => dispatch(RechargeActions.updateRechargePlanStatus({ status: row?.recharge_status == "Active" ? "Inactive" : "Active", rechargePlanId: row?._id }))} style={{ cursor: 'pointer' }}>{row?.recharge_status == "Active" ? <SwitchOnSvg /> : <SwitchOffSvg />}</div>, width: "120px", centre: true },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => dispatch(RechargeActions.deleteRechargePlan({ rechargePlanId: row._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div>,
            center: true,
        },
    ];

    useEffect(() => {

        dispatch(RechargeActions.getRechargePlan())
    }, []);

    return (
        <>
            <MainDatatable data={rechargePlanData} columns={astrologerColumns} title={'Recharge'} url={'/recharge/add-recharge'} />

        </>
    );
};

export default Recharge;