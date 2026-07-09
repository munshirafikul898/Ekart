import { Button } from "@/components/ui/button";
import axios from "axios";
import { Edit, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const navigate=useNavigate();

    const getAllUsers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8000/api/v1/user/all-user",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (res.data.success) {
                setUsers(res.data.users);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="p-3">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    User Management Dashboard
                </h1>
                <h2 className="text-gray-500 mt-1">
                    Manage user accounts, view profiles, and monitor customer
                    activity.
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="bg-pink-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border">
                        <div className="flex flex-col items-center">
                            <img
                                src={
                                    user.profilePic ||
                                    "https://tse1.mm.bing.net/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?pid=Api&P=0&h=180"
                                }
                                alt="profile"
                                className="w-24 h-24 rounded-full object-cover border-2 border-pink-600"/>
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                {user?.firstName} {user?.lastName}
                            </h3>
                            <p className="text-sm text-gray-500 text-center mt-1">
                                {user?.email}
                            </p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button className="flex-1" onClick={()=>navigate(`/dashboard/users/${user?._id}`)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                            <Button onClick={()=>navigate(`/dashboard/users/orders/${user?._id}`)}
                                variant="outline"
                                className="flex-1"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                Orders
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminUsers;