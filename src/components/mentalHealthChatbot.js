"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Moon, Sun, AlertCircle, X, Menu, MessageCircle, BarChart3, Settings, Minimize2, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "../contexts/chat-context"
import { formatRelativeTime } from "../utils/date"
import MoodTracker from "./Moodtracker"
import "../styles/chatbot.css"

export default function EnhancedMentalHealthChatbot() {
  const { messages, isLoading, isTyping, error, darkMode, sendMessage, toggleDarkMode, clearError } = useChat()

  const [inputText, setInputText] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePanel, setActivePanel] = useState("mood") // "mood", "analytics", "settings"
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

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

  const themeClass = darkMode ? "dark" : "light"

  const sidebarVariants = {
    open: { 
      width: "400px",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: { 
      width: "0px",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  const chatVariants = {
    expanded: { 
      marginLeft: sidebarOpen ? "400px" : "0px",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  }

  const renderSidebarContent = () => {
    switch (activePanel) {
      case "mood":
        return <MoodTracker />
      case "analytics":
        return (
          <div className="panel-content">
            <h2 className="panel-title">Analytics</h2>
            <div className="analytics-placeholder">
              <BarChart3 size={48} className="analytics-icon" />
              <p>Mood analytics and insights coming soon...</p>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="panel-content">
            <h2 className="panel-title">Settings</h2>
            <div className="settings-list">
              <div className="setting-item">
                <label>Theme</label>
                <button onClick={toggleDarkMode} className="theme-toggle-setting">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
              <div className="setting-item">
                <label>Notifications</label>
                <div className="toggle-switch">
                  <input type="checkbox" id="notifications" />
                  <label htmlFor="notifications" className="switch"></label>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <MoodTracker />
    }
  }

  return (
    <div className={`chat-container ${themeClass}`}>
      {/* Enhanced Header */}
      <motion.header 
        className={`enhanced-header ${themeClass}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="header-content">
          <div className="header-left">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`sidebar-toggle ${themeClass}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={20} />
            </motion.button>
            <div className="brand-section">
              <motion.div 
                className="brand-icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <MessageCircle size={32} className="brand-logo" />
              </motion.div>
              <div>
                <h1 className={`brand-title ${themeClass}`}>MindEase</h1>
                <p className={`brand-subtitle ${themeClass}`}>Your AI wellness companion</p>
              </div>
            </div>
          </div>
          <div className="header-right">
            <motion.div className="status-indicator">
              <div className={`status-dot ${themeClass}`}></div>
              <span className={`status-text ${themeClass}`}>Online</span>
            </motion.div>
            <motion.button
              onClick={toggleDarkMode}
              className={`theme-toggle-header ${themeClass}`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              onClick={() => setIsMinimized(!isMinimized)}
              className={`minimize-toggle ${themeClass}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

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
              <button onClick={clearError} className={`error-close ${themeClass}`}>
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="main-layout">
        {/* Enhanced Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              className={`enhanced-sidebar ${themeClass}`}
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="sidebar-header">
                <div className="sidebar-tabs">
                  <motion.button
                    onClick={() => setActivePanel("mood")}
                    className={`tab-button ${activePanel === "mood" ? "active" : ""} ${themeClass}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={16} />
                    Mood
                  </motion.button>
                  <motion.button
                    onClick={() => setActivePanel("analytics")}
                    className={`tab-button ${activePanel === "analytics" ? "active" : ""} ${themeClass}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BarChart3 size={16} />
                    Analytics
                  </motion.button>
                  <motion.button
                    onClick={() => setActivePanel("settings")}
                    className={`tab-button ${activePanel === "settings" ? "active" : ""} ${themeClass}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings size={16} />
                    Settings
                  </motion.button>
                </div>
              </div>
              <div className="sidebar-content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePanel}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderSidebarContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Enhanced Chat Area */}
        <motion.main 
          className={`enhanced-chat ${themeClass} ${isMinimized ? "minimized" : ""}`}
          variants={chatVariants}
          animate="expanded"
        >
          <div className="chat-messages">
            <div
              ref={chatContainerRef}
              className="messages-container"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              <div className="messages-list">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`enhanced-message-wrapper ${message.sender}`}
                    >
                      <motion.div
                        className={`enhanced-message-bubble ${message.sender} ${themeClass}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="message-text-container">
                          <p className="message-text">{message.text}</p>
                          <p className={`message-timestamp ${message.sender} ${themeClass}`}>
                            {formatRelativeTime(message.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Enhanced Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="enhanced-typing-indicator"
                    >
                      <div className={`enhanced-typing-bubble ${themeClass}`}>
                        <div className="typing-animation">
                          <div className="typing-dots">
                            <motion.div 
                              className={`typing-dot ${themeClass}`}
                              animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div 
                              className={`typing-dot ${themeClass}`}
                              animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div 
                              className={`typing-dot ${themeClass}`}
                              animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                          <span className={`typing-text ${themeClass}`}>MindEase is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Enhanced Input Area */}
          {!isMinimized && (
            <motion.footer 
              className={`enhanced-input-area ${themeClass}`}
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="input-container">
                <div className="input-wrapper">
                  <div className="textarea-container">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share what's on your mind..."
                      disabled={isLoading}
                      className={`enhanced-textarea ${themeClass}`}
                      rows={1}
                      aria-label="Type your message"
                    />
                  </div>
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading || isTyping}
                    className={`enhanced-send-button ${themeClass}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.footer>
          )}
        </motion.main>
      </div>
    </div>
  )
}