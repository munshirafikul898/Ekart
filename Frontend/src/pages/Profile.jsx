
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { Button } from "../components/ui/button";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "./MyOrder";

export function Profile() {
    const params = useParams();
    const userId = params.userId;
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user);
    const accessToken = localStorage.getItem('accessToken');
    const [updateUser, setUpdateUser] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNo: user?.phoneNo,
        address: user?.address,
        city: user?.city,
        zipCode: user?.zipCode,
        profilePic: user?.profilePic,
        role: user?.role
    })
    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    }
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('firstName', updateUser.firstName);
            formData.append('lastName', updateUser.lastName);
            formData.append('email', updateUser.email);
            formData.append('phoneNo', updateUser.phoneNo);
            formData.append('address', updateUser.address);
            formData.append('zipCode', updateUser.zipCode);
            formData.append('city', updateUser.city);
            formData.append('role', updateUser.role);
            if (file) {
                formData.append('file', file);
            }
            const res = await axios.put(`http://localhost:8000/api/v1/user/update/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        }

    }
    return (
        <div className="w-full min-h-screen bg-pink-50 flex justify-center items-start pt-6 px-4">

            <Tabs
                defaultValue="profile"
                className="w-full max-w-5xl"
            >

                <TabsList className="mb-5 bg-white shadow-sm w-full sm:w-fit">
                    <TabsTrigger value="profile">
                        Profile
                    </TabsTrigger>

                    <TabsTrigger value="orders">
                        Orders
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">

                    <div className="w-full bg-white shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-6">

                        <div className="w-full md:w-1/3 flex flex-col items-center">

                            <img
                                src={updateUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt="profile"
                               className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-pink-500 object-cover"
                            />

                            <label className="mt-3 bg-pink-500 hover:bg-pink-600 cursor-pointer text-sm px-4 py-2 rounded-md text-white">
                                Change Picture

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>

                        </div>

                        <div className="w-full md:w-2/3">

                            <h1 className="text-xl font-bold text-gray-800 mb-4">
                                My Profile
                            </h1>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        value={updateUser.firstName}
                                        onChange={handleChange}
                                        className="border p-1 rounded-md text-sm outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        value={updateUser.lastName}
                                        onChange={handleChange}
                                        className="border p-1 rounded-md text-sm outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="flex flex-col sm:col-span-2">
                                    <label className="mb-1 text-sm font-medium">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={updateUser.email}
                                        onChange={handleChange}
                                        className="border p-1 rounded-md text-sm outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="flex flex-col sm:col-span-2">
                                    <label className="mb-1 text-sm font-medium">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phoneNo"
                                        placeholder="Phone number"
                                        value={updateUser.phoneNo}
                                        onChange={handleChange}
                                        className="border p-1 rounded-md text-sm outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="flex flex-col sm:col-span-2">
                                    <label className="mb-1 text-sm font-medium">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={updateUser.address}
                                        onChange={handleChange}
                                        className="border p-1 rounded-md text-sm outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        Zip Code
                                    </label>

                                    <input
                                        type="text"
                                        name="zipCode"
                                        placeholder="Zip code"
                                        value={updateUser.zipCode}
                                        onChange={handleChange}
                                        className="border p-1 rounded-md text-sm outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={updateUser.city}
                                        onChange={handleChange}
                                        className="border p-1 rounded-md text-sm outline-none focus:border-pink-500"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 cursor-pointer text-sm py-4">
                                        Save Changes
                                    </Button>
                                </div>

                            </form>

                        </div>

                    </div>

                </TabsContent>

                <TabsContent value="orders">

                    <MyOrder />

                </TabsContent>

            </Tabs>

        </div>
    );
}

export default Profile;