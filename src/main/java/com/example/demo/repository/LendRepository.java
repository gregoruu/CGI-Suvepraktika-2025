package com.example.demo.repository;

import com.example.demo.model.Lennud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LendRepository extends JpaRepository<Lennud, Long> {
}
