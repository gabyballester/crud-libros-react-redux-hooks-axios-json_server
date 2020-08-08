// Importo los types de types
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  DESCARGA_PRODUCTOS_INICIADA,
  DESCARGA_PRODUCTOS_EXITOSA,
  DESCARGA_PRODUCTOS_ERROR
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
  error: null
});

export const agregarProductoExito = (producto) => ({
  // pasamos producto para que lo agregue (payload) que cambia el state
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

export const agregarProductoError = error => ({
  type: AGREGAR_PRODUCTO_ERROR,
  // payload: error //paso el error pero en reducer no existe
})

// Función principal
// obtener listado de productos (consultar API)
export function obtenerProductosAction() {
  return (dispatch) => { // despacha llamada a función
    dispatch(obtenerProductosComienzo());
    clienteAxios.get('/libros')
      .then(respuesta => {
        // console.log(respuesta);
        dispatch(descargaProductosExitosa(respuesta.data))
      })
      .catch(error => {
        console.log(error);
        dispatch(descargaProductosError())
      })
  }
}

// función que llama a la action
export const obtenerProductosComienzo = () => ({
  type: DESCARGA_PRODUCTOS_INICIADA
})

//función resultado exitoso
export const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITOSA,
  payload: productos
})

// función para resultado erróneo
export const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR
})