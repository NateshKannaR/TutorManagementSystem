package com.examly.springapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.exception.InvalidExperienceException;
import com.examly.springapp.model.Tutor;
import com.examly.springapp.service.TutorService;

import java.util.List;

@RestController
@CrossOrigin
public class TutorController {

    private final TutorService tutorService;

    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

    @PostMapping("/addTutor")
    public ResponseEntity<?> addTutor(@RequestBody Tutor tutor, 
                                     @RequestHeader(value = "X-Username", required = false) String username) {
        try {
            Tutor savedTutor = tutorService.addTutor(tutor);
            return ResponseEntity.ok(savedTutor);
        } catch (InvalidExperienceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing application");
        }
    }

    @GetMapping("/getAllTutors")
    public ResponseEntity<?> getAllTutors() {
        try {
            List<Tutor> tutors = tutorService.getAllTutors();
            return ResponseEntity.ok(tutors);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving tutor list");
        }
    }

    @ExceptionHandler(InvalidExperienceException.class)
    public ResponseEntity<String> handleInvalidExperience(InvalidExperienceException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
