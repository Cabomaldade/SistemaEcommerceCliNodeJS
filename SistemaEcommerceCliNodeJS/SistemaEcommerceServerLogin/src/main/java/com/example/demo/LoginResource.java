package com.example.demo;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/login")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginResource {

	@Autowired
	private LoginRepository service;
	
	private Login loginTemp;
	
	@PostMapping
	public ResponseEntity<?> login(@Valid @RequestBody Login login) {
		
		System.out.println(login.getEmail());
		System.out.println(login.getPassword());
		
		loginTemp = service.findByEmail(login.getEmail());
		
		//System.out.println(loginTemp.getEmail());
		
		if( loginTemp == null) {
			return ResponseEntity.notFound().build();
		} else if(!loginTemp.getPassword().equals(login.getPassword())){
			
			return ResponseEntity.badRequest().build();
		}
		
		loginTemp.setPassword("Pensou que ia ver o password ne bobao");
		return ResponseEntity.ok().body(loginTemp);
	}
	
	
}
