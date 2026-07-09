import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("Verifying...");
    const [success, setSuccess] = useState(null);

    const verifyEmail = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/user/verify",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                setSuccess(true);
                setStatus("Email Verified Successfully");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setSuccess(false);
            setStatus("Verification failed. Please try again.");
        }
    };

    useEffect(() => {
        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                {success === null ? (
                    <>
                        <Loader2 className="w-14 h-14 mx-auto text-pink-500 animate-spin mb-5" />

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Verifying Email
                        </h2>

                        <p className="mt-3 text-gray-600 text-sm sm:text-base">
                            Please wait while we verify your email...
                        </p>
                    </>
                ) : success ? (
                    <>
                        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-5" />

                        <h2 className="text-xl sm:text-2xl font-bold text-green-600">
                            Success
                        </h2>

                        <p className="mt-3 text-gray-600 text-sm sm:text-base">
                            {status}
                        </p>

                        <p className="mt-2 text-xs sm:text-sm text-gray-500">
                            Redirecting to login...
                        </p>
                    </>
                ) : (
                    <>
                        <XCircle className="w-16 h-16 mx-auto text-red-500 mb-5" />

                        <h2 className="text-xl sm:text-2xl font-bold text-red-600">
                            Verification Failed
                        </h2>

                        <p className="mt-3 text-gray-600 text-sm sm:text-base">
                            {status}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;