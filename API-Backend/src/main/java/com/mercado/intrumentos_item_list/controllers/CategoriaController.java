package com.mercado.intrumentos_item_list.controllers;


import com.mercado.intrumentos_item_list.entities.Categoria;
import com.mercado.intrumentos_item_list.entities.Instrumento;
import com.mercado.intrumentos_item_list.services.CategoriaService;
import com.mercado.intrumentos_item_list.services.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> getAllCategorias() {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.getAllCategorias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.getCategoriaById(id));
    }

    @PostMapping
    public ResponseEntity<Categoria> createCategoria(@RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.saveCategorias(categoria));

    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.updateCategoria(id, categoria));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInstrumento(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoriaService.deleteCategoria(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

}
