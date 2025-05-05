package com.mercado.intrumentos_item_list;

import com.mercado.intrumentos_item_list.entities.Categoria;
import com.mercado.intrumentos_item_list.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {

		SpringApplication.run(Application.class, args);
		System.out.println("APLICACIÓN ON");

	}

}
