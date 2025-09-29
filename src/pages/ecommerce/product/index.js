import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from '../../../assets/images/logo.png';
import { base_url, img_url } from "../../../utils/api-routes";
import ViewModal from "../../../components/modal/ViewModal.jsx";
import { EditSvg, DeleteSvg } from "../../../assets/svg/index.js";
import MainDatatable from "../../../components/common/MainDatatable.jsx";
import * as EcommerceActions from '../../../redux/actions/ecommerceAction.js';
import { Color } from "../../../assets/colors/index.js";

const Product = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ecommerceProductData: ProductData } = useSelector(state => state.ecommerceReducer);

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
        { name: 'Category', selector: row => row?.category?.categoryName },
        { name: 'name', selector: row => row?.name },
        { name: 'Description', selector: row => row?.description ? <div style={{ cursor: "pointer" }} onClick={() => openModal(row?.description)} dangerouslySetInnerHTML={{
            __html:row.description
        }}></div> : 'N/A' },
        { name: 'Price', selector: row => row?.price },
        { name: 'Commission(%)', selector: row => row?.adminCommissionPercentage || 'N/A' },
        { name: 'Image', cell: row => <img src={row?.image ? row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        { name: 'Bulk Image', cell: row => <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>{row?.bannerImage && row?.bannerImage?.length > 0 && row?.bannerImage?.map((value, index) => <img key={index} src={value} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${Color?.primary}` }} />)}</div>, width: '250px', center: true },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/ecommerce/product/edit-product', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(EcommerceActions.deleteEcommerceProduct({ id: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div>,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API
        dispatch(EcommerceActions.getEcommerceProduct())
    }, []);

    return (
        <>
            <MainDatatable data={ProductData} columns={productColumns} title={'Ecommerce Product'} url={'/ecommerce/product/add-product'} />

            <ViewModal openModal={modalIsOpen} description={text} title={'Description'} handleCloseModal={closeModal} />
        </>
    );
}



export default Product;