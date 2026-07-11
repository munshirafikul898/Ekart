import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPassword() {
    const { email } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post(
                `https://ekart-9pu9.onrender.com/api/v1/user/change-password/${email}`,
                formData
            );

            if (data.success) {
                toast.success(data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        Reset Password
                    </CardTitle>

                    <CardDescription>
                        Create a new password for your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={submitHandler}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label>New Password</Label>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    className="pr-10"
                                    required
                                />

                                {showPassword ? (
                                    <EyeOff
                                        onClick={() => setShowPassword(false)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
                                    />
                                ) : (
                                    <Eye
                                        onClick={() => setShowPassword(true)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Confirm Password</Label>

                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className="pr-10"
                                    required
                                />

                                {showConfirmPassword ? (
                                    <EyeOff
                                        onClick={() => setShowConfirmPassword(false)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
                                    />
                                ) : (
                                    <Eye
                                        onClick={() => setShowConfirmPassword(true)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-pink-500 hover:bg-pink-600"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default ResetPassword;