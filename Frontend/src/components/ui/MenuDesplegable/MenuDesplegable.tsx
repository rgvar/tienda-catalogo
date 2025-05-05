import { Categoria } from '../../../types/categorias';
import styles from './MenuDesplegable.module.css'
import { Link } from "react-router-dom";


interface MenuDesplegableProps {
    label: string;
    items: Categoria[];
}

export const MenuDesplegable = ({ label, items }: MenuDesplegableProps) => {

    return (
        <div className={styles.menuDesplegableContainer}>
            <a>{label}</a>
            <ul className={styles.listaContainer}>
                {items.map((item, index) => (
                    <Link key={index} to={item.link}><li>{item.label}</li></Link>
                ))}
            </ul>
        </div>
    )
}
