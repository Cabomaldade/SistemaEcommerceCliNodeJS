package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo,Integer>{
	

}

