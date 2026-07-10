import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { addAddress, deleteAddress, setCart, setSelectedAddress, } from "@/redux/productSlice";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function AddressForm() {
    const { cart, addresses, selectedAddress } = useSelector(
        (store) => store.product
    );
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const subtotal = cart?.totalPrice || 0;
    const tax = Math.floor(subtotal * 0.05);
    const shipping = subtotal > 299 ? 0 : 49;
    const total = subtotal + tax + shipping;
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        country: "",
        state: "",
    });

    useEffect(() => {
        setShowForm(addresses?.length === 0);
    }, [addresses]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.fullName ||
            !formData.phone ||
            !formData.email ||
            !formData.address ||
            !formData.city ||
            !formData.state ||
            !formData.country ||
            !formData.zip
        ) {
            return toast.error("Please fill all fields");
        }

        dispatch(addAddress(formData));
        dispatch(setSelectedAddress(formData));

        setFormData({
            fullName: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            zip: "",
            country: "",
            state: "",
        });

        setShowForm(false);

        toast.success("Address saved successfully");
    };

    const handleDeleteAddress = (index) => {
        const addressToDelete = addresses[index];

        if (
            selectedAddress?.email === addressToDelete.email
        ) {
            dispatch(setSelectedAddress(null));
        }

        dispatch(deleteAddress(index));

        toast.success("Address deleted");
    };

    const handlePayment = async () => {
        if (!selectedAddress) {
            return toast.error("Please select a delivery address");
        }

        if (!cart?.items?.length) {
            return toast.error("Your cart is empty");
        }

        setLoading(true);
        try {
            const { data } = await axios.post("https://ekart-9pu9.onrender.com/api/v1/orders/create-order", {
                products: cart?.items?.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                })),
                tax,
                shipping,
                amount: total,
                currency: "INR"
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!data.success) {
                return toast.error('Somethings went wrong');
            }
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,
                name: "Ekart",
                description: "Order payment",
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post("https://ekart-9pu9.onrender.com/api/v1/orders/verify-payment", response, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        })
                        if (verifyRes.data.success) {
                            toast.success("✅ Payment Successfull");
                            dispatch(setCart({ items: [], totalPrice: 0 }))
                            navigate("/order-success");
                        } else {
                            toast.error("❌ Payment verification Failed")
                        }
                    } catch (error) {
                        toast.error("Error verifying Failed")
                    }
                },
                modal: {
                    ondismiss: async function () {
                        await axios.post("https://ekart-9pu9.onrender.com/api/v1/orders/verify-payment", {
                            razorpay_order_id: data.order.id,
                            paymentFailed: true
                        }, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`
                            }
                        });
                        toast.error("Payment Failed or Cancelled")
                    }
                },
                prefill: {
                    name: selectedAddress?.fullName,
                    email: selectedAddress?.email,
                    contact: selectedAddress?.phone
                },
                theme: { color: "#F47286" }
            };
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', async function (response) {
                await axios.post("https://ekart-9pu9.onrender.com/api/v1/orders/verify-payment", {
                    razorpay_order_id: data.order.id,
                    paymentFailed: true
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                toast.error("Payment Failed.Please try again")
            })
            rzp.open();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className="max-w-7xl mx-auto p-5">
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        {showForm ? (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="border rounded-lg p-3"
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="border rounded-lg p-3"
                                    />
                                </div>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border rounded-lg p-3 w-full"
                                />

                                <textarea
                                    name="address"
                                    placeholder="Street Address"
                                    rows={3}
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="border rounded-lg p-3 w-full resize-none"
                                />

                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="border rounded-lg p-3"
                                    />

                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="border rounded-lg p-3"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="zip"
                                        placeholder="ZIP Code"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className="border rounded-lg p-3"
                                    />

                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="border rounded-lg p-3"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button type="submit">
                                        Save Address
                                    </Button>

                                    {addresses?.length > 0 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setShowForm(false)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        ) : <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    Delivery Address
                                </h2>

                                {!showForm && (
                                    <Button
                                        onClick={() => setShowForm(true)}
                                    >
                                        + Add New Address
                                    </Button>
                                )}
                            </div>
                            {!showForm && addresses?.length > 0 && (
                                <div className="space-y-4">
                                    {addresses.map((address, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                dispatch(setSelectedAddress(address))
                                            }
                                            className={`border rounded-lg p-4 cursor-pointer transition relative
                    ${selectedAddress?.email === address.email
                                                    ? "border-pink-500 bg-pink-50"
                                                    : "hover:border-pink-300"
                                                }`}
                                        >
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteAddress(index);
                                                }}
                                                className="absolute top-3 right-3 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
                                            >
                                                <Trash size={16} />
                                            </button>

                                            <h3 className="font-semibold">
                                                {address.fullName}
                                            </h3>

                                            <p className="text-sm text-gray-600 mt-1">
                                                {address.address}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                {address.city}, {address.state},{" "}
                                                {address.country}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                ZIP: {address.zip}
                                            </p>

                                            <p className="text-sm text-gray-600">
                                                Phone: {address.phone}
                                            </p>

                                            {selectedAddress?.email === address.email && (
                                                <span className="inline-block mt-2 text-xs font-medium text-green-600">
                                                    ✓ Selected Address
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        }
                    </div>
                </div>

                <div className="lg:col-span-1">

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full lg:sticky lg:top-24">

                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-gray-800">
                                Order Summary
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Review your order before payment
                            </p>
                        </div>

                        <div className="space-y-4">

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Subtotal
                                </span>

                                <span className="font-semibold text-gray-800">
                                    ₹{subtotal}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Tax (5%)
                                </span>

                                <span className="font-semibold text-gray-800">
                                    ₹{tax}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Shipping
                                </span>

                                <span
                                    className={`font-semibold ${shipping === 0
                                        ? "text-green-600"
                                        : "text-gray-800"
                                        }`}
                                >
                                    {shipping === 0 ? "FREE 🎉" : `₹${shipping}`}
                                </span>
                            </div>

                            <div className="border-t border-dashed pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-800">
                                        Total Amount
                                    </span>

                                    <span className="text-md font-bold text-pink-600">
                                        ₹{total}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {shipping === 0 && (
                            <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-1 text-center">
                                <p className="text-green-700 text-sm font-medium">
                                    🎉 Congratulations! You unlocked FREE shipping.
                                </p>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            onClick={handlePayment}
                            className={`w-full mt-6 py-2 rounded-2xl font-semibold text-base shadow-lg transition-all duration-300
    ${loading
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white cursor-pointer"
                                }`}
                        >
                            {loading ? "Processing..." : "Proceed to Payment →"}
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default AddressForm;



