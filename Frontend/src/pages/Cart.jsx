import { setCart } from "@/redux/productSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Cart() {
    const { cart } = useSelector((store) => store.product);

    const subtotal = cart?.totalPrice || 0;
    const tax = Math.floor(subtotal * 0.05);
    const shipping = subtotal > 299 ? 0 : 49;
    const total = subtotal + tax + shipping;
    const accessToken = localStorage.getItem("accessToken");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateQuantity = async (productId, type) => {
        try {
            const res = await axios.put("https://ekart-9pu9.onrender.com/api/v1/cart/update", { productId, type }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(setCart(res.data.cart));
            }
        } catch (error) {
            console.log(error);

        }
    }

    const handleRemove = async (productId) => {
        try {
            const res = await axios.delete("https://ekart-9pu9.onrender.com/api/v1/cart/remove", {

                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: { productId }
            })
            if ((await res).data.success) {
                dispatch(setCart((await res).data.cart));
                toast.success("Product Remove from your Cart")
            }
        } catch (error) {
            console.log(error);

        }
    }

    const loadCart = async () => {
        try {
            const res = await axios.get("https://ekart-9pu9.onrender.com/api/v1/cart", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (accessToken) {
            loadCart();
        } else {
            dispatch(
                setCart({
                    items: [],
                    totalPrice: 0,
                })
            );
        }
    }, [accessToken, dispatch]);

    return (
        <div className="min-h-screen bg-pink-50 p-4">

            <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
                Shopping Cart
            </h1>

            {cart?.items?.length > 0 ? (

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-5">

                        {cart.items.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
                            >
                                <div className="flex gap-6 items-start">

                                    <div className="w-28 sm:w-32 lg:w-52">

                                        <img
                                            src={item?.productId?.productImg?.[0]?.url}
                                            alt=""
                                            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 object-contain bg-white rounded-xl border p-3"
                                        />
                                        <div className="lg:hidden">

                                            <p className="text-pink-600 font-bold text-sm mt-2">
                                                ₹{item?.price * item?.quantity}
                                            </p>

                                            <div className="flex items-center gap-2 mt-2">

                                                <button
                                                    onClick={() => handleUpdateQuantity(item.productId._id, "decrease")}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-pink-500 font-bold"
                                                >
                                                    -
                                                </button>

                                                <span className="text-sm font-semibold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => handleUpdateQuantity(item.productId._id, "increase")}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-pink-500 font-bold"
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                onClick={() => handleRemove(item.productId._id)}
                                                className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-md text-xs"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                        <div className="hidden lg:block mt-5">
                                            <div className="flex-1 flex flex-col min-h-[150px]">

                                                <h2 className="text-sm lg:text-xl font-semibold text-gray-800 leading-relaxed">
                                                    {item?.productId?.productName}
                                                </h2>


                                                {/* Desktop Price + Quantity + Remove */}
                                                <div className="hidden lg:block mt-8">

                                                    <p className="text-pink-600 font-bold text-lg">
                                                        ₹{item?.price * item?.quantity}
                                                    </p>

                                                    <div className="flex items-center gap-3 mt-3">

                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.productId._id, "decrease")}
                                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-pink-500 font-bold"
                                                        >
                                                            -
                                                        </button>

                                                        <span className="font-semibold">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.productId._id, "increase")}
                                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-pink-500 font-bold"
                                                        >
                                                            +
                                                        </button>

                                                    </div>


                                                    <button
                                                        onClick={() => handleRemove(item.productId._id)}
                                                        className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg text-sm"
                                                    >
                                                        Remove
                                                    </button>

                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex-1 flex flex-col justify-between min-h-[150px]">

                                        <h2 className="text-sm lg:text-xl font-semibold text-gray-800 leading-relaxed">
                                            {item?.productId?.productName}
                                        </h2>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-7 h-fit sticky top-24 border border-pink-100">

                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-4 mt-6 text-base">

                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Subtotal
                                </span>

                                <span className="font-medium">
                                    ₹{subtotal}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Tax (5%)
                                </span>

                                <span className="font-medium">
                                    ₹{tax}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Shipping
                                </span>

                                <span className="font-medium">
                                    {shipping === 0 ? "Free" : `₹${shipping}`}
                                </span>
                            </div>

                            <div className="border-t pt-5 flex justify-between">
                                <span className="font-bold text-gray-800">
                                    Total
                                </span>

                                <span className="font-bold text-pink-600 text-2xl">
                                    ₹{total}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/address')}
                            className="w-full mt-7 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300">
                            Place Order
                        </button>

                        {shipping === 0 && (
                            <p className="text-green-600 text-xs mt-3 text-center">
                                You got free shipping 🎉
                            </p>
                        )}
                    </div>
                </div>

            ) : (

                <div className="flex flex-col items-center justify-center mt-16">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                        alt="empty cart"
                        className="w-28 mb-4 opacity-80"
                    />

                    <h2 className="text-xl font-bold text-gray-700">
                        Your Cart is Empty
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Add products to start shopping.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Cart;