export interface IInstrumento {
    id:number,
    instrumento: string,
    marca:string,
    modelo:string,
    imagen:string,
    precio: string,
    costoEnvio: string,
    cantidadVendida: number,
    descripcion: string,
    idCategoria: number
}

export interface INuevoInstrumento {
    instrumento: string,
    marca:string,
    modelo:string,
    imagen:string,
    precio: string,
    costoEnvio: string,
    cantidadVendida: number,
    descripcion: string,
    idCategoria: number
}