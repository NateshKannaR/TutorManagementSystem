package com.examly.springapp.service;

import com.examly.springapp.model.Application;
import com.examly.springapp.repository.ApplicationRepository;
import com.examly.springapp.repository.TutorRepo;
import com.examly.springapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {

    private final ApplicationRepository applicationRepository;
    private final TutorRepo tutorRepository;
    private final UserRepository userRepository;

    public AnalyticsService(ApplicationRepository applicationRepository, 
                          TutorRepo tutorRepository,
                          UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.tutorRepository = tutorRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> getDashboardData() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalApplications", applicationRepository.count());
        data.put("totalTutors", tutorRepository.count());
        data.put("totalUsers", userRepository.count());
        data.put("pendingApplications", applicationRepository.countByStatus(Application.Status.SUBMITTED));
        data.put("approvedApplications", applicationRepository.countByStatus(Application.Status.APPROVED));
        data.put("rejectedApplications", applicationRepository.countByStatus(Application.Status.REJECTED));
        return data;
    }

    public Map<String, Object> getApplicationAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        long total = applicationRepository.count();
        long approved = applicationRepository.countByStatus(Application.Status.APPROVED);
        long rejected = applicationRepository.countByStatus(Application.Status.REJECTED);
        
        double approvalRate = total > 0 ? (double) approved / total * 100 : 0;
        double rejectionRate = total > 0 ? (double) rejected / total * 100 : 0;
        
        analytics.put("totalApplications", total);
        analytics.put("approvalRate", Math.round(approvalRate * 100.0) / 100.0);
        analytics.put("rejectionRate", Math.round(rejectionRate * 100.0) / 100.0);
        analytics.put("pendingReview", applicationRepository.countByStatus(Application.Status.UNDER_REVIEW));
        
        return analytics;
    }

    public Map<String, Long> getApplicationStatusBreakdown() {
        Map<String, Long> breakdown = new HashMap<>();
        for (Application.Status status : Application.Status.values()) {
            breakdown.put(status.toString(), applicationRepository.countByStatus(status));
        }
        return breakdown;
    }
}