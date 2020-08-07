// Importo los types de types
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
} from "../types";

// Función principal - Crear un nuevo producto
export function crearNuevoProductoAction(producto) {
    return (dispatch) => { //dispatch llama a las otras funciones
        dispatch(nuevoProducto()) // llamamos a la función nuevoProducto
        dispatch(agregarProductoExito(producto))
    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
})

export const agregarProductoExito = producto => ({
    // pasamos producto para que lo agregue (payload) que cambia el state
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})