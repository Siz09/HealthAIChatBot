package com.mindease.service;

import com.mindease.entity.User;
import com.mindease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User findOrCreateAnonymousUser(String anonymousId) {
        if (anonymousId == null || anonymousId.trim().isEmpty()) {
            anonymousId = generateAnonymousId();
        }

        return userRepository.findByAnonymousId(anonymousId)
                .orElseGet(() -> {
                    User newUser = new User(anonymousId);
                    return userRepository.save(newUser);
                });
    }

    public User findByAnonymousId(String anonymousId) {
        return userRepository.findByAnonymousId(anonymousId).orElse(null);
    }

    private String generateAnonymousId() {
        return "anon_" + UUID.randomUUID().toString().replace("-", "");
    }
}