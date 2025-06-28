import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import moodRoutes from "./moodRoutes.js";  // Adjust path if needed

dotenv.config();  // loads OPENAI_API_KEY from backend/.env

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// Chatbot route
app.post("/api/chat", async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a supportive and empathetic mental health chatbot designed to help students with stress, anxiety, and emotional well-being. Keep your responses kind, gentle, and helpful. Offer coping strategies, ask gentle follow-up questions, and always validate their feelings.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    next(err); // Pass to error handling middleware
  }
});

// Use mood routes for all /api/mood requests
app.use("/api", moodRoutes);

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅  API ready at http://localhost:${PORT}/api/chat`));
