import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dialog, DialogContent, Divider, Grid, Typography } from '@mui/material';
import { img_url } from '../../../utils/api-routes/index.js';
import logo from '../../../assets/images/logo.png';
import { Color } from '../../../assets/colors/index.js';
import { api_urls } from '../../../utils/api-urls/index.js';
import { IndianRupee } from '../../../utils/common-function/index.js';
import { ViewSvg, CrossSvg } from '../../../assets/svg/index.js';
import MainDatatable from '../../../components/common/MainDatatable.jsx';
import * as EcommerceActions from '../../../redux/actions/ecommerceAction.js';

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderHistoryData = useSelector(state => state.ecommerceReducer.orderHistoryData);

  const [productModal, setProductModal] = useState({ isOpen: false, productData: [] });
  console.log('ProductModal ::: ', productModal);

  //* Order History DataTable Columns
  const orderHistoryColumns = [
    { name: 'S.No.', selector: row => orderHistoryData.indexOf(row) + 1, width: '80px' },
    { name: 'Customer Name', selector: row => row?.customerId?.customerName || 'N/A' },
    { name: 'Image', cell: row => <img src={row?.customerId?.image ? img_url + row?.customerId?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
    { name: 'Status', selector: row => row?.status },
    {
      name: "Change Status",
      cell: (row) => (
        <select value={row?.status} onChange={(e) => dispatch(EcommerceActions.changeOrderStatus({ orderId: row?._id, status: e.target.value }))} style={{ outline: "none", padding: "5px 8px", border: "1px solid #666666", color: "#666666", borderRadius: "5px", fontFamily: "Philosopher" }}>
          <option value="">---Select---</option>
          <option value={'INITIATED'}>Initiated</option>
          <option value={'ACCEPTED'}>Accepted</option>
          <option value={'PACKED'}>Packed</option>
          <option value={'REJECTED'}>Rejected</option>
          <option value={'OUT_FOR_DELIVERY'}>Out for delivery</option>
          <option value={'DELIVERED'}>Delivered</option>
          <option value={'CANCELLED'}>Cancelled</option>
        </select>
      ), width: '250px'
    },
    { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMM YYYY') : 'N/A' },
    {
      name: 'Product',
      cell: row => (
        <div style={{ display: "flex", gap: "20px", alignItems: "center", paddingRight: "15px" }} >
          <div onClick={() => setProductModal({ isOpen: true, productData: row?.products })} style={{ cursor: "pointer" }}><ViewSvg /></div>
        </div >
      ),
      center: true
    },
  ];

  useEffect(() => {
    //! Dispatching API for Getting Order History
    dispatch(EcommerceActions.getOrderHistory());
  }, [dispatch]);

  return (
    <>
      {orderHistoryData && <MainDatatable data={orderHistoryData} columns={orderHistoryColumns} title={'Mall Order History'} />}


      {/* Product Modal */}
      <Dialog open={productModal?.isOpen} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '50vw' }, minWidth: { xs: '90vw', sm: '50vw' } } }}>
        <DialogContent>
          <Grid container sx={{ alignItems: "center" }} spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                <div>Product</div>
                <div onClick={() => setProductModal({ isOpen: false, productData: [] })} style={{ cursor: "pointer" }}><CrossSvg /></div>
              </div>
            </Grid>

            {/* Iterate over each product in productData */}
            {productModal?.productData?.map((value, index) => (
              <Grid container item xs={12} spacing={2} key={index} sx={{ marginBottom: '20px' }}>
                <Grid item xs={12} md={4}>
                  <Avatar src={api_urls + value?.productId?.bannerImages[0]} alt={value?.productId?.productName} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                </Grid>

                <Grid item xs={12} md={8}>
                  <Typography variant="h6" fontWeight="bold">{value?.productId?.productName}</Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>{value?.productId?.description}</Typography>

                  <Typography variant="body2" fontWeight="bold" color={Color.primary}>Price: {IndianRupee(value?.price)}</Typography>
                  <Typography variant="body2">Quantity: {value?.quantity}</Typography>
                </Grid>

                {index !== productModal?.productData?.length - 1 && (<Grid item xs={12}><Divider /></Grid>)}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OrderHistory;