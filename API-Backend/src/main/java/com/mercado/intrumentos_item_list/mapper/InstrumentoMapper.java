package com.mercado.intrumentos_item_list.mapper;


import com.mercado.intrumentos_item_list.dto.InstrumentoDto;
import com.mercado.intrumentos_item_list.dto.InstrumentoSimpleDto;
import com.mercado.intrumentos_item_list.entities.Instrumento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface InstrumentoMapper {

    @Mapping(source = "idCategoria", target = "categoria.id")
    Instrumento dtoToInstrumento(InstrumentoDto instrumentoDto);

    @Mapping(source = "idCategoria", target = "categoria.id")
    @Mapping(target = "id", ignore = true)
    Instrumento simpleDtoToInstrumento(InstrumentoSimpleDto instrumentoSimpleDto);

    @Mapping(source = "categoria.id", target= "idCategoria")
    InstrumentoDto toInstrumentoDto(Instrumento instrumento);

    @Mapping(source = "categoria.id", target= "idCategoria")
    InstrumentoSimpleDto toInstrumentoSimpleDto(Instrumento instrumento);


}
