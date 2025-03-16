package com.example.demo.controller;

import com.example.demo.model.Lennud;
import com.example.demo.service.LendService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/lennud")
public class LendController {
    private final LendService lendService;

    public LendController(LendService lendService) {
        this.lendService = lendService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lennud> getLendById(@PathVariable Long id) {
        Optional<Lennud> lend = lendService.getLendById(id);
        return lend.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
