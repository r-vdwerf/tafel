package com.example.demo.view;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.controller.TafelService;
import com.example.demo.model.Tafel;

@RestController 
public class TafelEndpoint {
	@Autowired
	TafelService ts;
	
	@GetMapping("findall")
	public Iterable<Tafel> findall(){
		return ts.findAll();
	}
	
	@GetMapping("findone")
	public Optional<Tafel> findone(@Param("id") Long id) {
		return ts.findOne(id);			
	}
	
	@PostMapping("save")
	public void save(@RequestBody Tafel tafel) {
		ts.save(tafel);		
	}
	
	@PostMapping("delete")
	public void delete(@RequestBody Long l) {
		ts.delete(l);
	}
	
	/* Activated via HTTP, not used */
	@GetMapping("mweh/{term}")
	public void projecteren(@PathVariable String term) {
		System.out.println(term);
	}
}