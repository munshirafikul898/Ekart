import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

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

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post(
                "https://ekart-9pu9.onrender.com/api/v1/user/forgot-password",
                { email }
            );

            if (data.success) {
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
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
                        Forgot Password
                    </CardTitle>

                    <CardDescription>
                        Enter your registered email to receive an OTP.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label>Email</Label>

                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-pink-500 hover:bg-pink-600"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending OTP...
                                </>
                            ) : (
                                "Send OTP"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="justify-center">
                    <Link
                        to="/login"
                        className="text-sm text-pink-500 hover:underline"
                    >
                        Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ForgotPassword;