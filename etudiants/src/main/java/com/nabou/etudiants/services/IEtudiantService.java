package com.nabou.etudiants.services;

import com.nabou.etudiants.dto.EtudiantDto;

import java.util.List;
import java.util.Optional;

public interface IEtudiantService {
    List<EtudiantDto> getAllEtudiants();
    Optional<EtudiantDto> getEtudiantById(Long id);
    EtudiantDto saveEtudiant(EtudiantDto etudiantDto);
    Optional<EtudiantDto> updateEtudiant(Long id, EtudiantDto etudiantDto);
    void deleteEtudiant(Long id);
}
