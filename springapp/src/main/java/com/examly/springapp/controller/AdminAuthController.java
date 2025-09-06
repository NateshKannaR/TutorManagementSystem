package com.examly.springapp.controller;

import com.examly.springapp.dto.AuthResponse;
import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AdminAuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest loginRequest) {
        // Check hardcoded admin credentials first
        if ("NateshKannaR".equals(loginRequest.getUsername()) && "123456".equals(loginRequest.getPassword())) {
            AuthResponse response = new AuthResponse();
            response.setToken("admin-token-NateshKannaR");
            response.setRole("ADMIN");
            response.setMessage("Admin login successful");
            return ResponseEntity.ok(response);
        }
        
        // Check database users
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginRequest.getPassword()) && 
                (user.getRole() == User.Role.ADMIN || user.getRole() == User.Role.SYSTEM_ADMINISTRATOR)) {
                
                AuthResponse response = new AuthResponse();
                response.setToken("admin-token-" + user.getUsername());
                response.setRole(user.getRole().toString());
                response.setMessage("Admin login successful");
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.badRequest().body("Invalid admin credentials");
    }
}