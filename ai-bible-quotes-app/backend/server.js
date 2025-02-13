import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { transcribeAudio } from "./whisper.js";
import { fetchBibleVerses } from "./bible.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup for handling file uploads
const upload = multer({ dest: "uploads/" });

// API endpoint to process audio
app.post("/api/process-audio", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No audio file provided" });

        // Send to Whisper API
        const transcription = await transcribeAudio(req.file.path);

        // Find matching Bible verses
        const verses = await fetchBibleVerses(transcription);

        res.json({ transcription, verses });
    } catch (error) {
        console.error("Error processing audio:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
