import ImageUpload from "@/components/imageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddProduct() {
    const [loading, setLoading] = useState(false);
    const { products } = useSelector(store => store.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const [productData, setProductData] = useState({
        productName: "",
        productPrice: 0,
        productDesc: "",
        ProductImg: [],
        brand: "",
        category: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductData((prev) => ({
            ...prev,
            [name]:
                name === "productPrice"
                    ? Number(value)
                    : value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productName", productData.productName);
        formData.append("productPrice", productData.productPrice);
        formData.append("productDesc", productData.productDesc);
        formData.append("brand", productData.brand);
        formData.append("category", productData.category);

        if (productData.ProductImg.length === 0) {
            toast.error("Please select at least one image");
            return;
        }

        productData.ProductImg.forEach((img) => {
            formData.append("files", img.file);
        });

        try {
            setLoading(true);

            const res = await axios.post(
                "https://ekart-9pu9.onrender.com/api/v1/product/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (res.data.success) {
                toast.success("Product added successfully");

                dispatch(
                    setProducts([...products, res.data.product])
                );
                setTimeout(() => {
                    navigate("/dashboard/products");
                }, 1000);
                setProductData({
                    productName: "",
                    productPrice: 0,
                    productDesc: "",
                    ProductImg: [],
                    brand: "",
                    category: "",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center px-3 sm:px-5">
            <Card className="w-full max-w-3xl shadow-lg border rounded-2xl">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-pink-600 text-center">
                        Add Product
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5 p-4 sm:p-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="productName"
                            value={productData.productName}
                            onChange={handleChange}
                            placeholder="Enter product name"
                           className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Product Price
                        </label>

                        <input
                            type="number"
                            name="productPrice"
                            min={0}
                            value={productData.productPrice}
                            onChange={handleChange}
                            placeholder="Enter product price"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                                Product Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                placeholder="Enter product category"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                                Product Brand
                            </label>

                            <input
                                type="text"
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
                                placeholder="Enter product brand"
                               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Product Description
                        </label>

                        <textarea
                            name="productDesc"
                            rows="4"
                            value={productData.productDesc}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                        />
                    </div>

                    <div className="pt-2">
                        <ImageUpload productData={productData} setProductData={setProductData} />
                    </div>

                    <button
                        onClick={submitHandler}
                        disabled={loading}
                        className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        {loading && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}

                        {loading ? "Adding Product..." : "Add Product"}
                    </button>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddProduct;