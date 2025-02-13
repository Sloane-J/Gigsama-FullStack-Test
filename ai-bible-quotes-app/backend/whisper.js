import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export async function transcribeAudio(filePath) {
    const apiKey = process.env.WHISPER_API_KEY;
    const url = "https://api.openai.com/v1/audio/transcriptions";

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));
    formData.append("model", "whisper-1");

    const headers = { Authorization: `Bearer ${apiKey}`, ...formData.getHeaders() };

    try {
        const response = await axios.post(url, formData, { headers });
        return response.data.text;
    } catch (error) {
        console.error("Whisper API Error:", error.response?.data || error);
        throw new Error("Failed to transcribe audio");
    }
}
