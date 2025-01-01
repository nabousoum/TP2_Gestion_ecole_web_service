package com.nabou.etudiants.mappers;

import com.nabou.etudiants.dto.EtudiantDto;
import com.nabou.etudiants.entities.Etudiant;
import org.springframework.stereotype.Component;

@Component
public class EtudiantMapper {
    public EtudiantDto toDto(Etudiant etudiant) {
        return new EtudiantDto(
                etudiant.getId(),
                etudiant.getFirstName(),
                etudiant.getLastName(),
                etudiant.getEmail()
        );
    }

    public Etudiant toEntity(EtudiantDto dto) {
        Etudiant etudiant = new Etudiant();
        etudiant.setId(dto.getId()); // Utilisé pour mise à jour
        etudiant.setFirstName(dto.getFirstName());
        etudiant.setLastName(dto.getLastName());
        etudiant.setEmail(dto.getEmail());
        return etudiant;
    }
}
