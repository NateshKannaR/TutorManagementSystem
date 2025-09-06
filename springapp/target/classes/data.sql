-- Clear existing data first
DELETE FROM users;

-- Insert fresh data with correct roles
INSERT INTO users (username, password, email, role) VALUES 
('NateshKannaR', '123456', 'nateshkannar@admin.com', 'ADMIN');

INSERT INTO users (username, password, email, role) VALUES 
('admin', 'password', 'admin@example.com', 'SYSTEM_ADMINISTRATOR');

INSERT INTO users (username, password, email, role) VALUES 
('student1', 'password', 'student1@example.com', 'STUDENT');

INSERT INTO users (username, password, email, role) VALUES 
('tutor1', 'password', 'tutor1@example.com', 'TUTOR');