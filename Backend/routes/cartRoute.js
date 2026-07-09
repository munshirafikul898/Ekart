import express from "express";
import { isAuthencitated } from "../middleware/isAuthencitated.js";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js";

const router=express.Router();

router.get("/",isAuthencitated,getCart);
router.post("/add", isAuthencitated, addToCart);
router.put("/update", isAuthencitated , updateQuantity);
router.delete("/remove", isAuthencitated, removeFromCart);

export default router;