import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderSuccess() {
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.user);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-6">
            <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-12 max-w-lg w-full text-center border">

                <div className="flex justify-center mb-4">
                    <CheckCircle
                        size={80}
                        className="text-green-500 sm:w-24 sm:h-24"
                    />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                    Order Placed Successfully 🎉
                </h1>

                <p className="text-gray-600 text-sm sm:text-base mb-8">
                    Thank you for your purchase. Your payment has been received
                    and your order is being processed.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate("/products")}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition"
                    >
                        Continue Shopping
                    </button>

                    <button
                        onClick={() => navigate(`/profile/${user._id}`)}
                        className="flex-1 border border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold py-3 rounded-xl transition"
                    >
                        View My Orders
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;