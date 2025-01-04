package com.nabou.matieres.services.impl;

import com.nabou.matieres.entities.Matiere;
import com.nabou.matieres.repositories.MatiereRepository;
import com.nabou.matieres.services.IMatiereService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatiereServiceImpl implements IMatiereService {

    private final MatiereRepository matiereRepository;

    // Constructeur pour l'injection de dépendances
    public MatiereServiceImpl(MatiereRepository matiereRepository) {
        this.matiereRepository = matiereRepository;
    }

    @Override
    public List<Matiere> getAllMatieres() {
        // Récupère toutes les matières de la base de données
        return matiereRepository.findAll();
    }

    @Override
    public Matiere getMatiereById(int id) {
        // Récupère une matière par son ID, ou lève une exception si elle n'existe pas
        return matiereRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matiere not found with ID: " + id));
    }

    @Override
    public Matiere addMatiere(Matiere matiere) {
        // Ajoute une nouvelle matière dans la base de données
        return matiereRepository.save(matiere);
    }

    @Override
    public Matiere updateMatiere(int id, Matiere matiere) {
        // Met à jour une matière existante
        return matiereRepository.findById(id)
                .map(existingMatiere -> {
                    existingMatiere.setName(matiere.getName());
                    existingMatiere.setCoefficient(matiere.getCoefficient());
                    return matiereRepository.save(existingMatiere);
                })
                .orElseThrow(() -> new RuntimeException("Matiere not found with ID: " + id));
    }

    @Override
    public boolean deleteMatiere(int id) {
        // Supprime une matière si elle existe
        if (matiereRepository.existsById(id)) {
            matiereRepository.deleteById(id);
            return true;
        } else {
            throw new RuntimeException("Matiere not found with ID: " + id);
        }
    }
}
