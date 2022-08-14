import axios from "axios";
import queryString from 'query-string'

import { apiConfig } from "./config";

const axiosClient = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey })
})

axiosClient.interceptors.request.use((config) => config)

axiosClient.interceptors.request.use((response) => {

    if (response && response.data) {
        return response.data
    }

    return response
})


export default axiosClient