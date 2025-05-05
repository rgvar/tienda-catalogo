package com.mercado.intrumentos_item_list.repositories;

import com.mercado.intrumentos_item_list.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
