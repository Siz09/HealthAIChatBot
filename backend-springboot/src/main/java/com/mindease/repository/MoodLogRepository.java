package com.mindease.repository;

import com.mindease.entity.MoodLog;
import com.mindease.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MoodLogRepository extends JpaRepository<MoodLog, Long> {
    List<MoodLog> findByUserOrderByCreatedAtDesc(User user);
    List<MoodLog> findByUserAnonymousIdOrderByCreatedAtDesc(String anonymousId);
}