import { useParams } from "react-router-dom"
import { ListInstrumentos } from "../../ui/ListInstrumentos/ListInstrumentos";
import { API_ENDPOINTS } from "../../../apiConfig";
import { getCategoriaId } from "../../../types/categorias";
import { useEffect, useState } from "react";
import { IInstrumento } from "../../../types/IInstrumento";

export const Categorias = () => {

    const [data, setData] = useState<IInstrumento[]>([]);
    const { cat = '' } = useParams();

    useEffect(() => {
        const handleGetCategoria = async () => {
            await fetch(`${API_ENDPOINTS.categorias}/${getCategoriaId(cat)}`)
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error(error));
        };
        handleGetCategoria();
    }, [cat]);




    return (
        <div>
            <ListInstrumentos items={data} message="No hay instrumentos en esta categoría" />
        </div>
    )
}
