import mongoose from "mongoose";
import "dotenv/config";

const connectDB=async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Database connect successfully."); 
    } catch (error) {
        console.log("DB connection fail.",error);      
    }
}

export default connectDB;