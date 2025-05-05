import { Route, Routes } from "react-router-dom"
import { Home } from "../components/screens/Home/Home"
import { Detalle } from "../components/screens/Detalle/Detalle"
import { Agregar } from "../components/screens/Agregar/Agregar"
import { Search } from "../components/screens/Search/Search"
import { Editar } from "../components/screens/Editar/Editar"
import { Categorias } from "../components/screens/Categorias/Categorias"
import { CartProvider } from "../context/CartContext"
import { Cart } from "../components/screens/Cart/Cart"
import { Login } from "../components/screens/Login/Login"
import { AuthProvider } from "../context/AuthContext"
import { ProtectedRoute } from "./ProtectedRoute"
import { Auth0Provider } from "@auth0/auth0-react"


export const AppRouter = () => {


    return (
        <>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/detalle/:id" element={<Detalle />} />
                        <Route path="/search/:search?" element={<Search />} />
                        <Route path="/categoria/:cat" element={<Categorias />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/add" element={<ProtectedRoute><Agregar /></ProtectedRoute>} />
                        <Route path="/detalle/edit/:id" element={<Editar />} />
                    </Routes>
                </CartProvider>
            </AuthProvider>

        </>
    )

}