package com.mercado.intrumentos_item_list.dto;

import lombok.Data;

@Data
public class InstrumentoSimpleDto {

    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private Double precio;
    private String costoEnvio;
    private Integer cantidadVendida;
    private String descripcion;

    private Long idCategoria;

}
