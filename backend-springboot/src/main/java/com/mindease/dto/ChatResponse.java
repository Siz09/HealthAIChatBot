package com.mindease.dto;

public class ChatResponse {
    private String reply;
    private String messageId;

    // Constructors
    public ChatResponse() {}

    public ChatResponse(String reply) {
        this.reply = reply;
    }

    public ChatResponse(String reply, String messageId) {
        this.reply = reply;
        this.messageId = messageId;
    }

    // Getters and Setters
    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }

    public String getMessageId() { return messageId; }
    public void setMessageId(String messageId) { this.messageId = messageId; }
}