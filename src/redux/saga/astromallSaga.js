import axios from 'axios';
import { put, call, takeLeading, delay } from 'redux-saga/effects';
import * as actionTypes from '../action-types';
import { api_url, change_order_status, create_astro_mall_category, create_astro_mall_product, delete_astro_mall_category, delete_astro_mall_product, get_all_products, get_astro_mall_category, get_astro_mall_product, get_order_history, update_astro_mall_category, update_astro_mall_product } from '../../utils/api-routes';
import Swal from "sweetalert2";
import { Color } from '../../assets/colors';

function* getAstromallCategory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_astro_mall_category}`);
        console.log("Get Astromall Category Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_MALL_CATEGORY, payload: data?.productCategory });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astromall Category Saga Error ::: ", error)
    }
}

function* createAstromallCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + create_astro_mall_category}`, payload?.data);
        console.log("Create Astromall Category Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Category Added Successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Server Error', text: "Failed To Create", showConfirmButton: false, timer: 2000, });
        console.log("Create Category Saga Error ::: ", error?.response?.data)
        // title: error?.response?.data?.message.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    }
}

function* updateAstromallCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + update_astro_mall_category}`, payload?.data);
        console.log("Update Category Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Updated Successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
            yield put({ type: actionTypes.GET_ASTRO_MALL_CATEGORY, payload: null })
        }

    } catch (error) {
        console.log("Update Category Saga Error ::: ", error?.response?.data)
    }
}

function* deleteAstromallCategory(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const result = yield Swal.fire({ title: `Are you sure?`, text: "You want to delete!!!", icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: "grey", confirmButtonText: "Delete", })

        if (result.isConfirmed) {
            const { data } = yield call(axios.post, `${api_url + delete_astro_mall_category}`, payload);
            console.log("Delete Category Saga Response ::: ", data)
            if (data?.success) {
                Swal.fire({ icon: "success", title: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_ASTRO_MALL_CATEGORY, payload: null })
            }
        }
    } catch (error) {
        Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Delete", showConfirmButton: false, timer: 2000, });
        console.log("Delete Category Saga Error ::: ", error?.response?.data)
    }
}


function* getAstromallProduct() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.post, `${api_url + get_astro_mall_product}`, { categoryId: "66694b268dc54bbd7fbc3743" });
        // const { data } = yield call(axios.get, `${api_url + get_astro_mall_product}`);
        console.log("Get Astromall Product Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_MALL_PRODUCT, payload: data?.products });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astromall Product Saga Error ::: ", error)
    }
}

function* createAstromallProduct(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + create_astro_mall_product}`, payload?.data);
        console.log("Create Astromall Product Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Created Successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
        } else {
            Swal.fire({ icon: "error", title: 'Warning', text: data?.message, showConfirmButton: false, timer: 2000, });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Server Error', text: "Failed To Create", showConfirmButton: false, timer: 2000, });
        console.log("Create Product Saga Error ::: ", error?.response?.data)
    }
}

function* updateAstromallProduct(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield call(axios.post, `${api_url + update_astro_mall_product}`, payload?.data);
        console.log("Update Product Saga Response ::: ", data)

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Updated Successfully", showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete)
            yield put({ type: actionTypes.GET_ASTRO_MALL_PRODUCT, payload: null })
        }
    } catch (error) {
        console.log("Update Product Saga Error ::: ", error?.response?.data)
    }
}

function* deleteAstromallProduct(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const result = yield Swal.fire({ title: `Are You Sure ?`, text: "You Want To Delete!!!", icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: "grey", confirmButtonText: "Delete", })

        if (result.isConfirmed) {
            const { data } = yield call(axios.post, `${api_url + delete_astro_mall_product}`, payload);
            console.log("Delete Product Saga Response ::: ", data)
            if (data?.success) {
                Swal.fire({ icon: "success", title: "Deleted Successfully", showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_ALL_PRODUCTS, payload: null })
            }
        }
    } catch (error) {
        Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Delete", showConfirmButton: false, timer: 2000, });
        console.log("Delete Product Saga Error ::: ", error?.response?.data)
    }
}

// ALL_PRODUCTS
function* getAllProducts() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(axios.get, `${api_url + get_all_products}`, { categoryId: "66694b268dc54bbd7fbc3743" });
        console.log("Get Astromall Product Saga Response ::: ", data)

        if (data?.success) {
            yield put({ type: actionTypes.SET_ALL_PRODUCTS, payload: data?.products });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astromall Product Saga Error ::: ", error)
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
            Swal.fire({ icon: "success", title: "Updated Successfully", showConfirmButton: false, timer: 2000, });
            yield put({ type: actionTypes.GET_ORDER_HISTORY, payload: null })

        }

    } catch (error) {
        console.log("Update Astropuja Puja Saga Error ::: ", error?.response?.data)
    }
}



export default function* astromallSaga() {
    yield takeLeading(actionTypes?.GET_ASTRO_MALL_CATEGORY, getAstromallCategory);
    yield takeLeading(actionTypes?.CREATE_ASTRO_MALL_CATEGORY, createAstromallCategory);
    yield takeLeading(actionTypes?.UPDATE_ASTRO_MALL_CATEGORY, updateAstromallCategory);
    yield takeLeading(actionTypes?.DELETE_ASTRO_MALL_CATEGORY, deleteAstromallCategory);

    yield takeLeading(actionTypes?.GET_ASTRO_MALL_PRODUCT, getAstromallProduct);
    yield takeLeading(actionTypes?.CREATE_ASTRO_MALL_PRODUCT, createAstromallProduct);
    yield takeLeading(actionTypes?.UPDATE_ASTRO_MALL_PRODUCT, updateAstromallProduct);
    yield takeLeading(actionTypes?.DELETE_ASTRO_MALL_PRODUCT, deleteAstromallProduct);

    yield takeLeading(actionTypes?.GET_ALL_PRODUCTS, getAllProducts);
    yield takeLeading(actionTypes?.GET_ORDER_HISTORY, getOrderHistory);
    yield takeLeading(actionTypes?.CHANGE_ORDER_STATUS, changeOrderStatus);
}
