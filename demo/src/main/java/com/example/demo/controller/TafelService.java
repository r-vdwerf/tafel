package com.example.demo.controller;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Tafel;

@Transactional
@Service
public class TafelService {
	@Autowired /* Dependency injection, Java EE Bean Architecture */
	TafelRepo tr;
	
	public Tafel save(Tafel tafel) {
		return tr.save(tafel);
	}
	
	public Optional <Tafel> findOne(Long id) {
		return tr.findById(id);
	}
	
	public Long delete(Long id) {
		tr.deleteById(id);
		return id;
	}	
	
	public Iterable <Tafel> findAll(){
		Iterable <Tafel> result = tr.findAll();
		return result;
	}
}