import { X } from "lucide-react";

function ImageUpload({ productData, setProductData }) {
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setProductData((prev) => ({
            ...prev,
            ProductImg: [...prev.ProductImg, ...newImages],
        }));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...productData.ProductImg];

        URL.revokeObjectURL(updatedImages[index].preview);

        updatedImages.splice(index, 1);

        setProductData((prev) => ({
            ...prev,
            ProductImg: updatedImages,
        }));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                </label>

                <input
                    id="product-images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />

                <label
                    htmlFor="product-images"
                    className="flex items-center justify-center w-full h-9 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer text-gray-600 font-medium transition"
                >
                    Upload Images
                </label>
            </div>

            {productData.ProductImg.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {productData.ProductImg.map((image, index) => (
                        <div
                            key={index}
                            className="relative border rounded-lg overflow-hidden shadow-sm"
                        >
                            <img
                                src={image.preview}
                                alt={`preview-${index}`}
                                className="w-full h-28 object-cover"
                            />

                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageUpload;