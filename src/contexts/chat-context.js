import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ChatContext = createContext();

// Generate anonymous user ID
const generateAnonymousId = () => {
  let anonymousId = localStorage.getItem('anonymousId');
  if (!anonymousId) {
    anonymousId = 'anon_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem('anonymousId', anonymousId);
  }
  return anonymousId;
};

export function ChatProvider({ children }) {
  const [anonymousId] = useState(generateAnonymousId());
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load chat history on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/chat/history/${anonymousId}`);
        if (response.ok) {
          const chatHistory = await response.json();
          const formattedMessages = chatHistory.map(msg => ({
            id: msg.id.toString(),
            text: msg.text,
            sender: msg.sender.toLowerCase(),
            timestamp: new Date(msg.createdAt)
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };

    loadChatHistory();
  }, [anonymousId]);

  // Send user message and bot response
  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim()) return;
  
      try {
        setIsLoading(true);
        setError(null);

        // Add user message to local state immediately
        const userMessage = {
          id: Date.now().toString(),
          text: text.trim(),
          sender: "user",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
  
        setIsTyping(true);
  
        // Call Spring Boot backend API
        const response = await fetch("http://localhost:8080/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: text.trim(),
            anonymousId: anonymousId
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Add bot message to local state
          const botMessage = {
            id: data.messageId || (Date.now() + 1).toString(),
            text: data.reply,
            sender: "bot",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
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
    [anonymousId]
  );
  
  

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const clearError = () => setError(null);

  return (
    <ChatContext.Provider
      value={{
        anonymousId,
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
