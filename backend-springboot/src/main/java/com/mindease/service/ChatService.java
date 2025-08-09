package com.mindease.service;

import com.mindease.entity.ChatMessage;
import com.mindease.entity.User;
import com.mindease.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatService {
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    @Autowired
    private UserService userService;

    public ChatMessage saveUserMessage(String message, String anonymousId) {
        User user = userService.findOrCreateAnonymousUser(anonymousId);
        ChatMessage chatMessage = new ChatMessage(message, ChatMessage.MessageSender.USER, user);
        return chatMessageRepository.save(chatMessage);
    }

    public ChatMessage saveBotMessage(String message, String anonymousId) {
        User user = userService.findOrCreateAnonymousUser(anonymousId);
        ChatMessage chatMessage = new ChatMessage(message, ChatMessage.MessageSender.BOT, user);
        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getChatHistory(String anonymousId) {
        return chatMessageRepository.findByUserAnonymousIdOrderByCreatedAtAsc(anonymousId);
    }
}