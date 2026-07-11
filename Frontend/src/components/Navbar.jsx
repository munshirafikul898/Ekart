import { ShoppingCart, Menu, X, Loader2 } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUser } from "../redux/userSlice";
import { clearCheckoutData } from "../redux/productSlice";

function Navbar() {
    const { user } = useSelector(store => store.user);
    const { cart } = useSelector(store => store.product);

    const accessToken = localStorage.getItem("accessToken");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = user?.role === "admin";
    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const logoutHandler = async () => {
        setLoggingOut(true);
        try {
            const res = await axios.post(
                "https://ekart-9pu9.onrender.com/api/v1/user/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            if (res.data.success) {
                localStorage.removeItem("accessToken");

                dispatch(setUser(null));
                dispatch(clearCheckoutData());
                toast.success(res.data.message);

                setOpen(false);

                navigate("/login");
            }
        } catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Logout failed");
        }
        finally {
            setLoggingOut(false);
        }
    };

    return (
        <>
            <header className="w-full h-14 bg-white shadow-md px-4 sm:px-6 flex justify-between items-center fixed z-20">
                <Link to="/" className="flex items-center gap-1">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/012/494/062/original/shopping-bag-icon-with-transparent-background-png.png"
                        alt="logo"
                        className="w-10 h-10"
                    />

                    <h1 className="text-2xl font-bold text-pink-500">
                        Ekart
                    </h1>
                </Link>

                <nav className="hidden md:flex items-center gap-6 font-medium">
                    <Link
                        to="/"
                        className="hover:text-pink-500 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="hover:text-pink-500 transition"
                    >
                        Products
                    </Link>

                    {user && (
                        <Link
                            to={`/profile/${user._id}`}
                            className="hover:text-pink-500 transition"
                        >
                            Hello, {user.firstName}
                        </Link>
                    )}

                    {admin && (
                        <Link
                            to="/dashboard/sales"
                            className="hover:text-pink-500 transition"
                        >
                            Dashboard
                        </Link>
                    )}

                    <Link
                        to="/cart"
                        className="relative"
                    >
                        <ShoppingCart className="w-7 h-7" />

                        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {cart?.items?.length || 0}
                        </span>
                    </Link>

                    {user ? (
                        <Button
                            onClick={logoutHandler}
                            className="bg-pink-500 text-white cursor-pointer hover:bg-pink-600"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            onClick={logoutHandler}
                            disabled={loggingOut}
                            className="bg-pink-500 text-white cursor-pointer hover:bg-pink-600"
                        >
                            {loggingOut ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Logging out...
                                </>
                            ) : (
                                "Logout"
                            )}
                        </Button>
                    )}
                </nav>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>

                {open && (
                    <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center gap-5 py-6 md:hidden">
                        <Link to="/" onClick={() => setOpen(false)}>
                            Home
                        </Link>

                        <Link to="/products" onClick={() => setOpen(false)}>
                            Products
                        </Link>

                        {user && (
                            <Link
                                to={`/profile/${user._id}`}
                                onClick={() => setOpen(false)}
                            >
                                Hello, {user.firstName}
                            </Link>
                        )}

                        {admin && (
                            <Link
                                to="/dashboard/sales"
                                onClick={() => setOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}

                        <Link
                            to="/cart"
                            className="relative"
                            onClick={() => setOpen(false)}
                        >
                            <ShoppingCart className="w-7 h-7" />

                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {cart?.items?.length || 0}
                            </span>
                        </Link>

                        {user ? (
                            <Button
                                onClick={logoutHandler}
                                disabled={loggingOut}
                                className="bg-pink-500 text-white hover:bg-pink-600"
                            >
                                {loggingOut ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Logging out...
                                    </>
                                ) : (
                                    "Logout"
                                )}
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    navigate("/login");
                                    setOpen(false);
                                }}
                                className="bg-pink-500 text-white hover:bg-pink-600"
                            >
                                Login
                            </Button>
                        )}
                    </div>
                )}
            </header>

            <div className="pt-14">
                <Outlet />
            </div>
        </>
    );
}

export default Navbar;