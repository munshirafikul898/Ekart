import { useDispatch, useSelector } from "react-redux";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Edit, Trash, Search } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";

function AdminProduct() {
    const { products } = useSelector((store) => store.product);
    const [editProduct, setEditProduct] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const [newImages, setNewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    let filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortOrder === "Price: Low to High") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => Number(a.productPrice) - Number(b.productPrice)
        );
    }

    if (sortOrder === "Price: High to Low") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => Number(b.productPrice) - Number(a.productPrice)
        );
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setNewImages((prev) => [...prev, ...files]);

        const previews = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));

        setPreviewImages((prev) => [...prev, ...previews]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProduct((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("productName", editProduct.productName);
        formData.append("productPrice", editProduct.productPrice);
        formData.append("productDesc", editProduct.productDesc);
        formData.append("brand", editProduct.brand);
        formData.append("category", editProduct.category);

        const remainingImages = previewImages
            .filter((img) => img.public_id)
            .map((img) => img.public_id);

        formData.append(
            "existingImages",
            JSON.stringify(remainingImages)
        );

        newImages.forEach((image) => {
            formData.append("files", image); // <-- fixed
        });

        try {
            const res = await axios.put(
                `https://ekart-9pu9.onrender.com/api/v1/product/update/${editProduct._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (res.data.success) {
                const updatedProducts = products.map((p) =>
                    p._id === res.data.product._id
                        ? res.data.product
                        : p
                );

                dispatch(setProducts(updatedProducts));
                toast.success(res.data.message);
                setOpen(false);

                setEditProduct(null);
                setNewImages([]);
                setPreviewImages([]);
            }
        } catch (error) {
            console.log(error);
            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        }
    };

    const deleteProductHandler = async (productId) => {
        try {
            const remainingProducts = products.filter(product => product._id !== productId);
            const res = await axios.delete(`https://ekart-9pu9.onrender.com/api/v1/product/delete/${productId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setProducts(remainingProducts));
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Product..."
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>

                <Select onValueChange={(value) => setSortOrder(value)}>
                    <SelectTrigger className="w-full sm:w-52">
                        <SelectValue placeholder="Sort by Price" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Price: Low to High">
                                Price: Low to High
                            </SelectItem>

                            <SelectItem value="Price: High to Low">
                                Price: High to Low
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <Card
                        key={product._id}
                        className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200"
                    >

                        <div className="h-40 bg-gray-50 flex items-center justify-center p-1">
                            <img
                                src={product.productImg?.[0]?.url}
                                alt={product.productName}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>

                        <div className="p-2">
                            <h2
                                className="font-medium text-sm truncate"
                                title={product.productName}
                            >
                                {product.productName}
                            </h2>

                            <p className="text-pink-600 font-semibold mt-1">
                                ₹{product.productPrice}
                            </p>

                            <div className="flex justify-end gap-2 mt-3">
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <button
                                            onClick={() => {
                                                setOpen(true);
                                                setEditProduct(product);
                                                setPreviewImages(product.productImg || []);
                                            }}
                                            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                                        >
                                            <Edit size={16} />
                                        </button>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-xl rounded-2xl max-h-[90vh] overflow-y-auto p-6">
                                        <DialogHeader className="space-y-2">
                                            <DialogTitle className="text-2xl font-bold">
                                                Edit Product
                                            </DialogTitle>

                                            <DialogDescription className="text-gray-500">
                                                Update product information and save your changes.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="mt-3 space-y-5">
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <Label>Product Name</Label>
                                                    <Input
                                                        type="text"
                                                        name="productName"
                                                        value={editProduct?.productName || ""}
                                                        onChange={handleChange}
                                                        className="h-7"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Price</Label>
                                                        <Input
                                                            type="number"
                                                            name="productPrice"
                                                            value={editProduct?.productPrice || ""}
                                                            onChange={handleChange}
                                                            className="h-7"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Brand</Label>
                                                        <Input
                                                            type="text"
                                                            name="brand"
                                                            value={editProduct?.brand || ""}
                                                            onChange={handleChange}
                                                            className="h-7"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Category</Label>
                                                    <Input
                                                        type="text"
                                                        name="category"
                                                        value={editProduct?.category || ""}
                                                        onChange={handleChange}
                                                        className="h-7"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Description</Label>
                                                    <textarea
                                                        name="productDesc"
                                                        rows={4}
                                                        value={editProduct?.productDesc || ""}
                                                        onChange={handleChange}
                                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Product Image</Label>

                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                            {previewImages.map((img, index) => (
                                                                <div key={index} className="relative">
                                                                    <img
                                                                        src={img.url || img}
                                                                        alt="preview"
                                                                        className="w-full h-28 object-cover rounded-lg border"
                                                                    />

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            setPreviewImages(
                                                                                previewImages.filter((_, i) => i !== index)
                                                                            )
                                                                        }
                                                                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="block w-full text-sm border rounded-lg p-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <DialogFooter className="pt-4 gap-2">
                                                <DialogClose asChild>
                                                    <Button variant="outline" className="rounded-lg">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>

                                                <Button
                                                    type="submit"
                                                    onClick={handleSave}
                                                    className="rounded-lg bg-blue-600 hover:bg-blue-700"
                                                >
                                                    Save Changes
                                                </Button>
                                            </DialogFooter>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition">
                                            <Trash size={16} />
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your product
                                                from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteProductHandler(product._id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>


                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default AdminProduct;