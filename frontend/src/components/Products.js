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
        <div id="process" className='w-100 flex items-center flex-col justify-center py-20'>
            <h2 className='text-4xl font-semibold font-inter leading-10'>A mini-website in your pocket</h2>
            <p className='text-base font-normal leading-5 font-inter mt-2 text-lightGrey'>The smarter, modern alternative to traditional business cards.</p>
            <div className='w-100 flex items-center justify-center gap-8 flex-wrap mt-8 px-4'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </div>
    )
}

export default Products