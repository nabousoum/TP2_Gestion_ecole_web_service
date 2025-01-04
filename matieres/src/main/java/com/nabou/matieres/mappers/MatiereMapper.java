package com.nabou.matieres.mappers;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MatiereMapper {

    // Mapper une entité JPA vers un objet SOAP
    public com.spring.training.model.Matiere toSoapMatiere(com.nabou.matieres.entities.Matiere entity) {
        if (entity == null) {
            return null;
        }
        com.spring.training.model.Matiere soapMatiere = new com.spring.training.model.Matiere();
        soapMatiere.setId(entity.getId());
        soapMatiere.setName(entity.getName());
        return soapMatiere;
    }

    // Mapper un objet SOAP vers une entité JPA
    public com.nabou.matieres.entities.Matiere toJpaMatiere(com.spring.training.model.Matiere soapMatiere) {
        if (soapMatiere == null) {
            return null;
        }
        com.nabou.matieres.entities.Matiere entity = new com.nabou.matieres.entities.Matiere();
        entity.setId(soapMatiere.getId());
        entity.setName(soapMatiere.getName());
        return entity;
    }

    // Mapper une liste d'entités JPA vers une liste d'objets SOAP
    public List<com.spring.training.model.Matiere> toSoapMatiereList(List<com.nabou.matieres.entities.Matiere> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(this::toSoapMatiere)
                .collect(Collectors.toList());
    }

    // Mapper une liste d'objets SOAP vers une liste d'entités JPA
    public List<com.nabou.matieres.entities.Matiere> toJpaMatiereList(List<com.spring.training.model.Matiere> soapMatieres) {
        if (soapMatieres == null) {
            return null;
        }
        return soapMatieres.stream()
                .map(this::toJpaMatiere)
                .collect(Collectors.toList());
    }
}
