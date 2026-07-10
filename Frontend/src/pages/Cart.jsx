import { setCart } from "@/redux/productSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Cart() {
    const { cart } = useSelector((store) => store.product);

    const subtotal = cart?.totalPrice || 0;
    const tax = Math.floor(subtotal * 0.05);
    const shipping = subtotal > 299 ? 0 : 49;
    const total = subtotal + tax + shipping;
    const accessToken=localStorage.getItem("accessToken");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleUpdateQuantity= async (productId,type)=>{
        try {
            const res=await axios.put("https://ekart-9pu9.onrender.com/api/v1/cart/update",{productId,type},{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if(res.data.success){
                dispatch(setCart(res.data.cart));
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleRemove= async (productId)=>{
        try {
            const res=await axios.delete("https://ekart-9pu9.onrender.com/api/v1/cart/remove",{

                headers:{
                    Authorization: `Bearer ${accessToken}`
                },
                data:{productId}
            })
            if((await res).data.success){
                dispatch(setCart((await res).data.cart));
                toast.success("Product Remove from your Cart")
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const loadCart=async ()=>{
        try {
            const res=await axios.get("https://ekart-9pu9.onrender.com/api/v1/cart",{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if(res.data.success){
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        loadCart();
    },[dispatch]);

    return (
        <div className="min-h-screen bg-pink-50 p-4">

            <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
                Shopping Cart
            </h1>

            {cart?.items?.length > 0 ? (

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2 space-y-4">

                        {cart.items.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow-sm p-4 flex gap-4 relative"
                            >
                                <img
                                    src={item?.productId?.productImg?.[0]?.url}
                                    alt=""
                                    className="w-32 h-32 object-contain bg-white rounded-lg border p-2"
                                />

                                <div className="flex-1">

                                    <h2 className="text-xs font-medium text-gray-800 leading-5 w-full">
                                        {item?.productId?.productName}
                                    </h2>

                                    <p className="text-pink-600 font-bold text-sm mt-2">
                                        ₹{(item?.price)*(item?.quantity)}
                                    </p>

                                    <div className="flex items-center gap-3 mt-3">

                                        <p className="text-sm font-medium text-gray-600">
                                            Quantity:
                                        </p>

                                        <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">

                                            <button onClick={()=>handleUpdateQuantity(item.productId._id,'decrease')} className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow text-pink-500 font-bold hover:bg-pink-500 hover:text-white transition cursor-pointer">
                                                -
                                            </button>

                                            <span className="text-sm font-semibold text-gray-700">
                                                {item?.quantity}
                                            </span>

                                            <button  onClick={()=>handleUpdateQuantity(item.productId._id,'increase')} className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow text-pink-500 font-bold hover:bg-pink-500 hover:text-white transition cursor-pointer">
                                                +
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                <button onClick={()=>handleRemove(item.productId._id)} className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-md text-xs cursor-pointer">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-5 h-fit sticky top-20">

                        <h2 className="text-lg font-bold text-gray-800 border-b pb-3">
                            Order Summary
                        </h2>

                        <div className="space-y-3 mt-4 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Subtotal
                                </span>

                                <span className="font-medium">
                                    ₹{subtotal}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Tax (5%)
                                </span>

                                <span className="font-medium">
                                    ₹{tax}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Shipping
                                </span>

                                <span className="font-medium">
                                    {shipping === 0 ? "Free" : `₹${shipping}`}
                                </span>
                            </div>

                            <div className="border-t pt-3 flex justify-between">
                                <span className="font-bold text-gray-800">
                                    Total
                                </span>

                                <span className="font-bold text-pink-600 text-lg">
                                    ₹{total}
                                </span>
                            </div>
                        </div>

                        <button
                        onClick={()=>navigate('/address')}
                         className="w-full mt-5 bg-pink-500 hover:bg-pink-600 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer transition">
                            Place Order
                        </button>

                        {shipping === 0 && (
                            <p className="text-green-600 text-xs mt-3 text-center">
                                You got free shipping 🎉
                            </p>
                        )}
                    </div>
                </div>

            ) : (

                <div className="flex flex-col items-center justify-center mt-16">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                        alt="empty cart"
                        className="w-28 mb-4 opacity-80"
                    />

                    <h2 className="text-xl font-bold text-gray-700">
                        Your Cart is Empty
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Add products to start shopping.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Cart;