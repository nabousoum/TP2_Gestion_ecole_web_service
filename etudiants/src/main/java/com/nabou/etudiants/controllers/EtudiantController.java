package com.nabou.etudiants.controllers;

import com.nabou.etudiants.dto.EtudiantDto;
import com.nabou.etudiants.services.IEtudiantService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

    @Autowired
    private IEtudiantService etudiantService;

    @GetMapping
    public List<EtudiantDto> getAllEtudiants() {
        return etudiantService.getAllEtudiants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EtudiantDto> getEtudiantById(@PathVariable Long id) {
        return etudiantService.getEtudiantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EtudiantDto createEtudiant(@RequestBody EtudiantDto etudiantDto) {
        return etudiantService.saveEtudiant(etudiantDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EtudiantDto> updateEtudiant(@PathVariable Long id, @RequestBody EtudiantDto etudiantDto) {
        return etudiantService.updateEtudiant(id, etudiantDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
        etudiantService.deleteEtudiant(id);
        return ResponseEntity.noContent().build();
    }
}