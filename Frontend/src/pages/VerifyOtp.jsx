import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
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

function VerifyOtp() {
    const { email } = useParams();
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post(
                `https://ekart-9pu9.onrender.com/api/v1/user/verify-otp/${email}`,
                { otp }
            );

            if (data.success) {
                toast.success(data.message);
                navigate(`/reset-password/${email}`);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "OTP verification failed"
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
                        Verify OTP
                    </CardTitle>

                    <CardDescription>
                        Enter the OTP sent to your email.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={submitHandler}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label>OTP</Label>

                            <Input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                value={otp}
                                onChange={(e) =>
                                    setOtp(e.target.value)
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
                                    Verifying...
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default VerifyOtp;