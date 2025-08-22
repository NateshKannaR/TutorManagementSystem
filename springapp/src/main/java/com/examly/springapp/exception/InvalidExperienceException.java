package com.examly.springapp.exception;

public class InvalidExperienceException extends RuntimeException {
    public InvalidExperienceException(String message) {
        super(message);
    }
}
