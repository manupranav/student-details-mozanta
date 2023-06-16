package com.manupranav.StudentsInfo.controller;

import com.manupranav.StudentsInfo.model.Student;
import com.manupranav.StudentsInfo.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class StudentController {
    @Autowired
    public StudentService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student createStudent(@Valid @RequestBody Student student){
        return service.addStudent(student);

    }

    @GetMapping
    public List<Student> getAllStudents(){
        return service.findAllStudents();
    }
}
