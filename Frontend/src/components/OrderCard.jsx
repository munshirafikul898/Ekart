import { Package } from "lucide-react";

function OrderCard({ userOrder }) {
    return (
        <div className="max-w-6xl mx-auto px-3 sm:px-5 py-2">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                My Orders
            </h1>

            {userOrder?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[40vh] text-center">
                    <Package
                        size={70}
                        className="text-gray-400 mb-4"
                    />

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
                        No Orders Found
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        You haven't placed any orders yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {userOrder.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white border rounded-2xl shadow-sm overflow-hidden"
                        >
                            <div className="bg-gray-50 p-4 border-b grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Order ID
                                    </p>

                                    <p className="font-medium text-xs sm:text-sm break-all">
                                        {order._id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>

                                    <span
                                        className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${order.status === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Amount
                                    </p>

                                    <p className="font-bold text-lg text-pink-600">
                                        ₹{order.amount}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                {order.products.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex flex-col sm:flex-row gap-4 border rounded-xl p-3"
                                    >
                                        <div className="w-full sm:w-36 h-44 sm:h-28 border rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                            <img
                                                src={item.productId?.productImg?.[0]?.url}
                                                alt={item.productId?.productName}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-center">
                                            <h3 className="font-semibold text-base sm:text-lg">
                                                {item.productId?.productName}
                                            </h3>

                                            <p className="text-gray-500 text-sm mt-1">
                                                Quantity: {item.quantity}
                                            </p>

                                            <p className="text-pink-600 font-bold text-lg mt-2">
                                                ₹{item.productId?.productPrice}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-50 p-4 border-t">
                                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600">
                                    <span>Tax: ₹{order.tax}</span>

                                    <span>Shipping: ₹{order.shipping}</span>

                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderCard;