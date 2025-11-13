import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import BuyerRoute from "./routes/buyer.route.js";

import connectCloudinary from "./utils/cloudinary.js";
// import notificationRoutes from './routes/notificationRoutes.js';
import cors from 'cors';
dotenv.config({});
const app=express();
connectCloudinary()
//middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // ✅ Use same config here

const PORT=process.env.PORT;

//api's
app.use("/api/v1/user",userRoute)
app.use("/api/v1/buyer",BuyerRoute) 


// app.use('/api/v1/notifications', notificationRoutes);

connectDB();
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})  