import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

const cors = require('cors');
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

app.listen(5000, () => console.log("Server running on port 5000"));
