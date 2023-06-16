package com.manupranav.StudentsInfo.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    private String admissionNum;

    @NotEmpty(message = "Name is required")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "Name should only contain letters and spaces")
    private String name;

    @NotEmpty(message = "Date of Birth is required")
    private String dob;

    @NotEmpty(message = "Class is required")
    private String standard;

    @NotEmpty(message = "Division is required")
    private String division;

    @NotEmpty(message = "Gender is required")
    private String gender;

}
