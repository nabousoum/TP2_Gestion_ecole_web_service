package com.nabou.classes.controllers;

import com.nabou.classes.dto.ClasseDto;
import com.nabou.classes.services.IClasseService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ClasseController {

    private final IClasseService classeService;

    // Constructeur pour l'injection de dépendances
    public ClasseController(IClasseService classeService) {
        this.classeService = classeService;
    }

    @QueryMapping
    public List<ClasseDto> getAllClasses() {
        return classeService.getAllClasses();
    }

    @QueryMapping
    public ClasseDto getClasseById(@Argument Long id) {
        return classeService.getClasseById(id);
    }

    @MutationMapping
    public ClasseDto saveClasse(@Argument String name, @Argument String description) {
        return classeService.saveClasse(new ClasseDto(null, name, description));
    }

    @MutationMapping
    public ClasseDto updateClasse(@Argument Long id, @Argument String name, @Argument String description) {
        return classeService.updateClasse(id, new ClasseDto(id, name, description));
    }

    @MutationMapping
    public boolean deleteClasse(@Argument Long id) {
        classeService.deleteClasse(id);
        return true;
    }
}
