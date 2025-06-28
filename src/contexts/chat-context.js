import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, auth, signInAnon, onAuthStateChanged } from "../firebase-config";

const ChatContext = createContext();

// const getBotResponse = (text) => {
//   const lowerText = text.toLowerCase();

//   if (lowerText.includes("sad") || lowerText.includes("depressed")) {
//     return "I'm really sorry to hear that. Want to talk about what's been bothering you?";
//   }
//   if (lowerText.includes("anxious") || lowerText.includes("anxiety")) {
//     return "Anxiety can feel overwhelming. Try taking a deep breath. Would you like a calming technique?";
//   }
//   if (lowerText.includes("stressed") || lowerText.includes("pressure")) {
//     return "Stress is tough. Want to try a quick breathing exercise or hear a motivational quote?";
//   }
//   if (lowerText.includes("happy") || lowerText.includes("good")) {
//     return "That's great to hear! I'm always here when you need support.";
//   }
//   if (lowerText.includes("help") || lowerText.includes("support")) {
//     return "You're not alone. I'm here for you. Would you like some tips or resources?";
//   }

//   return "Thank you for sharing. I'm here to support you. Would you like to continue?";
// };

export function ChatProvider({ children }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Anonymous sign-in and auth state listener
  useEffect(() => {
    signInAnon();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time message fetch for this user
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        }));
        setMessages(msgs);
      },
      (err) => {
        setError("Failed to load messages");
        console.error(err);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Send user message and bot response
  const sendMessage = useCallback(
    async (text) => {
      if (!user || !text.trim()) return;
  
      try {
        setIsLoading(true);
        setError(null);
  
        // Save user message to Firestore
        await addDoc(collection(db, "chats"), {
          text: text.trim(),
          sender: "user",
          userId: user.uid,
          timestamp: serverTimestamp(),
        });
  
        setIsTyping(true);
  
        // src/chat-context.js or wherever you're making the fetch call

        const response = await fetch(
          `${process.env.REACT_APP_API_BASE || ""}/api/chat`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text.trim() }),
          }
        );

  
        const data = await response.json();
  
        if (response.ok) {
          // Save AI reply to Firestore
          await addDoc(collection(db, "chats"), {
            text: data.reply,
            sender: "bot",
            userId: user.uid,
            timestamp: serverTimestamp(),
          });
        } else {
          setError(data.error || "Failed to get response from AI");
        }
  
        setIsTyping(false);
        setIsLoading(false);
      } catch (err) {
        setError("Something went wrong while sending your message.");
        setIsTyping(false);
        setIsLoading(false);
        console.error(err);
      }
    },
    [user]
  );
  

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const clearError = () => setError(null);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        isTyping,
        error,
        darkMode,
        sendMessage,
        toggleDarkMode,
        clearError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
