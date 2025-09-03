package com.examly.springapp.service;

import com.examly.springapp.model.Application;
import com.examly.springapp.model.Tutor;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ApplicationRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public ApplicationService(ApplicationRepository applicationRepository, 
                            UserRepository userRepository,
                            NotificationService notificationService) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public Application createApplication(Tutor tutor, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Application application = new Application(user, tutor);
        Application saved = applicationRepository.save(application);
        
        notificationService.sendApplicationStatusNotification(user, "Application Submitted", 
            "Your tutor application has been submitted successfully.");
        
        return saved;
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<Application> getApplicationsByStatus(Application.Status status) {
        return applicationRepository.findByStatus(status);
    }

    public List<Application> getUserApplications(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return applicationRepository.findByUser(user);
    }

    public Application updateApplicationStatus(Long applicationId, Application.Status status, 
                                             String reviewerComments, String reviewerUsername) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        User reviewer = userRepository.findByUsername(reviewerUsername)
                .orElseThrow(() -> new RuntimeException("Reviewer not found"));

        application.setStatus(status);
        application.setReviewDate(LocalDateTime.now());
        application.setReviewerComments(reviewerComments);
        application.setReviewer(reviewer);

        Application updated = applicationRepository.save(application);
        
        String statusMessage = "Your application status has been updated to: " + status.toString();
        notificationService.sendApplicationStatusNotification(application.getUser(), 
            "Application Status Update", statusMessage);
        
        return updated;
    }

    public long getApplicationCountByStatus(Application.Status status) {
        return applicationRepository.countByStatus(status);
    }
}