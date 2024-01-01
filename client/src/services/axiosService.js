import axios from "axios";

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

axiosInstance.interceptors.request.use((req) => {
    if(localStorage.getItem("token")){
        req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
    return req
})

export default axiosInstance;