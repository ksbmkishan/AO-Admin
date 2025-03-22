import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_url } from "../../../utils/api-routes";
import logo from '../../../assets/images/logo.png';
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as EcommerceActions from '../../../redux/actions/ecommerceAction.js';
import ViewModal from "../../../components/modal/ViewModal.jsx";

const Product = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allProductData: ProductData } = useSelector(state => state.ecommerceReducer);

    const [text, setText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (text) => {
        setModalIsOpen(true);
        setText(text);
    };
    const closeModal = () => setModalIsOpen(false);

    //* Category DataTable Columns
    const productColumns = [
        { name: 'S.No.', selector: row => ProductData.indexOf(row) + 1, width: '80px' },
        { name: 'Title', selector: row => row?.productName },
        { name: 'Description', selector: row => row?.description ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.description)}>{row.description}</div> : 'N/A' },
        { name: 'Mrp', selector: row => row?.mrp },
        { name: 'Offer Price', selector: row => row?.price },
        // { name: 'Purchase Price', selector: row => row?.purchasePrice},
        { name: 'Quantity', selector: row => row?.quantity },
        // { name: 'Inventory', selector: row => row?.inventory},
        // { name: 'Refund Day', selector: row => row?.refundRequetDay},
        // { name: 'Manufacture Date', selector: row => row?.manufactureDate ? DayMonthYear(row?.manufactureDate) : 'N/A' },
        // { name: 'Expiry Date', selector: row => row?.expiryDate ? DayMonthYear(row?.expiryDate) : 'N/A' },
        { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/astro-mall/product/edit-product', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(EcommerceActions.deleteEcommerceProduct({ productId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div>,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Category
        dispatch(EcommerceActions.getAllProducts())
    }, []);

    return (
        <>
            <MainDatatable data={ProductData} columns={productColumns} title={'Mall Product'} url={'/astro-mall/product/add-product'} />

            <ViewModal openModal={modalIsOpen} text={text} title={'Description'} handleCloseModal={closeModal} />
        </>
    );
}



export default Product;