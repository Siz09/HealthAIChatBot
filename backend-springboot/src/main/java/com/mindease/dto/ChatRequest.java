package com.mindease.dto;

import jakarta.validation.constraints.NotBlank;

public class ChatRequest {
    @NotBlank(message = "Message cannot be empty")
    private String message;
    
    private String anonymousId;

    // Constructors
    public ChatRequest() {}

    public ChatRequest(String message, String anonymousId) {
        this.message = message;
        this.anonymousId = anonymousId;
    }

    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getAnonymousId() { return anonymousId; }
    public void setAnonymousId(String anonymousId) { this.anonymousId = anonymousId; }
}