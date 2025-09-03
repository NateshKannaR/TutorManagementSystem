package com.examly.springapp.service;

import com.examly.springapp.model.Document;
import com.examly.springapp.model.Application;
import com.examly.springapp.repository.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUploadService {

    private final String uploadDir = "uploads/";
    private final ApplicationRepository applicationRepository;

    public FileUploadService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
        createUploadDirectory();
    }

    private void createUploadDirectory() {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    public Document uploadFile(MultipartFile file, Long applicationId, Document.DocumentType documentType) {
        try {
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), filePath);

            Document document = new Document();
            document.setFileName(file.getOriginalFilename());
            document.setFilePath(filePath.toString());
            document.setFileType(file.getContentType());
            document.setFileSize(file.getSize());
            document.setDocumentType(documentType);
            document.setApplication(application);

            return document;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    public boolean deleteFile(String filePath) {
        try {
            Path path = Paths.get(filePath);
            return Files.deleteIfExists(path);
        } catch (IOException e) {
            return false;
        }
    }

    public byte[] downloadFile(String filePath) {
        try {
            Path path = Paths.get(filePath);
            return Files.readAllBytes(path);
        } catch (IOException e) {
            throw new RuntimeException("Failed to download file", e);
        }
    }
}