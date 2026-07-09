import express from "express";
import { isAdmin, isAuthencitated } from "../middleware/isAuthencitated.js";
import { multipleUpload } from "../middleware/multer.js";
import { addProduct, deleteProduct, getAllProduct, updateProduct } from "../controllers/productController.js";

const router=express.Router();

router.post("/add",isAuthencitated,isAdmin,multipleUpload,addProduct);
router.get("/getallproducts",getAllProduct);
router.delete("/delete/:productId",isAuthencitated,isAdmin,deleteProduct);
router.put("/update/:productId",isAuthencitated,isAdmin,multipleUpload,updateProduct);

export default router;