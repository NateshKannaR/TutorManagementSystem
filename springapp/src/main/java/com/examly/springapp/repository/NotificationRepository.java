package com.examly.springapp.repository;

import com.examly.springapp.model.Notification;
import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserAndReadFalse(User user);
    List<Notification> findByUser(User user);
    List<Notification> findBySentFalse();
    long countByUserAndReadFalse(User user);
}