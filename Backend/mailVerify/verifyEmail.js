import axios from "axios";
import "dotenv/config";

export const verifyEmail = async (email, token) => {
    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Ekart",
                    email: "munshirafikul139@gmail.com"
                },
                to: [
                    {
                        email: email
                    }
                ],
                subject: "Email Verification",
                textContent: `Hi!

You have recently registered on Ekart.

Please verify your email by clicking the link below:

https://ekart-rouge.vercel.app/verify/${token}

Thank you!`
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Email Sent Successfully");
        console.log(response.data);

    } catch (error) {
        console.log("Email Error:", error.response?.data || error.message);
    }
};