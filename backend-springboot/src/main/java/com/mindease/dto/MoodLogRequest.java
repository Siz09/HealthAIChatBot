package com.mindease.dto;

import jakarta.validation.constraints.NotBlank;

public class MoodLogRequest {
    @NotBlank(message = "Mood cannot be empty")
    private String mood;
    
    private String moodEmoji;
    private String moodLabel;
    private String note;
    private String anonymousId;

    // Constructors
    public MoodLogRequest() {}

    public MoodLogRequest(String mood, String moodEmoji, String moodLabel, String note, String anonymousId) {
        this.mood = mood;
        this.moodEmoji = moodEmoji;
        this.moodLabel = moodLabel;
        this.note = note;
        this.anonymousId = anonymousId;
    }

    // Getters and Setters
    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public String getMoodEmoji() { return moodEmoji; }
    public void setMoodEmoji(String moodEmoji) { this.moodEmoji = moodEmoji; }

    public String getMoodLabel() { return moodLabel; }
    public void setMoodLabel(String moodLabel) { this.moodLabel = moodLabel; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public String getAnonymousId() { return anonymousId; }
    public void setAnonymousId(String anonymousId) { this.anonymousId = anonymousId; }
}