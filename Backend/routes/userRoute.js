import express from "express";
import { allUser, changePassword, forgotPassword, getuserById, login, logout, register, reVerify, updateUser, verify, verifyOtp } from "../controllers/userController.js";
import { isAdmin, isAuthencitated } from "../middleware/isAuthencitated.js";
import { singleUpload } from "../middleware/multer.js";

const router=express.Router();

router.post("/register",register);
router.post("/verify",verify);
router.post("/re-verify",reVerify);
router.post("/login",login);
router.post("/logout",logout);
router.post("/forgot-password",forgotPassword);
router.post("/verify-otp/:email",verifyOtp);
router.post("/change-password/:email",changePassword);
router.get("/all-user",isAuthencitated,isAdmin,allUser);
router.get("/get-user/:userId",getuserById);
router.put("/update/:id",isAuthencitated,singleUpload,updateUser);

export default router;