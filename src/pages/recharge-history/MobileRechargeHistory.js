import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as RechargeHistorySercvicesActions from '../../redux/actions/rechargeServicesHistoryActions.js';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Divider, Grid } from "@mui/material";

const MobileRechargeHistory = () => {
  const dispatch = useDispatch();
  const { rechargeServicesHistory } = useSelector(state => state.rechargeServicesHistory);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(RechargeHistorySercvicesActions.getRechargeServicesHistory());
  }, [dispatch]);

  const handleView = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleStatusUpdate = (row) => {
    alert(`Updating status for Transaction ID: ${row.transactionId}`);
    // You can open another modal here to change status
  };

  const columns = [
    { name: "S.No.", selector: (row, index) => index + 1, width: "80px" },
    { name: "User Name", selector: (row) => row.userId?.customerName || row.userId?.phoneNumber || "-", wrap: true },
    { name: "Service Type", selector: (row) => row.billType || "-", wrap: true },
    { name: "Number/ID", selector: (row) => row.number || "-", wrap: true },
    { name: "Status", selector: (row) => row.status || "-", wrap: true },
    { name: "Recharge Date", selector: (row) => moment(row.createdAt).format("DD-MM-YYYY"), wrap: true },
    { name: "Recharge Time", selector: (row) => moment(row.createdAt).format("HH:mm:ss"), wrap: true },

    // 🔹 Action Buttons Column
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "6px" }}>
          <Button size="small" variant="outlined" onClick={() => handleView(row)}>View Details</Button>
          {/* <Button size="small" variant="contained" color="warning" onClick={() => handleStatusUpdate(row)}>Update</Button> */}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "220px"
    },
  ];

  return (
    <>
      <MainDatatable
        data={rechargeServicesHistory || []}
        columns={columns}
        title={"Utility Service History"}
      />

      {/* 🔹 View Details Modal */}
      <Dialog open={openModal} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Recharge Details</DialogTitle>
        <Divider />
        <DialogContent dividers>
          {selectedRow ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography><b>User Name:</b> {selectedRow.userId?.customerName || "-"}</Typography>
                <Typography><b>Phone:</b> {selectedRow.userId?.phoneNumber || "-"}</Typography>
                <Typography><b>Email:</b> {selectedRow.userId?.email || "-"}</Typography>
              </Grid>

              <Divider sx={{ my: 1 }} />

              <Grid item xs={12}>
                <Typography><b>Bill Type:</b> {selectedRow.billType || "-"}</Typography>
                <Typography><b>Product:</b> {selectedRow.productName || "-"}</Typography>
                <Typography><b>Number / ID:</b> {selectedRow.number || "-"}</Typography>
                <Typography><b>Operator ID:</b> {selectedRow.operatorId || "-"}</Typography>
                <Typography><b>Operator Reference:</b> {selectedRow.operator_reference || "-"}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography><b>Transaction ID:</b> {selectedRow.transactionId || "-"}</Typography>
                <Typography><b>Recharge Order ID:</b> {selectedRow.rechargeOrderId || "-"}</Typography>
                <Typography><b>Refund:</b> {selectedRow.refund || "-"}</Typography>
                <Typography><b>Request ID:</b> {selectedRow.request_id || "-"}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography><b>Amount:</b> ₹{selectedRow.amount || 0}</Typography>
                <Typography><b>Status:</b> {selectedRow.status || "-"}</Typography>
                <Typography><b>Message:</b> {selectedRow.message || "-"}</Typography>
                <Typography><b>Recharge Date:</b> {moment(selectedRow.createdAt).format("DD-MM-YYYY")}</Typography>
                <Typography><b>Recharge Time:</b> {moment(selectedRow.createdAt).format("HH:mm:ss")}</Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography>No details found</Typography>
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MobileRechargeHistory;
