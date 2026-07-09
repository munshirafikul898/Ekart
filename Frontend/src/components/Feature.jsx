import { Truck, ShieldCheck, Headphones } from "lucide-react";

function Feature() {
    return (
        <section className="w-full bg-pink-50 py-10 flex flex-col lg:flex-row justify-center items-center gap-6 px-4 sm:px-6 md:px-10">
            <div className="w-full lg:w-1/3 bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition duration-300">

                <div className="bg-pink-100 p-4 rounded-full shrink-0">
                    <Truck className="text-pink-500 w-8 h-8" />
                </div>

                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Free Shipping
                    </h2>

                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        Free delivery on all orders over ₹999.
                    </p>
                </div>

            </div>

            <div className="w-full lg:w-1/3 bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition duration-300">

                <div className="bg-purple-100 p-4 rounded-full shrink-0">
                    <ShieldCheck className="text-purple-500 w-8 h-8" />
                </div>

                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        Secure Payment
                    </h2>

                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        100% secure payment with trusted methods.
                    </p>
                </div>

            </div>

            <div className="w-full lg:w-1/3 bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl transition duration-300">

                <div className="bg-indigo-100 p-4 rounded-full shrink-0">
                    <Headphones className="text-indigo-500 w-8 h-8" />
                </div>

                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        24/7 Support
                    </h2>

                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        Friendly customer support anytime.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default Feature;