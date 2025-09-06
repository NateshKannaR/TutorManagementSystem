package com.examly.springapp.controller;

import com.examly.springapp.model.Student;
import com.examly.springapp.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepo studentRepo;

    @PostMapping("/addStudent")
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        try {
            studentRepo.save(student);
            return ResponseEntity.ok("Student registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to register student");
        }
    }

    @GetMapping("/getAllStudents")
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
}