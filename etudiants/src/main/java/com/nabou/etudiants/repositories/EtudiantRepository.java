package com.nabou.etudiants.repositories;

import com.nabou.etudiants.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
}