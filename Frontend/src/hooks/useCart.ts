import { useContext } from "react";
import { CartContext } from "../context/CartContext";


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
    }
    return context;

}