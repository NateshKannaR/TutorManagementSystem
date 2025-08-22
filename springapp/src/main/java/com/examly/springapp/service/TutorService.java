package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.examly.springapp.exception.InvalidExperienceException;
import com.examly.springapp.model.Tutor;
import com.examly.springapp.repository.TutorRepo;

@Service
public class TutorService {

    private final TutorRepo tutorRepo;

    public TutorService(TutorRepo tutorRepo) {
        this.tutorRepo = tutorRepo;
    }

    public Tutor addTutor(Tutor tutor) {
        if (tutor.getExperience() < 0) {
            throw new InvalidExperienceException("Experience cannot be negative.");
        }
        return tutorRepo.save(tutor);
    }

    public List<Tutor> getAllTutors() {
        return tutorRepo.findAll();
    }
}
