import express from "express";
import "dotenv/config";
import connectDB from "./dataBase/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ekart-rouge.vercel.app"
    ],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Ekart Backend is Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});