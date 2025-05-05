package com.mercado.intrumentos_item_list.services;

import com.mercado.intrumentos_item_list.dto.InstrumentoDto;
import com.mercado.intrumentos_item_list.dto.InstrumentoSimpleDto;
import com.mercado.intrumentos_item_list.entities.Instrumento;
import com.mercado.intrumentos_item_list.mapper.InstrumentoMapper;
import com.mercado.intrumentos_item_list.repositories.CategoriaRepository;
import com.mercado.intrumentos_item_list.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class InstrumentoService {

    @Autowired
    private InstrumentoRepository instrumentoRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private InstrumentoMapper instrumentoMapper;

    public List<Instrumento> getAllInstrumentos() {
        return instrumentoRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public InstrumentoDto getInstrumentoById(Long id) {

        return instrumentoMapper.toInstrumentoDto(instrumentoRepository.findById(id).orElse(null));
    }

    public List<Instrumento> getInstrumentoByCategoriaId(Long idCategoria) {
        return instrumentoRepository.findByCategoriaId(idCategoria);

    }

    public List<Instrumento> searchInstrumento(String search) {
        return instrumentoRepository.findByAnything(search);
    }

    public InstrumentoDto saveInstrumentos(InstrumentoSimpleDto instrumentoSimpleDto) {

        Instrumento instrumento = instrumentoMapper.simpleDtoToInstrumento(instrumentoSimpleDto);

        return instrumentoMapper.toInstrumentoDto(instrumentoRepository.save(instrumento));
    }

    public InstrumentoDto updateInstrumento(Long id, InstrumentoDto instrumentoDto) {

        Instrumento instrumento = instrumentoMapper.dtoToInstrumento(instrumentoDto);

        Optional<Instrumento> existingInstrumento = instrumentoRepository.findById(id);
        if (existingInstrumento.isPresent()) {

            Instrumento newInstrumento = existingInstrumento.get();
            newInstrumento.setInstrumento(instrumento.getInstrumento());
            newInstrumento.setMarca(instrumento.getMarca());
            newInstrumento.setModelo(instrumento.getModelo());
            newInstrumento.setImagen(instrumento.getImagen());
            newInstrumento.setPrecio(instrumento.getPrecio());
            newInstrumento.setCostoEnvio(instrumento.getCostoEnvio());
            newInstrumento.setCantidadVendida(instrumento.getCantidadVendida());
            newInstrumento.setDescripcion(instrumento.getDescripcion());

            newInstrumento.setCategoria(instrumento.getCategoria());

            return instrumentoMapper.toInstrumentoDto(instrumentoRepository.save(newInstrumento));

        } else {
            throw new RuntimeException("Instrumento no encontrado con el ID: " + instrumento.getId());
        }
    }

    public Boolean sellInstrumento(Long id, Integer cantidad) {
        Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(id);
        if (instrumentoOptional.isPresent()) {
            Instrumento instrumento = instrumentoOptional.get();
            instrumento.setCantidadVendida(instrumento.getCantidadVendida() + cantidad);
            instrumentoRepository.save(instrumento);
            return true;
        } else {
            throw new RuntimeException("Instrumento no encontrado con el ID: " + id);
        }
    }

    public Boolean deleteInstrumento(Long id) throws Exception{
        try {
            Optional<Instrumento> autorOptional = instrumentoRepository.findById(id);
            if (autorOptional.isPresent()) {
                instrumentoRepository.deleteById(id);
                return true;
            } else {
                throw new Exception("No se encontró instrumento con id: " + id);
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


}
