package com.nabou.etudiants.services.impl;

import com.nabou.etudiants.dto.EtudiantDto;
import com.nabou.etudiants.entities.Etudiant;
import com.nabou.etudiants.mappers.EtudiantMapper;
import com.nabou.etudiants.repositories.EtudiantRepository;
import com.nabou.etudiants.services.IEtudiantService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EtudiantService implements IEtudiantService {
    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EtudiantMapper etudiantMapper;
    @Override
    public List<EtudiantDto> getAllEtudiants() {
        return etudiantRepository.findAll()
                .stream()
                .map(etudiantMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<EtudiantDto> getEtudiantById(Long id) {
        return etudiantRepository.findById(id).map(etudiantMapper::toDto);
    }

    @Override
    public EtudiantDto saveEtudiant(EtudiantDto etudiantDto) {
        Etudiant etudiant = etudiantMapper.toEntity(etudiantDto);
        Etudiant savedEtudiant = etudiantRepository.save(etudiant);
        return etudiantMapper.toDto(savedEtudiant);
    }

    @Override
    public Optional<EtudiantDto> updateEtudiant(Long id, EtudiantDto etudiantDto) {
        return etudiantRepository.findById(id)
                .map(existingEtudiant -> {
                    existingEtudiant.setFirstName(etudiantDto.getFirstName());
                    existingEtudiant.setLastName(etudiantDto.getLastName());
                    existingEtudiant.setEmail(etudiantDto.getEmail());
                    Etudiant updatedEtudiant = etudiantRepository.save(existingEtudiant);
                    return etudiantMapper.toDto(updatedEtudiant);
                });
    }

    @Override
    public void deleteEtudiant(Long id) {
        etudiantRepository.deleteById(id);
    }
}