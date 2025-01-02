package com.nabou.classes.services;

import com.nabou.classes.dto.ClasseDto;

import java.util.List;

public interface IClasseService {
    List<ClasseDto> getAllClasses();
    ClasseDto getClasseById(Long id);
    ClasseDto saveClasse(ClasseDto classeDto);
    ClasseDto updateClasse(Long id, ClasseDto classeDto);
    void deleteClasse(Long id);
}