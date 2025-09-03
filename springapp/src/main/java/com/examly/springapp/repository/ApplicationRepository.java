package com.examly.springapp.repository;

import com.examly.springapp.model.Application;
import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStatus(Application.Status status);
    List<Application> findByUser(User user);
    Optional<Application> findByUserAndStatus(User user, Application.Status status);
    List<Application> findByReviewer(User reviewer);
    long countByStatus(Application.Status status);
}