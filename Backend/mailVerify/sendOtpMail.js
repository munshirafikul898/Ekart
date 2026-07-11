import axios from "axios";
import "dotenv/config";

export const sendOtpMail = async (otp, email) => {
    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Ekart",
                    email: "munshirafikul139@gmail.com",
                },
                to: [
                    {
                        email: email,
                    },
                ],
                subject: "Password Reset OTP",
                textContent: `Hi!

We received a request to reset your Ekart account password.

Your OTP is:

${otp}

This OTP is valid for 10 minutes.

If you didn't request a password reset, you can safely ignore this email.

Thank you,
Ekart Team`,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("OTP Email Sent Successfully");
        console.log(response.data);
    } catch (error) {
        console.log("OTP Email Error:", error.response?.data || error.message);
        throw error;
    }
};