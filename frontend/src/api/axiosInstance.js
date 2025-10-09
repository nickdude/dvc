import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_SUPERADMIN_TOKEN}`,
    },
});

export default axiosInstance;
