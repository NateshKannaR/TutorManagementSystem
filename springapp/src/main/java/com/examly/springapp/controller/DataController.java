package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

@RestController
@CrossOrigin
public class DataController {

    private final UserRepository userRepository;

    public DataController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/createUser")
    public User createUser(@RequestParam String username) {
        if (!userRepository.findByUsername(username).isPresent()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword("password");
            user.setEmail(username + "@example.com");
            user.setRole(User.Role.TUTOR);
            return userRepository.save(user);
        }
        return userRepository.findByUsername(username).get();
    }
}