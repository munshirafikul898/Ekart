import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function UserInfo() {
    const params = useParams();
    const userId = params.userId;

    const accessToken = localStorage.getItem("accessToken");

    const [updateUser, setUpdateUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        address: "",
        zipCode: "",
        city: "",
        role: "user",
        profilePic: "",
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setUpdateUser({
            ...updateUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);

            setUpdateUser({
                ...updateUser,
                profilePic: URL.createObjectURL(selectedFile),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("firstName", updateUser.firstName);
            formData.append("lastName", updateUser.lastName);
            formData.append("email", updateUser.email);
            formData.append("phoneNo", updateUser.phoneNo);
            formData.append("address", updateUser.address);
            formData.append("zipCode", updateUser.zipCode);
            formData.append("city", updateUser.city);
            formData.append("role", updateUser.role);

            if (file) {
                formData.append("file", file);
            }

            const res = await axios.put(
                `http://localhost:8000/api/v1/user/update/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update user");
        }
    };


    const getUserDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/get-user/${userId}`)
            if (res.data.success) {
                setUpdateUser(res.data.user);
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <div className="min-h-screen  p-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-3">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit User Information
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Update user details, manage permissions, and maintain
                        account information.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-3">
                        <div className="bg-gray-50 border-r p-8 flex flex-col items-center">
                            <img
                                src={
                                    updateUser?.profilePic ||
                                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                alt="Profile"
                                className="w-36 h-36 rounded-full object-cover border-4 border-pink-500"
                            />

                            <label className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg cursor-pointer text-sm">
                                Change Picture

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>

                            <h2 className="mt-5 text-xl font-semibold text-center">
                                {updateUser?.firstName || "First Name"}{" "}
                                {updateUser?.lastName || "Last Name"}
                            </h2>

                            <p className="text-gray-500 text-sm text-center">
                                {updateUser?.email || "user@email.com"}
                            </p>

                            <div
                                className={`mt-4 px-4 py-1 rounded-full text-sm font-medium ${updateUser?.role === "admin"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-blue-100 text-blue-600"
                                    }`}
                            >
                                {updateUser?.role === "admin"
                                    ? "Administrator"
                                    : "Customer Account"}
                            </div>
                        </div>
                        <div className="md:col-span-2 p-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Account Details
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                            >
                                <div>
                                    <label className="block text-md font-medium mb-1">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        value={updateUser.firstName}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-2 focus:outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-md font-medium mb-1">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={updateUser.lastName}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-2 focus:outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-md font-medium mb-1">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={updateUser.email}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-2 focus:outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-md font-medium mb-1">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        name="phoneNo"
                                        value={updateUser.phoneNo}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-2 focus:outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-md font-medium mb-1">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        name="address"
                                        value={updateUser.address}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-2 focus:outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-md font-medium mb-1">
                                        Zip Code
                                    </label>

                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={updateUser.zipCode}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-2 focus:outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-md font-medium mb-1">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={updateUser.city}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-2 focus:outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-md font-medium mb-3">
                                        User Role
                                    </label>

                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="user"
                                                checked={updateUser.role === "user"}
                                                onChange={handleChange}
                                                className="w-4 h-4 accent-pink-500"
                                            />
                                            <span>User</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="admin"
                                                checked={updateUser.role === "admin"}
                                                onChange={handleChange}
                                                className="w-4 h-4 accent-pink-500"
                                            />
                                            <span>Admin</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="md:col-span-2 mt-4">
                                    <Button
                                        type="submit"
                                        className="w-full text-center bg-pink-500 hover:bg-pink-600 py-4 text-base font-medium"
                                    >
                                        Save User Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;