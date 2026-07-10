import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = async (email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailConfigurations = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Email Verification",
            text: `Hi!

You have recently registered on Ekart.

Please verify your email by clicking the link below:

https://ekart-rouge.vercel.app/verify/${token}

Thank you!`,
        };

        const info = await transporter.sendMail(mailConfigurations);

        console.log("Email Sent Successfully");
        console.log(info);
    } catch (error) {
        console.log("Email Error:", error);
    }
};