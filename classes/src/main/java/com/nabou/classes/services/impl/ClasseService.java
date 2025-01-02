package com.nabou.classes.services.impl;

import com.nabou.classes.dto.ClasseDto;
import com.nabou.classes.entities.Classe;
import com.nabou.classes.repositories.ClasseRepository;
import com.nabou.classes.services.IClasseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClasseService implements IClasseService {

    private final ClasseRepository classeRepository;

    // Constructeur pour l'injection de dépendances
    public ClasseService(ClasseRepository classeRepository) {
        this.classeRepository = classeRepository;
    }

    @Override
    public List<ClasseDto> getAllClasses() {
        return classeRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ClasseDto getClasseById(Long id) {
        Classe classe = classeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Classe not found"));
        return mapToDto(classe);
    }

    @Override
    public ClasseDto saveClasse(ClasseDto classeDto) {
        Classe classe = mapToEntity(classeDto);
        Classe savedClasse = classeRepository.save(classe);
        return mapToDto(savedClasse);
    }

    @Override
    public ClasseDto updateClasse(Long id, ClasseDto classeDto) {
        Classe existingClasse = classeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Classe not found"));
        existingClasse.setName(classeDto.getName());
        existingClasse.setDescription(classeDto.getDescription());
        Classe updatedClasse = classeRepository.save(existingClasse);
        return mapToDto(updatedClasse);
    }

    @Override
    public void deleteClasse(Long id) {
        classeRepository.deleteById(id);
    }

    private ClasseDto mapToDto(Classe classe) {
        return new ClasseDto(classe.getId(), classe.getName(), classe.getDescription());
    }

    private Classe mapToEntity(ClasseDto dto) {
        Classe classe = new Classe();
        classe.setId(dto.getId());
        classe.setName(dto.getName());
        classe.setDescription(dto.getDescription());
        return classe;
    }
}
