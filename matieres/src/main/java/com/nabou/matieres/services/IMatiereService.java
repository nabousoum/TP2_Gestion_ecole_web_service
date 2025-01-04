package com.nabou.matieres.services;

import com.nabou.matieres.entities.Matiere;

import java.util.List;

public interface IMatiereService {
    List<Matiere> getAllMatieres();
    Matiere getMatiereById(int id);
    Matiere addMatiere(Matiere matiere);
    Matiere updateMatiere(int id , Matiere matiere);
    boolean deleteMatiere(int id);
}
