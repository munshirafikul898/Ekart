import axios from "axios";
import { useEffect, useState } from "react";
import { Package } from "lucide-react";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const accessToken = localStorage.getItem("accessToken");

    const getAllOrders = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8000/api/v1/orders/all",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (res.data.success) {
                setOrders(res.data.orders);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <h2 className="text-lg sm:text-xl font-semibold">
                    Loading Orders...
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-5">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                All Orders
            </h1>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                    <Package
                        size={80}
                        className="text-gray-400 mb-4"
                    />

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
                        No Orders Found
                    </h2>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white border rounded-2xl shadow-sm overflow-hidden"
                        >
                            <div className="bg-gray-50 p-4 border-b grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Order ID
                                    </p>

                                    <p className="font-medium text-sm break-all">
                                        {order._id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Customer
                                    </p>

                                    <p className="font-medium">
                                        {order.user?.firstName}{" "}
                                        {order.user?.lastName}
                                    </p>

                                    <p className="text-sm text-gray-500 break-all">
                                        {order.user?.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>

                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                            order.status === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Amount
                                    </p>

                                    <p className="font-bold text-pink-600">
                                        ₹{order.amount}
                                    </p>
                                </div>

                            </div>

                            <div className="p-4 space-y-4">
                                {order.products.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border rounded-lg p-3"
                                    >
                                        <div>
                                            <h3 className="font-semibold break-words">
                                                {item.productId?.productName}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-medium text-pink-600 sm:text-right">
                                            ₹{item.productId?.productPrice}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-50 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">

                                <span>
                                    Tax: ₹{order.tax}
                                </span>

                                <span>
                                    Shipping: ₹{order.shipping}
                                </span>

                                <span className="sm:text-right">
                                    {new Date(order.createdAt).toLocaleString()}
                                </span>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminOrders;