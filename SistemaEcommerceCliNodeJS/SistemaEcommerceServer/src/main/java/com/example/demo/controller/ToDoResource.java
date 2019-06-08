package com.example.demo.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.domain.ToDo;
import com.example.demo.repositories.ToDoRepository;


@RestController
@RequestMapping(value="/todos")
@CrossOrigin(origins = "http://localhost:4200")
public class ToDoResource {
	
	@Autowired
	private ToDoRepository service;
	
	@CrossOrigin
	@GetMapping
	public ResponseEntity<List<ToDo>> findAll() {
		List<ToDo> todo = service.findAll();
		return ResponseEntity.ok().body(todo);
	}
		
	@CrossOrigin
	@PostMapping
	public ResponseEntity<?> salvar(@Valid @RequestBody ToDo todo) {
		service.save(todo);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
		        .buildAndExpand(todo.getCodigo()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@CrossOrigin
	@PutMapping
	public ResponseEntity<?> atualizar(@Valid @RequestBody ToDo todo) {
		service.save(todo);
	    return ResponseEntity.noContent().build();
	}
	
	@CrossOrigin
	@DeleteMapping(value="{id}")
	public ResponseEntity<?> excluir(@PathVariable Integer id) {
		try {
			service.deleteById(id);
			return ResponseEntity.ok(id);	
		} catch(EmptyResultDataAccessException e) {
			return ResponseEntity.notFound().build();
		}
	}

}