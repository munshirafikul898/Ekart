import axios from "axios";
import { useEffect, useState } from "react";
import {
    Users,
    ShoppingBag,
    Package,
    IndianRupee,
} from "lucide-react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function AdminSales() {
    const accessToken = localStorage.getItem("accessToken");

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalSales: 0,
        salesByDate: [],
    });

    const fetchStats = async () => {
        try {
            const res = await axios.get(
                "https://ekart-9pu9.onrender.com/api/v1/orders/sales",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(res.data);

            if (res.data.success) {
                setStats({
                    totalUsers: res.data.totalUsers,
                    totalProducts: res.data.totalProducts,
                    totalOrders: res.data.totalOrders,
                    totalSales: res.data.totalSales,
                    salesByDate: res.data.sales || [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const chartData = {
        labels: stats.salesByDate.map((item) => item.date),
        datasets: [
            {
                label: "Sales",
                data: stats.salesByDate.map((item) => item.amount),
                borderColor: "#ec4899",
                backgroundColor: "rgba(236,72,153,0.2)",
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `₹${context.raw.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Revenue (₹)",
                },
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <h1 className="text-3xl font-bold mb-6">
                Sales Dashboard
            </h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                <div className="bg-white rounded-2xl shadow p-5">
                    <Users className="text-pink-500 mb-2" />
                    <h3 className="text-gray-500 text-sm">Users</h3>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>

                <div className="bg-white rounded-2xl shadow p-5">
                    <ShoppingBag className="text-blue-500 mb-2" />
                    <h3 className="text-gray-500 text-sm">Products</h3>
                    <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>

                <div className="bg-white rounded-2xl shadow p-5">
                    <Package className="text-green-500 mb-2" />
                    <h3 className="text-gray-500 text-sm">Orders</h3>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>

                <div className="bg-white rounded-2xl shadow p-5">
                    <IndianRupee className="text-orange-500 mb-2" />
                    <h3 className="text-gray-500 text-sm">Revenue</h3>
                    <p className="text-2xl font-bold">
                        ₹{stats.totalSales.toLocaleString()}
                    </p>
                </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-5">
                    Sales Trend
                </h2>

                {stats.salesByDate.length === 0 ? (
                    <div className="h-[400px] flex items-center justify-center text-gray-500">
                        No sales data available.
                    </div>
                ) : (
                    <div className="w-full h-[400px]">
                        <Line
                            data={chartData}
                            options={options}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminSales;