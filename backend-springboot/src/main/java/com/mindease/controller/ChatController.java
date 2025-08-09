package com.mindease.controller;

import com.mindease.dto.ChatRequest;
import com.mindease.dto.ChatResponse;
import com.mindease.entity.ChatMessage;
import com.mindease.service.ChatService;
import com.mindease.service.OpenAIService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {
    
    @Autowired
    private ChatService chatService;
    
    @Autowired
    private OpenAIService openAIService;

    @PostMapping
    public ResponseEntity<ChatResponse> sendMessage(@Valid @RequestBody ChatRequest request) {
        try {
            // Save user message
            chatService.saveUserMessage(request.getMessage(), request.getAnonymousId());
            
            // Get AI response
            String aiResponse = openAIService.getChatResponse(request.getMessage());
            
            // Save bot message
            ChatMessage botMessage = chatService.saveBotMessage(aiResponse, request.getAnonymousId());
            
            return ResponseEntity.ok(new ChatResponse(aiResponse, botMessage.getId().toString()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(new ChatResponse("I'm sorry, something went wrong. Please try again."));
        }
    }

    @GetMapping("/history/{anonymousId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable String anonymousId) {
        try {
            List<ChatMessage> messages = chatService.getChatHistory(anonymousId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}