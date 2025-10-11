package com.example.NEXY.service;

import com.example.NEXY.model.Categoria;
import com.example.NEXY.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Categoria findById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com ID: " + id));
    }

    public Categoria save(Categoria item) {
        return categoriaRepository.save(item);
    }

    public Categoria update(Long id, Categoria itemAtualizado) {
        return categoriaRepository.findById(id).map(item -> {
            item.setNome(itemAtualizado.getNome());
            return categoriaRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("Categoria não encontrada com ID: " + id));
    }

    public void delete(Long id) {
        categoriaRepository.deleteById(id);
    }

}
