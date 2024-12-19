import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",   // default header for JSON requests
    },
});

// Add token to Authorization header
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Error attaching token to headers:", error);
        return Promise.reject(error);   // reject request if there's an error
    }
);

export default instance;
