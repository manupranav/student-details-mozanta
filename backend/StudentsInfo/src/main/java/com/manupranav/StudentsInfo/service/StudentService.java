package com.manupranav.StudentsInfo.service;

import com.manupranav.StudentsInfo.model.Student;
import com.manupranav.StudentsInfo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;

//    Add student details in to the database
    public Student addStudent(Student student){

        List<Student> allStudents = repository.findAll(Sort.by(Sort.Direction.DESC, "admissionNum"));

        int nextSequenceNumber = 1;
        if (!allStudents.isEmpty()) {
            String sequenceNumberString = allStudents.get(0).getAdmissionNum().substring(2); // get the numeric value of the admission no
            nextSequenceNumber = Integer.parseInt(sequenceNumberString) + 1;

        }
        String studentId = "R-" + String.format("%03d", nextSequenceNumber); //generate admission in R-001, R-002 etc format
        student.setAdmissionNum(studentId);
        return repository.save(student);
    }

    public List<Student> findAllStudents(){
        return repository.findAll();
    }
}
