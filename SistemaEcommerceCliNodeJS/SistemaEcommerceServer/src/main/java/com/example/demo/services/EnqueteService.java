package com.example.demo.services;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Enquete;
import com.example.demo.repositories.EnqueteRepository;

@Service
public class EnqueteService {

	@Autowired
	private EnqueteRepository repo;
	
	public Enquete buscar(Integer id) {
		Enquete obj = repo.findOne(id);
		if(obj == null) {
			throw new ObjectNotFoundException("Objeto não encontrado!: " + id
					+ ", Tipo: " + Enquete.class.getName(), null);
		}
		return obj;
	}
	
	public Enquete insert(Enquete obj) {
		obj.setId(null);
		return repo.save(obj);
	}
}
