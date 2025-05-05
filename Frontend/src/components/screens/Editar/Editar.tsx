import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINTS } from "../../../apiConfig";
import { useEffect, useState } from "react";
import { IInstrumento } from "../../../types/IInstrumento";
import { FormEditarInstrumento } from "../../ui/FormEditarInstrumento/FormEditarInstrumento";
import styles from './Editar.module.css'

export const Editar = () => {

    const [item, setItem] = useState<IInstrumento>();
    const { id } = useParams();

    const getInstrumentoById = () => {
        try {
            fetch(`${API_ENDPOINTS.instrumentos}/${id}`)
                .then(response => response.json())
                .then(data => setItem(data));
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        getInstrumentoById();
    }, []);

    const navigate = useNavigate();
    const handleVolver = () => {
        navigate(-1);
    };

    if (!item) {
        return <p>Cargando ...</p>
    }

    return (
        <div className={styles.editarContainer}>
            <div className={styles.formEditarContainer}>
                <FormEditarInstrumento instrumento={item} />
            </div>
            <button className={styles.buttonVolver} onClick={handleVolver}>Volver</button>
        </div>
    )
}
