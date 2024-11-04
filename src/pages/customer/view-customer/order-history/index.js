import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainDatatable from "../../../../components/common/MainDatatable.jsx";
import * as CustomerActions from '../../../../redux/actions/customerAction';
import * as AstromallActions from '../../../../redux/actions/astromallAction';
import { CrossSvg, ViewSvg } from "../../../../assets/svg/index.js";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { Color } from "../../../../assets/colors/index.js";
import { api_urls } from "../../../../utils/api-urls/index.js";

const OrderHistory = ({ customerId }) => {
    const dispatch = useDispatch();
    const { orderHistoryByCustomerIdData: orderHistoryByCustomerIdDataRedux } = useSelector(state => state?.customerReducer);

    const orderHistoryByCustomerIdData = orderHistoryByCustomerIdDataRedux?.map(value => {
        if (value.status === "OUT_FOR_DELIVERY") { return { ...value, status: "OUT FOR DELIVERY" }; }
        return value;
    });

    const [productDetails, setProductDetails] = useState([]);
    const [productModal, setProductModal] = useState(false);

    const handleProductModal = (data) => {
        console.log(data)
        setProductDetails(data);
        setProductModal(true)
    };

    //* Data-Table Column
    const columns = [
        { name: 'S.No.', selector: (row) => orderHistoryByCustomerIdData.indexOf(row) + 1, width: '80px' },
        { name: 'Order Id', selector: row => row?.orderId, width: '270px' },
        { name: 'Total QTY', selector: row => row?.products?.reduce((acc, data) => acc + data?.quantity, 0) },
        { name: 'Amount', selector: row => row?.totalAmount },
        {
            name: "Change Status",
            cell: (row) => (
                <select value={row?.status} onChange={(e) => dispatch(AstromallActions.changeOrderStatus({ orderId: row?.orderId, status: e.target.value == 'OUT FOR DELIVERY' ? 'OUT_FOR_DELIVERY' : e.target.value }))} style={{ outline: "none", padding: "5px 8px", border: "1px solid #666666", color: "#666666", borderRadius: "5px", fontFamily: "Philosopher" }}>
                    <option value={''}>---Select---</option>
                    <option value={'INITIATED'}>Initiated</option>
                    <option value={'ACCEPTED'}>Accepted</option>
                    <option value={'PACKED'}>Packed</option>
                    <option value={'REJECTED'}>Rejected</option>
                    <option value={'OUT FOR DELIVERY'}>Out for delivery</option>
                    <option value={'DELIVERED'}>Delivered</option>
                    <option value={'CANCELLED'}>Cancelled</option>
                </select>
            ),
        },
        { name: 'Date', selector: row => row?.createdAt ? moment(row?.createdAt).format('DD MMM YYYY') : 'N/A' },
        { name: 'Product', selector: row => <div onClick={() => handleProductModal(row?.products)}><ViewSvg /></div> },
    ];

    useEffect(function () {
        //! Dispatching API for Getting Order History
        dispatch(CustomerActions.getOrderHistoryByCustomerId({ customerId }));
    }, []);

    return (
        <>
            <MainDatatable data={orderHistoryByCustomerIdData} columns={columns} title={'Order History'} />


            <Dialog open={productModal} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '50vw' }, minWidth: { xs: '90vw', sm: '50vw' } } }} >
                <DialogContent>
                    <Grid container sx={{ alignItems: "center" }} spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{ fontSize: "22px", fontWeight: "500", color: Color.black }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                <div>Product</div>
                                <div onClick={() => setProductModal(false)} style={{ cursor: "pointer" }}><CrossSvg /></div>
                            </div>

                            {/* Mapping through products to display each one */}
                            {productDetails && productDetails?.map((product, index) => (
                                <Grid container key={index} spacing={2} sx={{ marginTop: 2, borderBottom: '1px solid #ddd', paddingBottom: 2 }}>
                                    {/* Product Image */}
                                    <Grid item xs={12} sm={4}>
                                        <img
                                            src={api_urls + 'uploads/' + product?.productId?.image} // Assuming image path is relative
                                            alt={product?.productId?.productName}
                                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                        />
                                    </Grid>

                                    {/* Product Details */}
                                    <Grid item xs={12} sm={8}>
                                        <div style={{ fontSize: '18px', fontWeight: '600' }}>{product?.productId?.productName}</div>
                                        <div style={{ fontSize: '14px', color: '#555', marginTop: '8px' }}>
                                            {product?.productId?.description}
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '500', marginTop: '10px' }}>
                                            Price: ₹{product?.productId?.price}
                                        </div>
                                        <div style={{ fontSize: '14px', marginTop: '5px' }}>
                                            Quantity: {product?.quantity}
                                        </div>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default OrderHistory;