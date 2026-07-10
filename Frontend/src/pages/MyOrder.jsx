import OrderCard from "@/components/OrderCard";
import axios from "axios";
import { useEffect, useState } from "react";

function MyOrder() {
    const [userOrder, setUserOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    const accessToken = localStorage.getItem("accessToken");

    const getUserOrder = async () => {
        try {
            const res = await axios.get(
                "https://ekart-9pu9.onrender.com/api/v1/orders/my-orders",
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserOrder();
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
       <OrderCard userOrder={userOrder}/>
    );
}

export default MyOrder;