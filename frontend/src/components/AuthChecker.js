import { useEffect, useState } from "react";
import axios from "../api/axiosInstance"; // your base axios instance
import { useNavigate } from "react-router-dom";

const AuthChecker = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return; // no token → stay on login page
        }

        axios
            .get("/auth/verify-token", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                navigate("/plans"); // ✅ valid token → skip login
            })
            .catch(() => {
                localStorage.removeItem("token"); // ❌ invalid token → force login
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) return <p>Loading...</p>;

    return children;
};

export default AuthChecker;
