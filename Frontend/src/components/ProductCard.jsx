import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart} from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate=useNavigate();
    const { productName, productImg, productPrice } = product;
    const accessToken=localStorage.getItem('accessToken');
    const dispatch=useDispatch();

    const addToCart=async (productId)=>{
        try {
            const res=await axios.post("https://ekart-9pu9.onrender.com/api/v1/cart/add",{productId},{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if(res.data.success){
                toast.success('Product add to Cart');
                dispatch(setCart(res.data.cart));
            }
        } catch (error) {
            console.log(error.response?.data);
            
        }
    }

    return (
        <div className="group bg-white rounded-lg overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full max-w-[190px]">
            <div className="w-full h-36 overflow-hidden flex items-center justify-center p-1">
                <img
                    src={productImg[0]?.url}
                    alt={productName}
                    onClick={()=>navigate(`/products/${product._id}`)}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-2.5">
                <h1 className="text-[10px] font-semibold text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors duration-300">
                    {productName}
                </h1>

                <div className="flex items-center justify-between mt-1.5">
                    <h2 className="text-[12px] font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                        ₹{productPrice}
                    </h2>
                </div>

                <Button onClick={()=>addToCart(product._id)} className="w-full mt-2 h-7 rounded-md bg-pink-500 hover:bg-pink-600 text-white text-[11px] font-medium cursor-pointer transition-all duration-300">
                    <ShoppingBag className="w-3 h-3 mr-1.5" />
                    Add to cart
                </Button>
            </div>
        </div>
    );
}

export default ProductCard;