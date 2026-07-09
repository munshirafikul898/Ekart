import { setCart } from "@/redux/productSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function ProductDesc({ product }) {
    const accessToken = localStorage.getItem("accessToken");
    const dispatch = useDispatch();

    const addToCart = async (productId) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/cart/add",
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (res.data.success) {
                toast.success("Product added to Cart");
                dispatch(setCart(res.data.cart));
            }
        } catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Failed to add product");
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-md border border-pink-100 p-4 sm:p-6 lg:p-8 flex flex-col gap-5">

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                {product.productName}
            </h1>

            <div>
                <span className="text-2xl sm:text-3xl font-bold text-pink-500">
                    ₹{product.productPrice}
                </span>
            </div>

            <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    Description
                </h2>

                <p className="text-sm sm:text-base text-gray-600 leading-7">
                    {product.productDesc}
                </p>
            </div>

            <div className="pt-2">
                <button
                    onClick={() => addToCart(product._id)}
                    className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 transition duration-300 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg cursor-pointer"
                >
                    Add to Cart
                </button>
            </div>

        </div>
    );
}

export default ProductDesc;