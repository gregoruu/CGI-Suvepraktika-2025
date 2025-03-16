package com.example.demo.service;

import com.example.demo.model.Lennud;
import com.example.demo.repository.LendRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LendService {
    private final LendRepository lendRepository;

    public LendService(LendRepository lendRepository) {
        this.lendRepository = lendRepository;
    }

    public Optional<Lennud> getLendById(Long id) {
        return lendRepository.findById(id);
    }
}
