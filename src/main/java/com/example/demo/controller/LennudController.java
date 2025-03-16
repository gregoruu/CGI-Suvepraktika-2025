package com.example.demo.controller;

import com.example.demo.model.Lennud;
import com.example.demo.repository.LennudRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/lennud")
public class LennudController {

    private final LennudRepository LennudRepository;

    public LennudController(LennudRepository LennudRepository) {
        this.LennudRepository = LennudRepository;
    }

    @GetMapping
    public List<Lennud> getLennud() {
        return LennudRepository.findAll();
    }

    @PostMapping
    public Lennud lisaLend(@RequestBody Lennud lend) {
        return LennudRepository.save(lend);
    }
}
