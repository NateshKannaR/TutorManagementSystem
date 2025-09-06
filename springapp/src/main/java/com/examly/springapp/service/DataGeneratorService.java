package com.examly.springapp.service;

import com.examly.springapp.model.Tutor;
import com.examly.springapp.repository.TutorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class DataGeneratorService {

    @Autowired
    private TutorRepo tutorRepo;

    private final String[] names = {"Alex Johnson", "Sarah Wilson", "Mike Chen", "Emma Davis", "John Smith", "Lisa Brown"};
    private final String[] subjects = {"Math", "Physics", "Chemistry", "Biology", "English", "History"};
    private final String[] qualifications = {"PhD", "MSc", "BSc", "MA", "BA"};
    private final Random random = new Random();

    @Scheduled(fixedRate = 30000) // Every 30 seconds
    public void generateRandomTutor() {
        Tutor tutor = new Tutor();
        tutor.setName(names[random.nextInt(names.length)]);
        tutor.setSubject(subjects[random.nextInt(subjects.length)]);
        tutor.setQualification(qualifications[random.nextInt(qualifications.length)]);
        tutor.setExperience(random.nextInt(10) + 1);
        tutor.setPhoneNumber("555" + String.format("%07d", random.nextInt(10000000)));
        
        tutorRepo.save(tutor);
    }

    @Scheduled(fixedRate = 45000) // Every 45 seconds
    public void updateRandomTutor() {
        var tutors = tutorRepo.findAll();
        if (!tutors.isEmpty()) {
            Tutor tutor = tutors.get(random.nextInt(tutors.size()));
            tutor.setExperience(tutor.getExperience() + 1);
            tutorRepo.save(tutor);
        }
    }
}