// moodRoutes.js
import express from "express";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../src/firebase-config.js";  // adjust path as needed

const router = express.Router();

// POST /api/mood
// Save a mood log entry
router.post("/mood", async (req, res) => {
  try {
    const { userId, mood, note, emoji } = req.body;

    if (!userId || !mood) {
      return res.status(400).json({ error: "userId and mood are required" });
    }

    const docRef = await addDoc(collection(db, "mood_logs"), {
      userId,
      mood,
      note: note || "",
      emoji: emoji || "",
      timestamp: serverTimestamp(),
    });

    res.status(201).json({ message: "Mood logged", id: docRef.id });
  } catch (error) {
    console.error("Error saving mood log:", error);
    res.status(500).json({ error: "Failed to save mood log" });
  }
});

// GET /api/mood/:userId
// Fetch mood logs for a specific user, ordered by latest first
router.get("/mood/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const q = query(
      collection(db, "mood_logs"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);

    const moodLogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate().toISOString() || null,
    }));

    res.json(moodLogs);
  } catch (error) {
    console.error("Error fetching mood logs:", error);
    res.status(500).json({ error: "Failed to fetch mood logs" });
  }
});

export default router;
