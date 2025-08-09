package com.mindease.dto;

import com.mindease.entity.MoodLog;
import java.time.LocalDateTime;

public class MoodLogResponse {
    private Long id;
    private String mood;
    private String moodEmoji;
    private String moodLabel;
    private String note;
    private LocalDateTime timestamp;

    // Constructors
    public MoodLogResponse() {}

    public MoodLogResponse(MoodLog moodLog) {
        this.id = moodLog.getId();
        this.mood = moodLog.getMood();
        this.moodEmoji = moodLog.getMoodEmoji();
        this.moodLabel = moodLog.getMoodLabel();
        this.note = moodLog.getNote();
        this.timestamp = moodLog.getCreatedAt();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public String getMoodEmoji() { return moodEmoji; }
    public void setMoodEmoji(String moodEmoji) { this.moodEmoji = moodEmoji; }

    public String getMoodLabel() { return moodLabel; }
    public void setMoodLabel(String moodLabel) { this.moodLabel = moodLabel; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}