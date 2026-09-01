import Groq from "groq-sdk"
import sql from "../config/db.js";
import { clerkClient, getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";
import axios from "axios"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

export const generateArticle = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Limit reached. Upgrade to continue."
            })
        }

        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content: "You are an expert article writer."
                },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: length,
            // response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content

        if (!content) {
            return res.json({
                success: false,
                message: "Failed to generate article."
            });
        }

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, ${"article"})`;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, content })



    } catch (error) {

        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })

    }
}


export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Limit reached. Upgrade to continue."
            })
        }

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are an expert SEO blog title generator."
                },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 100,
            // response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content

        if (!content) {
            return res.json({
                success: false,
                message: "Failed to generate blog title."
            });
        }

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, ${"blog-title"})`;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, content })

    } catch (error) {

        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })

    }
}

export const generateImage = async (req, res) => {
    try {
        const { userId } = getAuth(req); // Fix req.auth() runtime error
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({ success: false, message: "This feature is only available for premium subscribers." });
        }

        const form = new FormData();
        form.append('prompt', prompt);

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", form, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY,
                ...(form.getHeaders ? form.getHeaders() : { "Content-Type": "multipart/form-data" })
            },
            responseType: "arraybuffer",
        });

        const base64Image = `data:image/png;base64,${Buffer.from(data).toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64Image);

        await sql`INSERT INTO creations (user_id, prompt, content, type, publish) 
                  VALUES (${userId}, ${prompt}, ${result.secure_url}, 'image', ${publish ?? false})`;

        return res.json({ success: true, content: result.secure_url });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
};

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = getAuth(req); // Fix req.auth() runtime error
        const image = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({ success: false, message: "This feature is only available for premium subscribers." });
        }


        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: "background_removal",
                    background_removal: "remove_the_background"
                }
            ]
        });

        await sql`INSERT INTO creations (user_id, prompt, content, type) 
                  VALUES (${userId}, ${"Remove background from image"}, ${secure_url}, 'image')`;

        res.json({ success: true, content: secure_url });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const removeImageObject = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { object } = req.body;// Fix req.auth() runtime error
        const image = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({ success: false, message: "This feature is only available for premium subscribers." });
        }


        const { public_id } = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [{ effect: `gen_remove:${object}` }],
            resource_type: "image"
        })

        await sql`INSERT INTO creations (user_id, prompt, content, type) 
                  VALUES (${userId}, ${`Rempved ${object} from image`}, ${imageUrl}, 'image')`;

        res.json({ success: true, content: imageUrl });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};