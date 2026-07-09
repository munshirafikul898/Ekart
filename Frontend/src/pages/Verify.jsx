import { MailCheck } from "lucide-react";

function Verify() {
    return (
        <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-10 text-center">
                <MailCheck className="w-16 h-16 mx-auto text-pink-500 mb-5" />

                <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
                    Check Your Email
                </h2>

                <p className="mt-4 text-gray-600 text-sm sm:text-base leading-7">
                    We've sent a verification email to your registered email address.
                    Please check your inbox and click the verification link to activate
                    your account.
                </p>

                <div className="mt-6 bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Didn't receive the email?</span>
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        Check your <span className="font-semibold">Spam</span> or
                        <span className="font-semibold"> Junk</span> folder. If it's
                        still not there, you can register again or request a new
                        verification email.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Verify;