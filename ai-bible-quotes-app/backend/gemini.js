import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_URL = "https://api.your-gemini-service.com/process"; // Replace with actual API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store in .env file

export const processTextWithGemini = async (text) => {
    try {
        const response = await axios.post(GEMINI_API_URL, { text }, {
            headers: { Authorization: `Bearer ${GEMINI_API_KEY}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error processing text with Gemini:", error.response?.data || error.message);
        throw new Error("Failed to process text");
    }
};
