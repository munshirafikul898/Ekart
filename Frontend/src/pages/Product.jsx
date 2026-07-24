import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Product() {
    const products = useSelector((state) => state.product?.products || []);

    const [allProduct, setAllProduct] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 999999]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [brand, setBrand] = useState("All");
    const [sortOrder, setSortOrder] = useState("");

    const dispatch = useDispatch();

    const getAllProduct = async () => {
        try {
            const res = await axios.get(
                "https://ekart-9pu9.onrender.com/api/v1/product/getallproducts"
            );

            if (res.data.success) {
                setAllProduct(res.data.products);
                dispatch(setProducts(res.data.products));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (allProduct.length === 0) return;

        let filtered = [...allProduct];

        const searchText = search.trim().toLowerCase();

        if (searchText !== "") {
            filtered = filtered.filter(
                (p) =>
                    p.productName?.trim().toLowerCase().includes(searchText) ||
                    p.category?.trim().toLowerCase().includes(searchText) ||
                    p.brand?.trim().toLowerCase().includes(searchText)
            );
        }

        if (category !== "All") {
            filtered = filtered.filter((p) => p.category === category);
        }

        if (brand !== "All") {
            filtered = filtered.filter((p) => p.brand === brand);
        }

        filtered = filtered.filter(
            (p) =>
                p.productPrice >= priceRange[0] &&
                p.productPrice <= priceRange[1]
        );

        if (sortOrder === "Price:Low to High") {
            filtered.sort((a, b) => a.productPrice - b.productPrice);
        } else if (sortOrder === "Price:High to Low") {
            filtered.sort((a, b) => b.productPrice - a.productPrice);
        }

        dispatch(setProducts(filtered));
    }, [
        search,
        category,
        brand,
        priceRange,
        sortOrder,
        allProduct,
        dispatch,
    ]);

    useEffect(() => {
        getAllProduct();
    }, []);

    return (
        <div className="w-full min-h-screen bg-pink-50">
            <div className="max-w-7xl mx-auto px-4 py-6">

                <div className="flex flex-col lg:flex-row gap-6">

                    <div className="w-full lg:w-64 lg:shrink-0">
                        <FilterSidebar
                            search={search}
                            setSearch={setSearch}
                            category={category}
                            setCategory={setCategory}
                            brand={brand}
                            setBrand={setBrand}
                            allProduct={allProduct}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setSortOrder={setSortOrder}
                        />
                    </div>

                    <div className="flex-1">

                        <div className="hidden lg:flex justify-end mb-6">
                            <Select
                                value={sortOrder}
                                onValueChange={setSortOrder}
                            >
                                <SelectTrigger className="w-full sm:w-60 bg-white">
                                    <SelectValue placeholder="Sort By Price" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Price:Low to High">
                                            Price:Low to High
                                        </SelectItem>

                                        <SelectItem value="Price:High to Low">
                                            Price:High to Low
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
                                No Products Found
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Product;