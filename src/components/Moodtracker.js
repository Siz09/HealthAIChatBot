"use client"

import MoodPicker from "./MoodPicker"
import MoodHistory from "./Moodhistory"

export default function MoodTracker() {
  return (
    <div className="mood-tracker">
      <h1 className="mood-tracker-title">Mood Tracker</h1>

      {/* Mood Picker Section */}
      <div className="mood-picker-section">
        <MoodPicker />
      </div>

      {/* Mood History Section */}
      <div className="mood-history-section">
        <MoodHistory />
      </div>
    </div>
  )
}
