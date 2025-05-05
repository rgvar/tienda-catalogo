import { useCart } from "../../../hooks/useCart";
import { ICartItem } from "../../../context/CartContext";
import styles from './CartItem.module.css'


export const CartItem = ({ item }: { item: ICartItem }) => {

    const { addToCart, removeFromCart, subtractFromCart } = useCart();

    const handleAdd = () => {
        addToCart(item);
    };
    const handleSubtract = () => {
        subtractFromCart(item);
    };
    const handleRemove = () => {
        removeFromCart(item.instrumento.id)
    };

    return (
        <li className={styles.cartItemContainer}>
            <div className={styles.cartItemImage}>
                <img className={styles.instrumentoImg} src={`/assets/img/${item.instrumento.imagen}`} />
            </div>
            <div>
                <ul className={styles.cartItemDetalles}>
                    <li className={styles.cartItemNombre}>{item.instrumento.instrumento}</li>
                    <li>US${item.instrumento.precio}</li>
                    <li>Envío {parseFloat(item.instrumento.costoEnvio) > 0 ? `US$${item.instrumento.costoEnvio}` : "Gratis"}</li>
                    <li>{item.cantidad} {item.cantidad > 1 ? "artículos" : "artículo"}</li>
                    <li><b>SUBTOTAL </b>US${`${item.cantidad * parseFloat(item.instrumento.precio)} `}</li>
                    <li className={styles.cartItemButtons}>
                        <div>
                            {item.cantidad > 1
                                ? <button onClick={handleSubtract}><span className="material-symbols-outlined">remove</span></button>
                                : <button onClick={handleRemove}><span className="material-symbols-outlined">close</span></button>
                            }

                            <button className={styles.itemButtonAdd} onClick={handleAdd}><span className="material-symbols-outlined">add</span></button>
                            <button onClick={handleRemove}><span className="material-symbols-outlined">delete</span></button>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    )
}
