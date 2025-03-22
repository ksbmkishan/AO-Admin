import axios from 'axios';
import { put, call, takeLeading, delay } from 'redux-saga/effects';
import * as actionTypes from '../action-types';
import { api_url, change_order_status, create_ecommerce_category, create_ecommerce_product, delete_ecommerce_category, delete_ecommerce_product, get_all_products, get_ecommerce_category, get_ecommerce_product, get_order_history, update_ecommerce_category, update_ecommerce_product } from '../../utils/api-routes';
import Swal from "sweetalert2";
import { Color } from '../../assets/colors';
import { deleteAPI, putAPI } from '../../utils/api-function';

function* getEcommerceCategory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_ecommerce_category}`);
        console.log("Get ecommerce Category Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ECOMMERCE_CATEGORY, payload: data?.data });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get ecommerce Category Saga Error ::: ", error)
    }
}

function* createEcommerceCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + create_ecommerce_category}`, payload?.data);
        console.log("Create ecommerce Category Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", text: "Category Added Successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
        }

    } catch (error) {
        Swal.fire({ icon: "error", text: 'Server Error', text: "Failed To Create", showConfirmButton: false, timer: 2000, });
        console.log("Create Category Saga Error ::: ", error?.response?.data)
    }
}

function* updateEcommerceCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield putAPI(update_ecommerce_category, payload?.data);
        console.log("Update Category Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", text: "Updated Successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
            yield put({ type: actionTypes.GET_ECOMMERCE_CATEGORY, payload: null })
        }

    } catch (error) {
        console.log("Update Category Saga Error ::: ", error?.response?.data)
    }
}

function* deleteEcommerceCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const result = yield Swal.fire({ text: `Are you sure?`, text: "You want to delete!!!", icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: "grey", confirmButtonText: "Delete", })

        if (result.isConfirmed) {
            const { data } = yield deleteAPI(delete_ecommerce_category(payload?.id));
            console.log("Delete Category Saga Response ::: ", data)
            if (data?.success) {
                Swal.fire({ icon: "success", text: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_ECOMMERCE_CATEGORY, payload: null })
            }
        }
    } catch (error) {
        Swal.fire({ icon: "error", text: "Server Error", text: "Failed To Delete", showConfirmButton: false, timer: 2000, });
        console.log("Delete Category Saga Error ::: ", error?.response?.data)
    }
}

function* getEcommerceProduct() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.post, `${api_url + get_ecommerce_product}`, { categoryId: "66694b268dc54bbd7fbc3743" });
        // const { data } = yield call(axios.get, `${api_url + get_ecommerce_product}`);
        console.log("Get ecommerce Product Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ECOMMERCE_PRODUCT, payload: data?.products });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get ecommerce Product Saga Error ::: ", error)
    }
}

function* createEcommerceProduct(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + create_ecommerce_product}`, payload?.data);
        console.log("Create ecommerce Product Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", text: "Created Successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
        } else {
            Swal.fire({ icon: "error", text: 'Warning', text: data?.message, showConfirmButton: false, timer: 2000, });
        }

    } catch (error) {
        Swal.fire({ icon: "error", text: 'Server Error', text: "Failed To Create", showConfirmButton: false, timer: 2000, });
        console.log("Create Product Saga Error ::: ", error?.response?.data)
    }
}

function* updateEcommerceProduct(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + update_ecommerce_product}`, payload?.data);
        console.log("Update Product Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", text: "Updated Successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
            yield put({ type: actionTypes.GET_ECOMMERCE_PRODUCT, payload: null })
        }
    } catch (error) {
        console.log("Update Product Saga Error ::: ", error?.response?.data)
    }
}

function* deleteEcommerceProduct(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const result = yield Swal.fire({ text: `Are You Sure ?`, text: "You Want To Delete!!!", icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: "grey", confirmButtonText: "Delete", })

        if (result.isConfirmed) {
            const { data } = yield call(axios.post, `${api_url + delete_ecommerce_product}`, payload);
            console.log("Delete Product Saga Response ::: ", data)
            if (data?.success) {
                Swal.fire({ icon: "success", text: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_ALL_PRODUCTS, payload: null })
            }
        }
    } catch (error) {
        Swal.fire({ icon: "error", text: "Server Error", text: "Failed To Delete", showConfirmButton: false, timer: 2000, });
        console.log("Delete Product Saga Error ::: ", error?.response?.data)
    }
}

// ALL_PRODUCTS
function* getAllProducts() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_all_products}`, { categoryId: "66694b268dc54bbd7fbc3743" });
        console.log("Get ecommerce Product Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ALL_PRODUCTS, payload: data?.products });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get ecommerce Product Saga Error ::: ", error)
    }
}

function* getOrderHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_order_history}`,);
        console.log("Get Order History Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ORDER_HISTORY, payload: data?.data?.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Order History Saga Error ::: ", error)
    }
}

function* changeOrderStatus(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)
        console.log(api_url + change_order_status)
        const { data } = yield axios.post(api_url + change_order_status, payload)

        if (data?.success) {
            Swal.fire({ icon: "success", text: "Updated Successfully", showConfirmButton: false, timer: 2000, });
            yield put({ type: actionTypes.GET_ORDER_HISTORY, payload: null })

        }

    } catch (error) {
        console.log("Update Astropuja Puja Saga Error ::: ", error?.response?.data)
    }
}



export default function* ecommerceSaga() {
    yield takeLeading(actionTypes?.GET_ECOMMERCE_CATEGORY, getEcommerceCategory);
    yield takeLeading(actionTypes?.CREATE_ECOMMERCE_CATEGORY, createEcommerceCategory);
    yield takeLeading(actionTypes?.UPDATE_ECOMMERCE_CATEGORY, updateEcommerceCategory);
    yield takeLeading(actionTypes?.DELETE_ECOMMERCE_CATEGORY, deleteEcommerceCategory);

    yield takeLeading(actionTypes?.GET_ECOMMERCE_PRODUCT, getEcommerceProduct);
    yield takeLeading(actionTypes?.CREATE_ECOMMERCE_PRODUCT, createEcommerceProduct);
    yield takeLeading(actionTypes?.UPDATE_ECOMMERCE_PRODUCT, updateEcommerceProduct);
    yield takeLeading(actionTypes?.DELETE_ECOMMERCE_PRODUCT, deleteEcommerceProduct);

    yield takeLeading(actionTypes?.GET_ALL_PRODUCTS, getAllProducts);
    yield takeLeading(actionTypes?.GET_ORDER_HISTORY, getOrderHistory);
    yield takeLeading(actionTypes?.CHANGE_ORDER_STATUS, changeOrderStatus);
}
