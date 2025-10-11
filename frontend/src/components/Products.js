import ProductCard from "./ProductCard"
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axiosInstance.get("/card-design", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProducts(res?.data?.data);
                setError("");
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load plans");
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    return (
        <div id="process" className='w-full flex items-center flex-col justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold font-inter leading-tight lg:leading-10 text-center max-w-4xl'>A mini-website in your pocket</h2>
            <p className='text-sm sm:text-base font-normal leading-5 font-inter mt-2 text-lightGrey text-center max-w-2xl'>The smarter, modern alternative to traditional business cards.</p>
            <div className='w-full max-w-6xl flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 flex-wrap mt-6 sm:mt-8'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Products