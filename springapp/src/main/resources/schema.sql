-- Drop tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tutors;
DROP TABLE IF EXISTS students;

-- Create users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Create tutors table
CREATE TABLE tutors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);

-- Create students table
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    school VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);