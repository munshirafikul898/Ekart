import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function ProductImg({ images }) {
    const [mainImg, setMainImg] = useState(images?.[0]?.url || "");

    return (
        <div className="w-full flex flex-col gap-4">

            <div className="bg-white border rounded-2xl shadow-sm h-[280px] sm:h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">

                <TransformWrapper
                    initialScale={1}
                    minScale={1}
                    maxScale={4}
                    wheel={{ step: 0.2 }}
                >
                    <TransformComponent
                        wrapperClass="w-full h-full"
                        contentClass="w-full h-full flex items-center justify-center"
                    >
                        <img
                            src={mainImg}
                            alt="Product"
                            className="w-full h-full object-contain p-3"
                        />
                    </TransformComponent>
                </TransformWrapper>

            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">

                {images?.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setMainImg(img.url)}
                        className={`cursor-pointer rounded-xl border p-1 transition-all duration-200 ${
                            mainImg === img.url
                                ? "border-pink-500 shadow-md"
                                : "border-gray-200 hover:border-pink-300"
                        }`}
                    >
                        <img
                            src={img.url}
                            alt={`Product ${index + 1}`}
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-lg bg-white"
                        />
                    </div>
                ))}

            </div>

        </div>
    );
}

export default ProductImg;