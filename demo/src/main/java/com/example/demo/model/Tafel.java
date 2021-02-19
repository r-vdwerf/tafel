package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity /* Annotation, save to DB */
public class Tafel {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	long id; /* long because */
	
	private String wijk;
	private int capaciteit;
	private boolean bijHetRaam;
	
	/* Getters and Setters, something something encapsulation */
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getWijk() {
		return wijk;
	}
	public void setWijk(String wijk) {
		this.wijk = wijk;
	}
	public int getCapaciteit() {
		return capaciteit;
	}
	public void setCapaciteit(int capaciteit) {
		this.capaciteit = capaciteit;
	}
	public boolean isBijHetRaam() {
		return bijHetRaam;
	}
	public void setBijHetRaam(boolean bijHetRaam) {
		this.bijHetRaam = bijHetRaam;
	}
}