package com.examly.springapp;

import java.io.File;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    // Test adding a tutor through the controller
    @Test
    void test_Add_Tutor() throws Exception {
        String tutorJson = "{\"name\": \"John Doe\",\"subject\": \"Math\",\"qualification\": \"MSc in Mathematics\",\"phoneNumber\": \"9876543210\",\"experience\": 5}";
        mockMvc.perform(MockMvcRequestBuilders.post("/addTutor")
                .contentType(MediaType.APPLICATION_JSON)
                .content(tutorJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }

    // Test adding a tutor with invalid (negative) experience
    @Test
    void test_Add_Tutor_With_Invalid_Experience() throws Exception {
        String tutorJson = "{\"name\": \"Jane Doe\",\"subject\": \"Science\",\"qualification\": \"PhD in Biology\",\"phoneNumber\": \"9876543211\",\"experience\": -1}";

        mockMvc.perform(MockMvcRequestBuilders.post("/addTutor")
                .contentType(MediaType.APPLICATION_JSON)
                .content(tutorJson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest()) // Expecting a bad request for invalid experience
                .andExpect(jsonPath("$").value("Experience cannot be negative.")); // Adjust the message based on your
                                                                                   // exception handling
    }

    // Test fetching all tutors from the controller
    @Test
    void test_Get_AllTutors() throws Exception {
        mockMvc.perform(get("/getAllTutors")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andReturn();
    }

    // Verify the controller folder exists
    @Test
    public void test_Controller_Directory_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/controller";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    // Verify the TutorController class exists
    @Test
    public void test_TutorController_File_Exists() {
        String filePath = "src/main/java/com/examly/springapp/controller/TutorController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    // Verify the model folder exists
    @Test
    public void test_Model_Directory_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/model";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    // Verify the Tutor model file exists
    @Test
    public void test_Tutor_File_Exists() {
        String filePath = "src/main/java/com/examly/springapp/model/Tutor.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    // Verify the repository folder exists
    @Test
    public void test_Repository_Folder_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/repository";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    // Verify the service folder exists
    @Test
    public void test_Service_Folder_Exists() {
        String directoryPath = "src/main/java/com/examly/springapp/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    // Verify the TutorService class exists
    @Test
    public void test_TutorService_Class_Exists() {
        checkClassExists("com.examly.springapp.service.TutorService");
    }

    // Verify the Tutor model class exists
    @Test
    public void test_TutorModel_Class_Exists() {
        checkClassExists("com.examly.springapp.model.Tutor");
    }

    // Check that the Tutor model has a 'name' field
    @Test
    public void test_Tutor_Model_Has_name_Field() {
        checkFieldExists("com.examly.springapp.model.Tutor", "name");
    }

    // Check that the Tutor model has a 'subject' field
    @Test
    public void test_Tutor_Model_Has_subject_Field() {
        checkFieldExists("com.examly.springapp.model.Tutor", "subject");
    }

    // Check that the Tutor model has a 'qualification' field
    @Test
    public void test_Tutor_Model_Has_qualification_Field() {
        checkFieldExists("com.examly.springapp.model.Tutor", "qualification");
    }

    // Check that the Tutor model has a 'phoneNumber' field
    @Test
    public void test_Tutor_Model_Has_phoneNumber_Field() {
        checkFieldExists("com.examly.springapp.model.Tutor", "phoneNumber");
    }

    // Check that the TutorRepo implements JpaRepository
    @Test
    public void test_TutorRepo_Extends_JpaRepository() {
        checkClassImplementsInterface("com.examly.springapp.repository.TutorRepo",
                "org.springframework.data.jpa.repository.JpaRepository");
    }

    // Verify that CORS configuration class exists
    @Test
    public void test_CorsConfiguration_Class_Exists() {
        checkClassExists("com.examly.springapp.configuration.CorsConfiguration");
    }

    // Verify that CORS configuration has the Configuration annotation
    @Test
    public void test_CorsConfiguration_Has_Configuration_Annotation() {
        checkClassHasAnnotation("com.examly.springapp.configuration.CorsConfiguration",
                "org.springframework.context.annotation.Configuration");
    }

    // Verify that InvalidExperienceException class exists
    @Test
    public void test_InvalidExperienceException_Class_Exists() {
        checkClassExists("com.examly.springapp.exception.InvalidExperienceException");
    }

    // Verify that InvalidExperienceException extends RuntimeException
    @Test
    public void test_InvalidExperienceException_Extends_RuntimeException() {
        try {
            Class<?> clazz = Class.forName("com.examly.springapp.exception.InvalidExperienceException");
            assertTrue(RuntimeException.class.isAssignableFrom(clazz),
                    "InvalidExperienceException should extend RuntimeException");
        } catch (ClassNotFoundException e) {
            fail("InvalidExperienceException class does not exist.");
        }
    }

    // Helper method to check if a class exists
    private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    // Helper method to check if a field exists in a class
    private void checkFieldExists(String className, String fieldName) {
        try {
            Class<?> clazz = Class.forName(className);
            clazz.getDeclaredField(fieldName);
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field " + fieldName + " in class " + className + " does not exist.");
        }
    }

    // Helper method to check if a class implements an interface
    private void checkClassImplementsInterface(String className, String interfaceName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> interfaceClazz = Class.forName(interfaceName);
            assertTrue(interfaceClazz.isAssignableFrom(clazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or interface " + interfaceName + " does not exist.");
        }
    }

    // Helper method to check if a class has a specific annotation
    private void checkClassHasAnnotation(String className, String annotationName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> annotationClazz = Class.forName(annotationName);
            assertTrue(clazz.isAnnotationPresent((Class<? extends java.lang.annotation.Annotation>) annotationClazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or annotation " + annotationName + " does not exist.");
        }
    }
}
