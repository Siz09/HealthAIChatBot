"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Moon, Sun, AlertCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "../contexts/chat-context"
import { formatRelativeTime } from "../utils/date"
import MoodTracker from "./Moodtracker"  // adjust path as needed
import "../styles/chatbot.css"

export default function EnhancedMentalHealthChatbot() {
  const { messages, isLoading, isTyping, error, darkMode, sendMessage, toggleDarkMode, clearError } = useChat()

  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Autofocus textarea on mount and after sending message
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const messageText = inputText.trim()
    setInputText("")

    await sendMessage(messageText)

    // Refocus textarea after sending
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputText])

  // Keyboard navigation for chat container
  const handleChatKeyDown = (e) => {
    if (e.key === "Tab" && e.shiftKey) {
      // Allow normal tab navigation
      return
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      // Focus management for message navigation could be added here
    }
  }

  const themeClass = darkMode ? "dark" : "light"

  return (
    <div className={`chat-container ${themeClass}`}>
      <div className="main-content">
        <div className="left-panel">
          <MoodTracker />
        </div>

        <div className="right-panel">
          {/* Header */}
          <header className={`chat-header ${themeClass}`}>
            <div className="header-content">
              <div>
                <h1 className={`header-title ${themeClass}`}>MindEase</h1>
                <p className={`header-subtitle ${themeClass}`}>Your mental wellness companion</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`theme-toggle ${themeClass}`}
                aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`error-banner ${themeClass}`}
              >
                <div className="error-content">
                  <div className={`error-message ${themeClass}`}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                  <button onClick={clearError} className={`error-close ${themeClass}`} aria-label="Dismiss error">
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Messages */}
          <main className="chat-main">
            <div className="chat-content">
              <div
                ref={chatContainerRef}
                className="messages-container"
                onKeyDown={handleChatKeyDown}
                role="log"
                aria-live="polite"
                aria-label="Chat messages"
              >
                <div className="messages-list">
                  <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`message-wrapper ${message.sender}`}
                      >
                        <div className="message-content">
                          <div
                            className={`message-bubble ${message.sender} ${themeClass}`}
                            role="article"
                            aria-label={`${message.sender === "user" ? "Your" : "MindEase"} message`}
                          >
                            <p className="message-text">{message.text}</p>
                          </div>
                          <p
                            className={`message-timestamp ${message.sender} ${themeClass}`}
                            aria-label={`Message sent ${formatRelativeTime(message.timestamp)}`}
                          >
                            {formatRelativeTime(message.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="typing-indicator"
                      >
                        <div className="typing-content">
                          <div className={`typing-bubble ${themeClass}`} role="status" aria-label="MindEase is typing">
                            <div className="typing-animation">
                              <div className="typing-dots">
                                <div className={`typing-dot ${themeClass}`}></div>
                                <div className={`typing-dot ${themeClass}`}></div>
                                <div className={`typing-dot ${themeClass}`}></div>
                              </div>
                              <span className={`typing-text ${themeClass}`}>MindEase is typing...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div ref={messagesEndRef} />
              </div>
            </div>
          </main>

          {/* Input Area */}
          <footer className={`chat-footer ${themeClass}`}>
            <div className="input-container">
              <div className="input-wrapper">
                <div className="textarea-container">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="How are you feeling today?"
                    disabled={isLoading}
                    className={`message-textarea ${themeClass}`}
                    rows={1}
                    aria-label="Type your message"
                    aria-describedby="input-help"
                  />
                  <div id="input-help" className="sr-only">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading || isTyping}
                  className={`send-button ${themeClass}`}
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
