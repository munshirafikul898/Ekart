import Breadcrums from "@/components/Breadcrums";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SingleProduct() {
    const params = useParams();
    const productId = params.id;

    const { products } = useSelector((store) => store.product);

    const product = products.find((item) => item._id === productId);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <h1 className="text-lg font-semibold text-gray-500">
                    Loading...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-3 sm:px-5 lg:px-8 py-4 sm:py-8">

            <div className="max-w-7xl mx-auto">
                <div className="mb-4 sm:mb-6">
                    <Breadcrums product={product} />
                </div>
                <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                        
                        <div className="bg-gray-50 rounded-2xl border p-3 sm:p-4">
                            <ProductImg images={product.productImg} />
                        </div>

                        <div>
                            <ProductDesc product={product} />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SingleProduct;