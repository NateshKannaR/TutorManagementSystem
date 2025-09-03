package com.examly.springapp.service;

import com.examly.springapp.model.Tutor;
import com.examly.springapp.repository.TutorRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TutorMatchingService {

    private final TutorRepo tutorRepository;

    public TutorMatchingService(TutorRepo tutorRepository) {
        this.tutorRepository = tutorRepository;
    }

    public List<Tutor> findTutorsBySubject(String subject) {
        return tutorRepository.findAll().stream()
                .filter(tutor -> tutor.getSubject().toLowerCase().contains(subject.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Tutor> findTutorsByExperience(int minExperience) {
        return tutorRepository.findAll().stream()
                .filter(tutor -> tutor.getExperience() >= minExperience)
                .collect(Collectors.toList());
    }

    public List<Tutor> recommendTutors(String subject, int minExperience) {
        return tutorRepository.findAll().stream()
                .filter(tutor -> tutor.getSubject().toLowerCase().contains(subject.toLowerCase()) 
                              && tutor.getExperience() >= minExperience)
                .sorted((t1, t2) -> Integer.compare(t2.getExperience(), t1.getExperience()))
                .collect(Collectors.toList());
    }

    public double calculateMatchScore(Tutor tutor, String requiredSubject, int requiredExperience) {
        double score = 0.0;
        
        if (tutor.getSubject().toLowerCase().contains(requiredSubject.toLowerCase())) {
            score += 50.0;
        }
        
        if (tutor.getExperience() >= requiredExperience) {
            score += 30.0;
            score += Math.min(20.0, (tutor.getExperience() - requiredExperience) * 2.0);
        }
        
        return Math.min(100.0, score);
    }
}