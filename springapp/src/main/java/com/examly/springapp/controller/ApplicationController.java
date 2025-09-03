package com.examly.springapp.controller;

import com.examly.springapp.model.Application;
import com.examly.springapp.service.ApplicationService;
import com.examly.springapp.dto.ApplicationStatusUpdateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Application>> getApplicationsByStatus(@PathVariable Application.Status status) {
        return ResponseEntity.ok(applicationService.getApplicationsByStatus(status));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Application>> getUserApplications(@PathVariable String username) {
        return ResponseEntity.ok(applicationService.getUserApplications(username));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long id, 
                                                   @RequestBody ApplicationStatusUpdateRequest request) {
        try {
            Application updated = applicationService.updateApplicationStatus(id, request.getStatus(), 
                request.getComments(), request.getReviewerUsername());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/stats/count/{status}")
    public ResponseEntity<Long> getApplicationCountByStatus(@PathVariable Application.Status status) {
        return ResponseEntity.ok(applicationService.getApplicationCountByStatus(status));
    }
}