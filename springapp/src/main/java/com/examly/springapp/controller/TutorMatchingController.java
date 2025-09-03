package com.examly.springapp.controller;

import com.examly.springapp.model.Tutor;
import com.examly.springapp.service.TutorMatchingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/matching")
@CrossOrigin
public class TutorMatchingController {

    private final TutorMatchingService tutorMatchingService;

    public TutorMatchingController(TutorMatchingService tutorMatchingService) {
        this.tutorMatchingService = tutorMatchingService;
    }

    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<Tutor>> findTutorsBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(tutorMatchingService.findTutorsBySubject(subject));
    }

    @GetMapping("/experience/{minExperience}")
    public ResponseEntity<List<Tutor>> findTutorsByExperience(@PathVariable int minExperience) {
        return ResponseEntity.ok(tutorMatchingService.findTutorsByExperience(minExperience));
    }

    @GetMapping("/recommend")
    public ResponseEntity<List<Tutor>> recommendTutors(
            @RequestParam String subject,
            @RequestParam(defaultValue = "0") int minExperience) {
        return ResponseEntity.ok(tutorMatchingService.recommendTutors(subject, minExperience));
    }
}