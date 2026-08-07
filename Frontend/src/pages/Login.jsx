import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setCart } from "@/redux/productSlice";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

const submitHandler = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const res = await axios.post(
            "https://ekart-9pu9.onrender.com/api/v1/user/login",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.data.success) {

        
            localStorage.setItem(
                "accessToken",
                res.data.accessToken
            );

            localStorage.setItem(
                "refreshToken",
                res.data.refreshToken
            );


            dispatch(setUser(res.data.user));

            const cartRes = await axios.get(
                "https://ekart-9pu9.onrender.com/api/v1/cart",
                {
                    headers: {
                        Authorization: `Bearer ${res.data.accessToken}`,
                    },
                }
            );

            dispatch(setCart(cartRes.data.cart));

            toast.success(res.data.message);
            navigate("/");
        }

    } catch (error) {
        console.log(error);

        toast.error(
            error.response?.data?.message || "Login failed"
        );

    } finally {
        setLoading(false);
    }
}


    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4 py-8">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        Login to your account
                    </CardTitle>

                    <CardDescription className="text-sm">
                        Enter your details below to access your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={submitHandler}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email
                            </Label>

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Password
                            </Label>

                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pr-10"
                                    required
                                />

                                {showPassword ? (
                                    <EyeOff
                                        onClick={() =>
                                            setShowPassword(false)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-gray-500"
                                    />
                                ) : (
                                    <Eye
                                        onClick={() =>
                                            setShowPassword(true)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-gray-500"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-pink-500 hover:text-pink-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p className="text-sm text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-pink-500 hover:underline font-medium"
                        >
                            Signup
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Login;