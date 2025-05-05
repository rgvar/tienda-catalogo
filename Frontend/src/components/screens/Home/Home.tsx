import { useEffect, useState } from "react"
import { ListInstrumentos } from "../../ui/ListInstrumentos/ListInstrumentos"
import { IInstrumento } from "../../../types/IInstrumento";
import { API_ENDPOINTS } from "../../../apiConfig";
import styles from './Home.module.css'
import { useAuth } from "../../../context/AuthContext";


export const Home = () => {

    const {isAuthenticated} = useAuth();
    const [data, setData] = useState<IInstrumento[]>([]);

    useEffect(() => {
        console.log(isAuthenticated)
        fetch(API_ENDPOINTS.instrumentos)
            .then(result => result.json())
            .then(data => setData(data))
            .catch((error) => console.error("Ha ocurrido un error en el fetch: ", error));
    },[])


    return (
        <div>
            <div className={styles.homeTitle}>Todos los instrumentos</div>
            <ListInstrumentos items={data} message="No hay artículos para mostrar" />
        </div>
    )
}
