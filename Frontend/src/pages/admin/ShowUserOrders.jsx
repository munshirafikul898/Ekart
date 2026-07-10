import OrderCard from "@/components/OrderCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ShowUserOrders() {
    const { userId } = useParams();

    const accessToken = localStorage.getItem("accessToken");

    const [userOrder, setUserOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserOrders = async () => {
        try {
            const res = await axios.get(
                `https://ekart-9pu9.onrender.com/api/v1/orders/user-order/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (res.data.success) {
                setUserOrder(res.data.orders);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Failed to load orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <h2 className="text-xl font-semibold">
                    Loading Orders...
                </h2>
            </div>
        );
    }

    return (
        <div className="w-full">
            <OrderCard userOrder={userOrder} />
        </div>
    );
}

export default ShowUserOrders;