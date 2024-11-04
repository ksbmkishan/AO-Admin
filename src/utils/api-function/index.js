import axios from "axios";
import { api_urls } from "../api-urls";

export const getAPI = async (url) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.get(api_urls + url, { headers: { Authorization: 'Bearer ' + token } })
    return response;
}

export const postAPI = async (url, payload) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.post(api_urls + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const putAPI = async (url, payload) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.put(api_urls + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const patchAPI = async (url, payload) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.patch(api_urls + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const deleteAPI = async (url) => {
    const token = localStorage.getItem('access_token');

    const response = await axios.delete(api_urls + url, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}