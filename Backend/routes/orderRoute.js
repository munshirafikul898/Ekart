import express from "express";
import { isAdmin, isAuthencitated } from "../middleware/isAuthencitated.js";
import { createOrder, getAllOrdersAdmin, getMyOrder, getSalesData, getUserOrders, verifyPayment } from "../controllers/orderController.js";

const router= express.Router();

router.post("/create-order",isAuthencitated,createOrder);
router.post("/verify-payment",isAuthencitated,verifyPayment);
router.get("/my-orders",isAuthencitated,getMyOrder);
router.get("/all",isAuthencitated,isAdmin, getAllOrdersAdmin);
router.get("/user-order/:userId",isAuthencitated, isAdmin , getUserOrders);
router.get("/sales",isAuthencitated, isAdmin , getSalesData);

export default router;