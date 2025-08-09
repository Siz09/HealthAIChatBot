package com.mindease.controller;

import com.mindease.dto.MoodLogRequest;
import com.mindease.dto.MoodLogResponse;
import com.mindease.service.MoodLogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/mood")
@CrossOrigin(origins = "http://localhost:3000")
public class MoodController {
    
    @Autowired
    private MoodLogService moodLogService;

    @PostMapping
    public ResponseEntity<MoodLogResponse> saveMoodLog(@Valid @RequestBody MoodLogRequest request) {
        try {
            MoodLogResponse response = moodLogService.saveMoodLog(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/history/{anonymousId}")
    public ResponseEntity<List<MoodLogResponse>> getMoodHistory(@PathVariable String anonymousId) {
        try {
            List<MoodLogResponse> moodHistory = moodLogService.getMoodHistory(anonymousId);
            return ResponseEntity.ok(moodHistory);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}