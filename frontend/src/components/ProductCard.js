import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Check for a static token
        const token = localStorage.getItem("token");

        if (token) {
            // Simulate valid token → go to template
            navigate("/template");
        } else {
            // No token → go to login
            navigate("/login");
        }
    };

    return (
        <div className="mt-4 sm:mt-6 lg:mt-8 flex items-center justify-center" onClick={handleClick}>
            <div className="w-full max-w-xs sm:max-w-sm lg:w-64 bg-darkGrey rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-custom transition-transform hover:scale-105">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/${product.image}`}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 lg:h-64 rounded-t-xl object-cover"
                />
                <div className="flex flex-col items-start gap-2 px-4 py-4 pb-4 w-full">
                    <p className="text-lg sm:text-xl font-semibold text-black">{product.name}</p>
                    <p className="text-sm font-normal text-lightGrey">
                        {product.description}
                    </p>
                    <p className="text-base font-medium text-black mt-2">
                        ₹{product.price.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;


// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const ProductCard = ({ product }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         const token = localStorage.getItem("token");

//         if (token) {
//             try {
//                 // Decode token to check expiry
//                 const decoded = jwtDecode(token);
//                 const currentTime = Date.now() / 1000;

//                 if (decoded.exp && decoded.exp > currentTime) {
//                     // Token valid → go to template
//                     navigate("/template");
//                 } else {
//                     // Token expired → remove it & go to login
//                     localStorage.removeItem("token");
//                     navigate("/login");
//                 }
//             } catch (error) {
//                 console.error("Invalid token:", error);
//                 navigate("/login");
//             }
//         } else {
//             // No token → go to login
//             navigate("/login");
//         }
//     };

//     return (
//         <div className="mt-8 flex items-center gap-6" onClick={handleClick}>
//             <div className="w-64 bg-darkGrey rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-custom transition-transform hover:scale-105">
//                 <img
//                     src={`/assets/${product.image}`}
//                     alt={product.name}
//                     className="w-64 h-64 rounded-t-xl object-cover"
//                 />
//                 <div className="flex flex-col items-start gap-2 px-4 py-4 pb-4">
//                     <p className="text-xl font-semibold text-black">{product.name}</p>
//                     <p className="text-sm font-normal text-lightGrey">
//                         {product.description}
//                     </p>
//                     <p className="text-base font-medium text-black mt-10">
//                         {product.price}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;
