import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = async (email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        transporter.verify((error, success) => {
            if (error) {
                console.log("SMTP Error:", error);
            } else {
                console.log("SMTP Server Ready");
            }
        });

        const mailConfigurations = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Email Verification",
            text: `Hi!

You have recently visited our website and entered your email.

Please verify your email by clicking the link below:

https://ekart-rouge.vercel.app/verify/${token}

Thanks`
        };

        const info = await transporter.sendMail(mailConfigurations);

        console.log("Email Sent Successfully");
        console.log(info);

    } catch (error) {
        console.log("Email Error:", error);
    }
};