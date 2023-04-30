import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = 'http://localhost:8080/api/v1';
export const AXIOS = axios.create({
    baseURL:BASE_URL
});

export const PRIVATE_AXIOS = axios.create({
    baseURL:BASE_URL
})

PRIVATE_AXIOS.interceptors.request.use((config) => {
    const token = getToken();
    if(token){
        config.headers.Authorization='Bearer '+token;
        console.log(config.headers.Authorization);
        console.log(config);
    }
    return config;
}, (error) => Promise.reject(error));