"use client"

import { useState } from "react"
import { useChat } from "../contexts/chat-context"

const MOOD_OPTIONS = [
  { emoji: "😢", label: "Very Sad", value: "very_sad" },
  { emoji: "😟", label: "Sad", value: "sad" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "🙂", label: "Happy", value: "happy" },
  { emoji: "😄", label: "Very Happy", value: "very_happy" },
]

export default function MoodPicker() {
  const { anonymousId } = useChat()
  const [selectedMood, setSelectedMood] = useState(null)
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    setError(null)
    setSuccessMessage("")
  }

  const handleNoteChange = (e) => {
    setNote(e.target.value)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedMood) {
      setError("Please select a mood before submitting.")
      return
    }

    if (!anonymousId) {
      setError("User session not available.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Save mood entry to Spring Boot backend
      const response = await fetch("http://localhost:8080/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anonymousId: anonymousId,
          mood: selectedMood.value,
          moodEmoji: selectedMood.emoji,
          moodLabel: selectedMood.label,
          note: note.trim() || null,
        }),
      });

      if (response.ok) {
        // Reset form
        setSelectedMood(null)
        setNote("")
        setSuccessMessage("Mood saved successfully! 🎉")

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save your mood. Please try again.");
      }
    } catch (error) {
      console.error("Error saving mood:", error)
      setError("Failed to save your mood. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mood-picker">
      <h2>How are you feeling today?</h2>

      {error && (
        <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div className="success-message" style={{ color: "green", marginBottom: "1rem" }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Mood Selection */}
        <div className="mood-options" style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Select your mood:</label>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => handleMoodSelect(mood)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  border: selectedMood?.value === mood.value ? "2px solid #3b82f6" : "1px solid #ccc",
                  borderRadius: "0.5rem",
                  background: selectedMood?.value === mood.value ? "#dbeafe" : "white",
                  cursor: "pointer",
                  minWidth: "80px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedMood?.value !== mood.value) {
                    e.target.style.background = "#f3f4f6"
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedMood?.value !== mood.value) {
                    e.target.style.background = "white"
                  }
                }}
                aria-label={`Select ${mood.label} mood`}
              >
                <span style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{mood.emoji}</span>
                <span style={{ fontSize: "0.75rem", textAlign: "center" }}>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div className="note-section" style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="mood-note" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            Add a note (optional):
          </label>
          <textarea
            id="mood-note"
            value={note}
            onChange={handleNoteChange}
            placeholder="What's on your mind today?"
            rows={3}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              resize: "vertical",
              fontFamily: "inherit",
            }}
            maxLength={500}
          />
          <small style={{ color: "#666", fontSize: "0.75rem" }}>{note.length}/500 characters</small>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedMood || isSubmitting}
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            backgroundColor: !selectedMood || isSubmitting ? "#ccc" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: !selectedMood || isSubmitting ? "not-allowed" : "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          {isSubmitting ? "Saving..." : selectedMood ? `Save Mood ${selectedMood.emoji}` : "Select a mood first"}
        </button>
      </form>
    </div>
  )
}
        mood: selectedMood.value,
        moodEmoji: selectedMood.emoji,
        moodLabel: selectedMood.label,
        note: note.trim() || null,
        timestamp: serverTimestamp(),
      });

      // Reset form
      setSelectedMood(null)
      setNote("")
      setSuccessMessage("Mood saved successfully! 🎉")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error saving mood:", error)
      
      setError("Failed to save your mood. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
    
  }

  return (
    <div className="mood-picker">
      <h2>How are you feeling today?</h2>

      {error && (
        <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div className="success-message" style={{ color: "green", marginBottom: "1rem" }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Mood Selection */}
        <div className="mood-options" style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Select your mood:</label>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => handleMoodSelect(mood)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  border: selectedMood?.value === mood.value ? "2px solid #3b82f6" : "1px solid #ccc",
                  borderRadius: "0.5rem",
                  background: selectedMood?.value === mood.value ? "#dbeafe" : "white",
                  cursor: "pointer",
                  minWidth: "80px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedMood?.value !== mood.value) {
                    e.target.style.background = "#f3f4f6"
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedMood?.value !== mood.value) {
                    e.target.style.background = "white"
                  }
                }}
                aria-label={`Select ${mood.label} mood`}
              >
                <span style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{mood.emoji}</span>
                <span style={{ fontSize: "0.75rem", textAlign: "center" }}>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div className="note-section" style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="mood-note" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            Add a note (optional):
          </label>
          <textarea
            id="mood-note"
            value={note}
            onChange={handleNoteChange}
            placeholder="What's on your mind today?"
            rows={3}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              resize: "vertical",
              fontFamily: "inherit",
            }}
            maxLength={500}
          />
          <small style={{ color: "#666", fontSize: "0.75rem" }}>{note.length}/500 characters</small>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedMood || isSubmitting}
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            backgroundColor: !selectedMood || isSubmitting ? "#ccc" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: !selectedMood || isSubmitting ? "not-allowed" : "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          {isSubmitting ? "Saving..." : selectedMood ? `Save Mood ${selectedMood.emoji}` : "Select a mood first"}
        </button>
      </form>
    </div>
  )
}
        mood: selectedMood.value,
        moodEmoji: selectedMood.emoji,
        moodLabel: selectedMood.label,
        note: note.trim() || null,
        timestamp: serverTimestamp(),
      });

      // Reset form
      setSelectedMood(null)
      setNote("")
      setSuccessMessage("Mood saved successfully! 🎉")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error saving mood:", error)
      
      setError("Failed to save your mood. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
    
  }

  return (
    <div className="mood-picker">
      <h2>How are you feeling today?</h2>

      {error && (
        <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div className="success-message" style={{ color: "green", marginBottom: "1rem" }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Mood Selection */}
        <div className="mood-options" style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Select your mood:</label>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => handleMoodSelect(mood)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  border: selectedMood?.value === mood.value ? "2px solid #3b82f6" : "1px solid #ccc",
                  borderRadius: "0.5rem",
                  background: selectedMood?.value === mood.value ? "#dbeafe" : "white",
                  cursor: "pointer",
                  minWidth: "80px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedMood?.value !== mood.value) {
                    e.target.style.background = "#f3f4f6"
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedMood?.value !== mood.value) {
                    e.target.style.background = "white"
                  }
                }}
                aria-label={`Select ${mood.label} mood`}
              >
                <span style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{mood.emoji}</span>
                <span style={{ fontSize: "0.75rem", textAlign: "center" }}>{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div className="note-section" style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="mood-note" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            Add a note (optional):
          </label>
          <textarea
            id="mood-note"
            value={note}
            onChange={handleNoteChange}
            placeholder="What's on your mind today?"
            rows={3}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem",
              resize: "vertical",
              fontFamily: "inherit",
            }}
            maxLength={500}
          />
          <small style={{ color: "#666", fontSize: "0.75rem" }}>{note.length}/500 characters</small>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedMood || isSubmitting}
          style={{
            width: "100%",
            padding: "0.75rem 1.5rem",
            backgroundColor: !selectedMood || isSubmitting ? "#ccc" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: !selectedMood || isSubmitting ? "not-allowed" : "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          {isSubmitting ? "Saving..." : selectedMood ? `Save Mood ${selectedMood.emoji}` : "Select a mood first"}
        </button>
      </form>
    </div>
  )
}
