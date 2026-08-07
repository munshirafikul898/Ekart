import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../mailVerify/verifyEmail.js";
import "dotenv/config";
import { Session } from "../models/sessionModel.js";
import { sendOtpMail } from "../mailVerify/sendOtpMail.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
           return res.status(400).json({
                success: false,
                message: "All field value must be fill up"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
           return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '10m' });
        await verifyEmail(email, token);
        newUser.token = token;
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User register successfully",
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(400).json({
                success: false,
                message: "Authorization token is missing or Invalid"
            })
        }
        const token = authHeader.split(" ")[1];
        let decoded
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "The Registeration token Expired"
                })
            }
            return res.status(400).json({
                success: false,
                message: "Token varification failed"
            })
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        user.token = null;
        user.isVerified = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email verify successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const reVerify = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10m" });
        verifyEmail(email, token);
        user.token = token;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Verification email sent successfully",
            token: user.token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are reqired"
            })
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User not Exist"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }
        if (existingUser.isVerified === false) {
            return res.status(400).json({
                success: false,
                message: "Verify your account then login"
            })
        }
        const accessToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "10d" });
        const refreshToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "30d" });
        existingUser.isLoggedIn = true;
        await existingUser.save();
        const existingSession = await Session.findOne({ userId: existingUser._id })
        if (existingSession) {
            await Session.deleteOne({ userId: existingUser._id });
        }
        await Session.create({ userId: existingUser._id });
        return res.status(200).json({
            success: true,
            message: `Welcome back ${existingUser.firstName}`,
            user: existingUser,
            accessToken,
            refreshToken
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.SECRET_KEY
        );

        const userId = decoded.id;

        await Session.deleteMany({ userId });

        await User.findByIdAndUpdate(userId, {
            isLoggedIn: false
        });

        return res.status(200).json({
            success: true,
            message: "User logout successfully"
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        await sendOtpMail(otp, email);
        return res.status(200).json({
            success: true,
            message: "Otp send successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const email = req.params.email;
        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "Otp is required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "Otp is not generated or already verified"
            })
        }
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Otp is Expired.plesae request a new otp"
            })
        }
        if (otp !== user.otp) {
            return res.status(400).json({
                success: false,
                message: "otp is invalid"
            })
        }
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Otp verify successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        const email = req.params.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password does not match"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password reset Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const allUser = async (_, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getuserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password -otp -otpExpiry -token");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userIdToUpdate = req.params.id;
        const loggedInUser = await User.findById(req.id);
        const { firstName, lastName, role, phoneNo, zipCode, address, city } = req.body;
        if (loggedInUser._id.toString() !== userIdToUpdate && loggedInUser.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "You are not allow to update this profile"
            })
        }
        let user = await User.findById(userIdToUpdate);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        let profilePicUrl = user.profilePic;
        let profilePicPublicId = user.profilePicPublicId;
        if (req.file) {
            if (profilePicPublicId) {
                await cloudinary.uploader.destroy(profilePicPublicId);
            }
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "profiles" },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                )
                stream.end(req.file.buffer);
            })
            profilePicUrl=uploadResult.secure_url;
            profilePicPublicId=uploadResult.public_id;
        }
        user.firstName= firstName || user.firstName;
        user.lastName= lastName || user.lastName;
        user.address= address || user.address;
        user.city= city || user.city;
        user.phoneNo= phoneNo || user.phoneNo;
        user.zipCode= zipCode || user.zipCode;
        user.role = role || user.role;
        user.profilePic=profilePicUrl;
        user.profilePicPublicId=profilePicPublicId;
        
        const updateduser=await user.save();
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            user:updateduser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}