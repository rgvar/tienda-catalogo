import { createContext, useEffect, useState } from "react";
import { IInstrumento } from "../types/IInstrumento";

export interface ICartItem {
    instrumento: IInstrumento;
    cantidad: number;
}

interface CartContextType {
    cart: ICartItem[];
    addToCart: (item: ICartItem) => void;
    removeFromCart: (id: number) => void;
    emptyCart: () => void;
    subtractFromCart: (item: ICartItem) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = (props: { children: React.ReactNode }) => {

    const [cart, setCart] = useState<ICartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        try {
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            localStorage.removeItem('cart');
            return [];
        }
    });


    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(cart));
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [cart]);

    const addToCart = (item: ICartItem) => {
        setCart((prev) => {
            const existingProduct = prev.find((p) => p.instrumento.id === item.instrumento.id);
            if (existingProduct) {
                return prev.map((p) =>
                    p.instrumento.id === item.instrumento.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }
            return [...prev, item];
        });
    };

    const subtractFromCart = (item: ICartItem) => {
        setCart((prev) => {
            const existingProduct = prev.find((p) => p.instrumento.id === item.instrumento.id);
            if (existingProduct) {
                return prev.map((p) =>
                    p.instrumento.id === item.instrumento.id ? { ...p, cantidad: p.cantidad - 1 } : p
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.instrumento.id !== id));
    };

    const emptyCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart, subtractFromCart }}>
            {props.children}
        </CartContext.Provider>
    );


};