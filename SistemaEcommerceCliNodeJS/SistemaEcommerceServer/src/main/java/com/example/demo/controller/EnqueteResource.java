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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.domain.Enquete;
import com.example.demo.repositories.EnqueteRepository;

@RestController
@RequestMapping(value="/enquetes")
@CrossOrigin(origins = "http://localhost:4200")
public class EnqueteResource {
	@Autowired
	private EnqueteRepository service;
	
	@GetMapping
	public ResponseEntity<List<Enquete>> findAll() {
		List<Enquete> enquete = service.findAll();
		return ResponseEntity.ok().body(enquete);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Void> insert(@RequestBody Enquete obj){
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{id}")
				.buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
		
	}

	@PutMapping
	public ResponseEntity<?> atualizar(@Valid @RequestBody Enquete celular) {
		service.save(celular);
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
