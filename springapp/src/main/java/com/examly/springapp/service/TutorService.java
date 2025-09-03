package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.examly.springapp.exception.InvalidExperienceException;
import com.examly.springapp.model.Tutor;
import com.examly.springapp.model.Application;
import com.examly.springapp.repository.TutorRepo;

@Service
public class TutorService {

    private final TutorRepo tutorRepo;
    private final ApplicationService applicationService;

    public TutorService(TutorRepo tutorRepo, ApplicationService applicationService) {
        this.tutorRepo = tutorRepo;
        this.applicationService = applicationService;
    }

    public Tutor addTutor(Tutor tutor) {
        if (tutor.getExperience() < 0) {
            throw new InvalidExperienceException("Experience cannot be negative.");
        }
        return tutorRepo.save(tutor);
    }

    public Tutor addTutorWithApplication(Tutor tutor, String username) {
        if (tutor.getExperience() < 0) {
            throw new InvalidExperienceException("Experience cannot be negative.");
        }
        Tutor savedTutor = tutorRepo.save(tutor);
        if (username != null && !username.isEmpty()) {
            applicationService.createApplication(savedTutor, username);
        }
        return savedTutor;
    }

    public List<Tutor> getAllTutors() {
        return tutorRepo.findAll();
    }

    public List<Tutor> getApprovedTutors() {
        return tutorRepo.findAll(); // For now, return all tutors
    }

    public Tutor getTutorById(int id) {
        return tutorRepo.findById(id).orElse(null);
    }

    public Tutor updateTutor(Tutor tutor) {
        if (tutor.getExperience() < 0) {
            throw new InvalidExperienceException("Experience cannot be negative.");
        }
        return tutorRepo.save(tutor);
    }

    public void deleteTutor(int id) {
        tutorRepo.deleteById(id);
    }
}
