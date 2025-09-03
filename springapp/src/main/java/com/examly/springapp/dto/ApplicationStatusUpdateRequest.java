package com.examly.springapp.dto;

import com.examly.springapp.model.Application;

public class ApplicationStatusUpdateRequest {
    private Application.Status status;
    private String comments;
    private String reviewerUsername;

    public ApplicationStatusUpdateRequest() {}

    public ApplicationStatusUpdateRequest(Application.Status status, String comments, String reviewerUsername) {
        this.status = status;
        this.comments = comments;
        this.reviewerUsername = reviewerUsername;
    }

    public Application.Status getStatus() { return status; }
    public void setStatus(Application.Status status) { this.status = status; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public String getReviewerUsername() { return reviewerUsername; }
    public void setReviewerUsername(String reviewerUsername) { this.reviewerUsername = reviewerUsername; }
}