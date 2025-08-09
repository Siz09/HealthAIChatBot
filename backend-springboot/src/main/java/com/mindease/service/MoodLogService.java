package com.mindease.service;

import com.mindease.dto.MoodLogRequest;
import com.mindease.dto.MoodLogResponse;
import com.mindease.entity.MoodLog;
import com.mindease.entity.User;
import com.mindease.repository.MoodLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MoodLogService {
    
    @Autowired
    private MoodLogRepository moodLogRepository;
    
    @Autowired
    private UserService userService;

    public MoodLogResponse saveMoodLog(MoodLogRequest request) {
        User user = userService.findOrCreateAnonymousUser(request.getAnonymousId());
        
        MoodLog moodLog = new MoodLog(
            request.getMood(),
            request.getMoodEmoji(),
            request.getMoodLabel(),
            request.getNote(),
            user
        );
        
        MoodLog savedMoodLog = moodLogRepository.save(moodLog);
        return new MoodLogResponse(savedMoodLog);
    }

    public List<MoodLogResponse> getMoodHistory(String anonymousId) {
        List<MoodLog> moodLogs = moodLogRepository.findByUserAnonymousIdOrderByCreatedAtDesc(anonymousId);
        return moodLogs.stream()
                .map(MoodLogResponse::new)
                .collect(Collectors.toList());
    }
}