package com.examly.springapp.controller;

import com.examly.springapp.repository.TutorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/live")
@CrossOrigin(origins = "*")
public class LiveDataController {

    @Autowired
    private TutorRepo tutorRepo;

    @GetMapping("/stats")
    public Map<String, Object> getLiveStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTutors", tutorRepo.count());
        stats.put("timestamp", LocalDateTime.now());
        stats.put("status", "active");
        return stats;
    }

    @GetMapping("/heartbeat")
    public Map<String, Object> getHeartbeat() {
        Map<String, Object> heartbeat = new HashMap<>();
        heartbeat.put("status", "alive");
        heartbeat.put("timestamp", LocalDateTime.now());
        heartbeat.put("uptime", System.currentTimeMillis());
        return heartbeat;
    }
}