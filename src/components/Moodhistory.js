"use client"

import { useState, useEffect } from "react"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { db, auth } from "../firebase-config"

export default function MoodHistory() {
  const [moodEntries, setMoodEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!auth?.currentUser || !db) {
      setError("Authentication or database not available.")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    // Create query for mood logs filtered by current user, ordered by timestamp desc
    const moodLogsRef = collection(db, "mood_logs")
    const q = query(moodLogsRef, where("userId", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        try {
          const entries = querySnapshot.docs.map((doc) => {
            const data = doc.data()
            return {
              id: doc.id,
              ...data,
              // Convert Firestore timestamp to JavaScript Date
              timestamp: data.timestamp?.toDate() || new Date(),
            }
          })

          setMoodEntries(entries)
          setIsLoading(false)
        } catch (error) {
          console.error("Error processing mood entries:", error)
          setError("Failed to process mood entries.")
          setIsLoading(false)
        }
      },
      (error) => {
        console.error("Error fetching mood history:", error)
        setError("Failed to load mood history. Please try again.")
        setIsLoading(false)
      },
    )

    // Cleanup listener on component unmount
    return () => unsubscribe()
  }, []) // only attach once (and when db ref changes)

  const formatDateTime = (date) => {
    if (!date || !(date instanceof Date)) return "Unknown date"

    const now = new Date()
    const diffTime = now - date
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    // Show relative time for recent entries
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays < 7) {
      return `${diffDays} days ago at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else {
      // Show full date for older entries
      return date.toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="mood-history">
        <h2>Your Mood History</h2>
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          <div
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              border: "2px solid #f3f3f3",
              borderTop: "2px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginRight: "0.5rem",
            }}
          ></div>
          Loading mood history...
        </div>
        <style>{`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}</style>

      </div>
    )
  }

  if (error) {
    return (
      <div className="mood-history">
        <h2>Your Mood History</h2>
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "#dc2626",
            backgroundColor: "#fef2f2",
            borderRadius: "0.5rem",
            border: "1px solid #fecaca",
          }}
        >
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="mood-history">
      <h2>Your Mood History</h2>

      {moodEntries.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "#666",
            fontStyle: "italic",
            backgroundColor: "#f9fafb",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
          }}
        >
          No mood entries yet. Start by logging how you're feeling today!
        </div>
      ) : (
        <div className="mood-entries">
          {moodEntries.map((entry) => (
            <div
              key={entry.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "white",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)"
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
              }}
            >
              {/* Mood Emoji */}
              <div style={{ fontSize: "2rem", flexShrink: 0 }}>{entry.moodEmoji || "😐"}</div>

              {/* Entry Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "0.25rem",
                    color: "#1f2937",
                  }}
                >
                  {formatDateTime(entry.timestamp)}
                </div>

                {entry.moodLabel && (
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Feeling: {entry.moodLabel}
                  </div>
                )}

                {entry.note && (
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#4b5563",
                      fontStyle: "italic",
                      lineHeight: "1.4",
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: "#f9fafb",
                      borderRadius: "0.25rem",
                      borderLeft: "3px solid #3b82f6",
                    }}
                  >
                    "{entry.note}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
