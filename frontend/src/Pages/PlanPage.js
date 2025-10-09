import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import PlanCard from "../components/PlanCard";

const PlanPage = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [userPlan, setUserPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("User's active plan updated:", userPlan);
    }, [userPlan]);

    useEffect(() => {
        console.log("Available plans updated:", plans);
    }, [plans]);

    useEffect(() => {
        const fetchPlansAndUserPlan = async () => {
            try {
                const token = localStorage.getItem("token");

                // Get all available plans
                const resPlans = await axiosInstance.get("/plans", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPlans(resPlans?.data?.data || []);

                // Get user's active plan
                const resUserPlan = await axiosInstance.get("/user-plans/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (resUserPlan?.data?.data?.length > 0) {
                    setUserPlan(resUserPlan.data.data[0].plan); // take first active plan
                }
                console.log("User's active plan:", userPlan);
                console.log("Available plans:", plans);
                setError("");
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load plans");
            } finally {
                setLoading(false);
            }
        };

        fetchPlansAndUserPlan();
    }, []);

    const handleBuyPlan = async (plan) => {
        try {
            const token = localStorage.getItem("token");
            await axiosInstance.post(
                "/user-plans",
                { planId: plan._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );


            setUserPlan(plan);
            navigate("/smart-cards");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to purchase plan");
        }
    };

    return (
        <div className="w-[100vw] min-h-screen bg-darkGrey flex items-center flex-col gap-6 pt-14">
            <div className="w-fit px-5 py-2 font-bold text-semiLightGrey bg-white rounded-full shadow-2xl">
                SELECT YOUR PLAN
            </div>

            <h1 className="text-4xl font-semibold text-black font-inter">Individual</h1>
            <p className="font-normal text-base text-lightGrey">
                Complimentary Smart Card included. -{" "}
                <span className="text-lightBlue cursor-pointer">See all features</span>
            </p>

            {loading ? (
                <p>Loading plans...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
                    {plans.map((plan) => (
                        <PlanCard
                            key={plan._id}
                            title={plan.title}
                            price={plan.price}
                            subtitle={plan.subtitle}
                            onContinue={() => handleBuyPlan(plan)}
                            disabled={userPlan?._id === plan._id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlanPage;
