package com.example.demo.service;

import com.example.demo.model.Lennud;
import com.example.demo.repository.LennudRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LennudService {
    private final LennudRepository LennudRepository;
    public LennudService(LennudRepository lennudRepository) {
        this.LennudRepository = lennudRepository;
    }
    public List<Lennud> getAllLennud() {
        return LennudRepository.findAll();
    }
    public List<Lennud> getLennudByName(String name) {
        return null;
    }
}
