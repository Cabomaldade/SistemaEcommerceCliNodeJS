package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Login;
import com.example.demo.repositories.LoginRepository;


@RestController
@RequestMapping(value="/logins")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginResource {
	
	@Autowired
	private LoginRepository service;
	
	
	@CrossOrigin
	@PostMapping
	public ResponseEntity<List<Login>> findAll() {
		List<Login> login = service.findAll();
		return ResponseEntity.ok().body(login);
	}

}
