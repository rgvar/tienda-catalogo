package com.mercado.intrumentos_item_list.controllers;

import com.mercado.intrumentos_item_list.dto.InstrumentoDto;
import com.mercado.intrumentos_item_list.dto.InstrumentoSimpleDto;
import com.mercado.intrumentos_item_list.entities.Instrumento;
import com.mercado.intrumentos_item_list.services.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instrumentos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InstrumentoController {

    @Autowired
    private InstrumentoService instrumentoService;




    @GetMapping
    public ResponseEntity<List<Instrumento>> getAllInstrumentos() {
        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.getAllInstrumentos());

    }

    @GetMapping("/{id}")
    public ResponseEntity<InstrumentoDto> getInstrumentoById(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.getInstrumentoById(id));

    }

    @GetMapping("/categoria/{idCategoria}")
    public ResponseEntity<List<Instrumento>> getInstrumentoByCategoria(@PathVariable Long idCategoria) {
        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.getInstrumentoByCategoriaId(idCategoria));

    }

    @GetMapping("/search/{search}")
    public ResponseEntity<List<Instrumento>> searchInstrumento(@PathVariable String search) {
        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.searchInstrumento(search));
    }

    @PostMapping
    public ResponseEntity<InstrumentoDto> createInstrumento(@RequestBody InstrumentoSimpleDto instrumento) {
        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.saveInstrumentos(instrumento));

    }

    @PutMapping("/{id}")
    public ResponseEntity<InstrumentoDto> updateInstrumento(@PathVariable Long id, @RequestBody InstrumentoDto instrumento) {
        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.updateInstrumento(id, instrumento));
    }

    @PutMapping("/venta/{id}")
    public ResponseEntity<Boolean> sellInstrumento(@PathVariable Long id, @RequestBody Integer cantidad) {
        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.sellInstrumento(id, cantidad));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteInstrumento(@PathVariable Long id) throws Exception {

        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.deleteInstrumento(id));

    }


}
