import { useEffect, useState } from "react";
import { IInstrumento } from "../../../types/IInstrumento";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detalle.module.css";
import Button from "react-bootstrap/Button";
import { API_ENDPOINTS } from "../../../apiConfig";
import Swal from "sweetalert2";
import { useCart } from "../../../hooks/useCart";


export const Detalle = () => {

    const [item, setItem] = useState<IInstrumento | null>(null);
    const { id } = useParams();
    const { addToCart } = useCart();

    const getInstrumentoById = async () => {
        await fetch(`${API_ENDPOINTS.instrumentos}/${id}`)
            .then(response => response.json())
            .then(data => setItem(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        getInstrumentoById();
    }, []);

    const navigate = useNavigate();
    const handleVolver = () => {
        navigate(-1);
    };
    const handleEditar = () => {
        navigate(`/detalle/edit/${id}`);
    };
    const handleEliminar = () => {
        Swal.fire({
            title: `¿Estás seguro que quieres eliminar ${item?.instrumento}?`,
            text: "No puedes revertir esta decisión. ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${API_ENDPOINTS.instrumentos}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        Swal.fire({
                            title: "Error",
                            text: `Hubo un error eliminando el instrumento ${item?.instrumento}. `,
                            icon: "error"
                        });
                        throw new Error('Network response was not ok');
                    }
                    Swal.fire({
                        title: "Eliminado",
                        text: "El instrumento fue eliminado. ",
                        icon: "success"
                    });
                    navigate(-1);

                } catch (error) {
                    console.error('Error eliminando el artículo: ', error)
                }
            }
        });
    }

    const handleAgregar = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Agregado al carrito",
            showConfirmButton: true,
            confirmButtonText: "Ir al carrito",
            showCancelButton: true,
            cancelButtonText: "Seguir comprando",
            timer: 5000
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/cart');
            }
        })
        addToCart({ instrumento: item as IInstrumento, cantidad: 1 })
    }


    return (
        <div>
            {item &&
                <div className={styles.parentContainer}>

                    <div className={styles.containerProducto}>

                        <div className={styles.topBarProducto}>
                            <button className={styles.buttonTopBar} onClick={handleVolver}>Volver</button>
                            <div>
                                <button className={styles.buttonTopBarEliminar} onClick={handleEliminar}>Eliminar</button>
                                <button className={styles.buttonTopBar} onClick={handleEditar}>Editar</button>
                            </div>
                        </div>

                        <div className={styles.botProducto}>

                            <div className={styles.containerProductoPrincipal}>

                                <div className={styles.productoImagenContainer}>
                                    <img className={styles.productoImagen} src={`/assets/img/${item.imagen}`} />
                                </div>

                                <div className={styles.productoDescripcion}>
                                    <div>Descripción: </div>
                                    <div>{item.descripcion}</div>
                                </div>

                            </div>
                            <div className={styles.containerProductoDetalle}>

                                <ul>
                                    <li>{item.cantidadVendida} vendidos</li>
                                    <li className={styles.productoTitle}><b>{item.instrumento}</b></li>
                                    <li className={styles.productoPrecio}>US${item.precio}</li>

                                    <div>
                                        <li>Marca: {item.marca}</li>
                                        <li>Modelo: {item.modelo}</li>
                                    </div>

                                    <li>
                                        {item.costoEnvio == 'G' || item.costoEnvio === '0'
                                            ? <div className={styles.envioGratis}><img src={`/assets/img/camion.png`} /> Envío Gratis a todo el país</div>
                                            : <div className={styles.envioNormal}>Costo Envio US${item.costoEnvio}</div>
                                        }
                                    </li>
                                </ul>
                                <div className={styles.buttonContainer}>
                                    <Button variant="outline-primary" onClick={handleAgregar} >Agregar al carrito</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
