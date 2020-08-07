// Importo los types de types
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

// Función principal - Crear un nuevo producto
export function crearNuevoProductoAction(producto) {
  return (dispatch) => {
    //dispatch llama a las otras funciones
    dispatch(nuevoProducto()); // llamamos a la función nuevoProducto
    // Insertar en la API
    clienteAxios
      .post("/libros", producto)
      .then((respuesta) => {
        console.log(respuesta);
        // si la inserción es correcta, se ejecuta esto, si no, error
        dispatch(agregarProductoExito(producto));
      })
      .catch((error) => {
        dispatch(agregarProductoError());
      });
  };
}

export const nuevoProducto = () => ({
  type: AGREGAR_PRODUCTO,
});

export const agregarProductoExito = (producto) => ({
  // pasamos producto para que lo agregue (payload) que cambia el state
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

export const agregarProductoError = error =>({
    type: AGREGAR_PRODUCTO_ERROR,
    // payload: error //paso el error pero en reducer no existe
})
