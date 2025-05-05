import { Link } from "react-router-dom"
import styles from "./Topbar.module.css"
import { MenuDesplegable } from "../MenuDesplegable/MenuDesplegable"
import { categorias } from "../../../types/categorias"

export const Topbar = () => {

    return (
        <div className={styles.containerNavbar}>
            <div className={styles.navbar}>
                <div className={styles.navbarBrand}>Mercado Instrumentos</div>
                <ul className={styles.navbarLinks}>
                    <li><Link to='/home'>Inicio</Link></li>
                    <li><MenuDesplegable label="Categorías" items={categorias} /></li>
                    <li><Link to='/search'>Búsqueda</Link></li>
                    <li><Link to='/add'>Agregar</Link></li>
                </ul>
            </div>
            <div className={styles.cartContainer}>
                <Link to='/cart' >
                    <span className="material-symbols-outlined">
                        shopping_cart
                    </span>
                    Carrito
                </Link>
            </div>
        </div>
    )
}
