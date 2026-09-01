import "dotenv/config";

console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);
import cloudinary from "../config/cloudinary.js";

console.log(cloudinary.config());


const img = await cloudinary.uploader.upload("./controllers/love.png");
console.log(img);