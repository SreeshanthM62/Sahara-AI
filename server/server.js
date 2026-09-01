import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, getAuth } from '@clerk/express'; // 1. Import getAuth instead of requireAuth
import aiRouter from "./routes/aiRoutes.js";
import "./config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import userRouter from "./routes/userRoutes.js";
// import connectCloudinary from "./config/cloudinary.js";



const app = express();

// console.log("CONFIG",cloudinary.config());




// console.log({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET?.slice(0, 5) + "..."
// });


app.use(cors());
app.use(express.json());
app.use(clerkMiddleware()); // 2. clerkMiddleware still runs globally


app.get("/", (req, res) => res.send("Server is Live!!"));

// 3. Replace requireAuth() with a custom middleware using getAuth()
app.use((req, res, next) => {
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
});

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on Port ", PORT);
});