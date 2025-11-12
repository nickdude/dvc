import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import PlanCard from "../components/PlanCard";
import useEqualHeight from "../hooks/useEqualHeight";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";

const PlanPage = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [userPlan, setUserPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addToast } = useToast();
    const { user, refreshUser } = useAuth();

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

    // equalize heights of plan cards after plans load
    useEqualHeight('.equal-height-card', [plans, loading]);

    const handleBuyPlan = async (plan) => {
        // New flow: create a razorpay order on the server, then open checkout (or mock verify when no key)
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                addToast('Please login to purchase a plan', { type: 'error' });
                return;
            }

            setLoading(true);

            const res = await axiosInstance.post(
                "/subscription/order",
                { planId: plan._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const payload = res?.data?.data || {};
            const order = payload.order;
            const keyId = payload.keyId; // may be null in mock mode

            // helper to load razorpay script
            const loadScript = (src) =>
                new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.onload = () => resolve(true);
                    script.onerror = () => resolve(false);
                    document.body.appendChild(script);
                });

            if (keyId) {
                // Real checkout flow
                const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
                if (!ok) throw new Error('Failed to load Razorpay checkout');

                const options = {
                    key: keyId,
                    amount: order.amount,
                    currency: order.currency,
                    name: 'DVCards',
                    description: plan.subtitle || plan.title,
                    order_id: order.id,
                    handler: async function (response) {
                        try {
                            // verify payment on server
                            await axiosInstance.post(
                                '/subscription/verify',
                                {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                    planId: plan._id,
                                },
                                { headers: { Authorization: `Bearer ${token}` } }
                            );

                            // refresh current user so subscription info is updated across the app
                            try {
                                await refreshUser();
                            } catch (e) {
                                // non-fatal - still proceed
                                console.warn('refreshUser failed after verify', e);
                            }

                            setUserPlan(plan);
                            addToast('Plan purchased successfully', { type: 'success' });
                            navigate('/smart-cards');
                        } catch (err) {
                            addToast(err.response?.data?.message || 'Payment verification failed', { type: 'error' });
                        }
                    },
                    prefill: {
                        name: (user && user.name) || '',
                        email: (user && user.email) || '',
                    },
                    theme: { color: '#3399cc' },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                // Mock flow: immediately verify with mock signature
                await axiosInstance.post(
                    '/subscription/verify',
                    {
                        razorpay_order_id: order.id,
                        razorpay_payment_id: `pay_mock_${Date.now()}`,
                        razorpay_signature: 'MOCK_SIGNATURE',
                        planId: plan._id,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                // refresh current user so subscription info is updated across the app
                try {
                    await refreshUser();
                } catch (e) {
                    console.warn('refreshUser failed after mock verify', e);
                }

                setUserPlan(plan);
                addToast('Plan purchased successfully', { type: 'success' });
                navigate('/smart-cards');
            }
        } catch (err) {
            console.error(err);
            addToast(err.response?.data?.message || err.message || 'Failed to purchase plan', { type: 'error' });
        } finally {
            setLoading(false);
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
                <div className="flex items-start justify-center gap-6 mt-6 flex-wrap">
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
