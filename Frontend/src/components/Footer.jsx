import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="w-full bg-pink-700 flex flex-col sm:flex-row flex-wrap justify-between items-start gap-8 px-6 sm:px-10 py-10 pb-4">
                <div className="w-full sm:w-[45%] lg:w-auto">
                    <h1 className="text-2xl font-bold text-white">
                        Ekart
                    </h1>

                    <p className="text-sm text-pink-100 mt-3 leading-6">
                        Smart shopping for modern lifestyle.
                    </p>
                </div>

                <div className="w-full sm:w-[45%] lg:w-auto">
                    <h2 className="text-lg font-semibold text-white mb-3">
                        Links
                    </h2>

                    <div className="flex flex-col gap-2">
                        <Link
                            to="/"
                            className="text-sm text-pink-100 w-fit hover:text-black transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/products"
                            className="text-sm text-pink-100 w-fit hover:text-black transition"
                        >
                            Products
                        </Link>

                        <Link
                            to="/cart"
                            className="text-sm text-pink-100 w-fit hover:text-black transition"
                        >
                            Cart
                        </Link>
                    </div>
                </div>

                <div className="w-full sm:w-[45%] lg:w-auto">
                    <h2 className="text-lg font-semibold text-white mb-3">
                        Contact
                    </h2>

                    <p className="text-sm text-pink-100">
                        support@ecart.com
                    </p>

                    <p className="text-sm text-pink-100 mt-2">
                        +91 9876543210
                    </p>
                </div>

                <div className="w-full sm:w-[45%] lg:w-auto">
                    <h2 className="text-lg font-semibold text-white mb-3">
                        Follow
                    </h2>

                    <div className="flex gap-3 flex-wrap">
                        <div className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition cursor-pointer">
                            <FaFacebookF className="text-sm" />
                        </div>

                        <div className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition cursor-pointer">
                            <FaInstagram className="text-sm" />
                        </div>

                        <div className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition cursor-pointer">
                            <FaTwitter className="text-sm" />
                        </div>

                        <div className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition cursor-pointer">
                            <FaLinkedinIn className="text-sm" />
                        </div>
                    </div>
                </div>
            </footer>

            <hr className="border-pink-500" />

            <div className="w-full bg-pink-700 text-center text-pink-100 text-sm py-3 px-4">
                © 2026 Ekart. All Rights Reserved.
            </div>
        </>
    );
}

export default Footer;