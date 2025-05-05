package com.mercado.intrumentos_item_list.repositories;

import com.mercado.intrumentos_item_list.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {

    @Query("SELECT i FROM Instrumento i WHERE i.categoria.id = :categoriaId ORDER BY i.id DESC")
    List<Instrumento> findByCategoriaId(@Param("categoriaId") Long categoriaId);

    @Query("SELECT i FROM Instrumento i WHERE LOWER(i.instrumento) LIKE %:search% OR LOWER(i.marca) LIKE %:search% OR LOWER(i.modelo) LIKE %:search% OR LOWER(i.categoria.denominacion) LIKE %:search%")
    List<Instrumento> findByAnything(@Param("search") String search);


}
