package com.example.demo.controller;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import com.example.demo.model.Tafel;

@Component
public interface TafelRepo extends CrudRepository<Tafel, Long>{

}