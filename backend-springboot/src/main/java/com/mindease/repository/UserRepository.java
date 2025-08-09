package com.mindease.repository;

import com.mindease.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAnonymousId(String anonymousId);
    Optional<User> findByEmail(String email);
    boolean existsByAnonymousId(String anonymousId);
    boolean existsByEmail(String email);
}