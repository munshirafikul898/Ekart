import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate= useNavigate();
    return (
        <section className="w-full min-h-[450px] bg-gradient-to-r from-pink-500 to-purple-500 flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-8 md:px-10 py-10 md:py-0 gap-10">
            <div className="w-full md:w-1/2 text-center md:text-left">

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    Upgrade Your <br />
                    Digital Lifestyle
                </h1>

                <p className="text-base sm:text-lg text-pink-100 mt-5 leading-7">
                    Explore the latest electronics and smart gadgets
                    designed to make your life easier and stylish.
                </p>

                <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 mt-6">

                    <Button onClick={()=>navigate("/products")} className="bg-white text-pink-600 hover:bg-pink-200 hover:text-black rounded-md px-5 py-4 cursor-pointer w-full sm:w-auto">
                        Shop Now
                    </Button>

                    <Button onClick={()=>navigate("/products")} className="bg-white text-pink-600 hover:bg-pink-200 hover:text-black rounded-md px-5 py-4 cursor-pointer w-full sm:w-auto">
                        Explore
                    </Button>

                </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-end">

                <img
                    src="iphone.png"
                    alt="iphone"
                    className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-[450px] object-contain"
                />

            </div>

        </section>
    );
}

export default Hero;