package com.manupranav.StudentsInfo.repository;

import com.manupranav.StudentsInfo.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {

    @Query(value = "{}", sort = "{ 'admissionNumber' : -1 }", fields = "{ 'admissionNumber': 1 }")
    Optional<String> getAdmissionNumber();
}
