import { useEffect, useState } from "react";
import { useCart } from "../../../hooks/useCart"
import styles from "./Cart.module.css"
import { CartItem } from "../../ui/CartItem/CartItem";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { sellInstrumento } from "../../../api/ApiGateway";

export const Cart = () => {

    const { cart, emptyCart } = useCart();
    const [total, setTotal] = useState(0);
    const [envio, setEnvio] = useState(0);

    useEffect(() => {
        let total = 0;
        let envio = 0;
        cart.map((item) => {
            total += item.cantidad * parseFloat(item.instrumento.precio);
            envio += item.cantidad * parseFloat(item.instrumento.costoEnvio);
        });
        setTotal(total);
        if (total > 1000) {
            setEnvio(0);
        } else {
            setEnvio(envio);

        }
    }, [cart])

    const handlePagar = () => {
        Swal.fire({
            icon: 'success',
            title: '¡Gracias por tu compra!',
            text: 'Serás redireccionado a la plataforma de pago.',
        });
        try {
            cart.map((item) => {
                sellInstrumento(item.instrumento.id, item.cantidad);
            });
            emptyCart();
        } catch (err) {
            console.error("Ha ocurrido un error en la compra: ", err);
        }
    }

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cart}>
                <h2 className={styles.cartTitle}>Carrito</h2>
                {cart.length === 0 ? (
                    <div className={styles.emptyCart}><p>Tu carrito está vacío. </p></div>
                ) : (
                    <div>
                        <ul className={styles.cartItemList}>
                            {cart.map((item) => (
                                <CartItem key={item.instrumento.id} item={item} />
                            ))}
                        </ul>
                        <div className={styles.cartTotalContainer}>
                            <div className={styles.cartSubtotalLabel}>{<span>SUBTOTAL US${total}</span>}</div>
                            <div >
                                {envio > 0 ? (
                                    <div className={styles.cartEnvioLabel}>
                                        <div>Envío US${envio}</div>
                                        <div style={{ fontSize: "0.8rem" }}>Completá US${1000 - total} con más productos para tener envío gratis. </div>
                                    </div>
                                ) : (
                                    <div className={styles.cartEnvioGratisLabel}><img src={`/assets/img/camion.png`} />Envío Gratis</div>
                                )}
                            </div>
                            <div className={styles.cartTotalLabel}>{<span>TOTAL CON ENVÍO US${total + envio}</span>}</div>
                        </div>
                        <div className={styles.cartButtonsContainer}>
                            {cart.length > 0 && <Button onClick={emptyCart}>VACIAR CARRITO</Button>}<Button onClick={handlePagar}>PAGAR</Button>
                        </div>
                    </div>

                )}

            </div>
        </div>
    )
}
