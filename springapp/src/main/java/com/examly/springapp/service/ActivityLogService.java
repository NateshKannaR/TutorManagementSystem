package com.examly.springapp.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class ActivityLogService {

    private final String[] activities = {
        "New tutor application received",
        "Application status updated", 
        "User logged in",
        "Data synchronized",
        "System health check completed"
    };
    
    private final Random random = new Random();

    @Scheduled(fixedRate = 15000) // Every 15 seconds
    public void logActivity() {
        String activity = activities[random.nextInt(activities.length)];
        System.out.println("[" + LocalDateTime.now() + "] " + activity);
    }
}