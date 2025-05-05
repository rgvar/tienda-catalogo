package com.mercado.intrumentos_item_list.services;

import com.mercado.intrumentos_item_list.entities.Categoria;
import com.mercado.intrumentos_item_list.entities.Instrumento;
import com.mercado.intrumentos_item_list.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Cacheable("getAllCategorias")
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    public Categoria getCategoriaById(Long id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    public Categoria saveCategorias(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria updateCategoria(Long id, Categoria categoria) {
        Optional<Categoria> existingCategoria = categoriaRepository.findById(id);
        if (existingCategoria.isPresent()) {
            Categoria newCategoria = existingCategoria.get();
            newCategoria = categoria;
            return categoriaRepository.save(newCategoria);
        } else {
            throw new RuntimeException("Categoria no encontrada con el ID: " + categoria.getId());
        }
    }

    public Boolean deleteCategoria(Long id) throws Exception{
        try {
            Optional<Categoria> autorOptional = categoriaRepository.findById(id);
            if (autorOptional.isPresent()) {
                categoriaRepository.deleteById(id);
                return true;
            } else {
                throw new Exception("No se encontró categoría con id: " + id);
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}
