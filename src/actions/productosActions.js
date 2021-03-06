// Importo los types de types
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  DESCARGA_PRODUCTOS_INICIADA,
  DESCARGA_PRODUCTOS_EXITOSA,
  DESCARGA_PRODUCTOS_ERROR,
  PRODUCTO_ELIMINAR_OBTENER,
  PRODUCTO_ELIMINAR_EXITO,
  PRODUCTO_ELIMINAR_ERROR,
  PRODUCTO_EDITAR_OBTENER,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
  PRODUCTO_EDITADO_COMENZAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types";

import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

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
  error: null,
});

export const agregarProductoExito = (producto) => ({
  // pasamos producto para que lo agregue (payload) que cambia el state
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

export const agregarProductoError = (error) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  // payload: error //paso el error pero en reducer no existe
});

// Función principal
// obtener listado de productos (consultar API)
export function obtenerProductosAction() {
  return (dispatch) => {
    // despacha llamada a función
    dispatch(obtenerProductosComienzo());
    clienteAxios
      .get("/libros")
      .then((respuesta) => {
        // console.log(respuesta);
        dispatch(descargaProductosExitosa(respuesta.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(descargaProductosError());
      });
  };
}

// función que llama a la action
export const obtenerProductosComienzo = () => ({
  type: DESCARGA_PRODUCTOS_INICIADA,
});

//función resultado exitoso
export const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITOSA,
  payload: productos,
});

// función para resultado erróneo
export const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
});

// Función que elimina un producto concreto
export function productoEliminarAction(id) {
  // despacha para llamar a las otras funciones
  return (dispatch) => {
    dispatch(productoEliminarObtener());
    // Eliminar en la API
    clienteAxios
      .delete(`/libros/${id}`)
      .then((respuesta) => {
        // Si lo borra de la API lo borra del state
        dispatch(productoEliminarExito(id));
      })
      .catch((error) => {
        dispatch(productoEliminarError());
      });
  };
}

// Esta función inicia la cadena de acciones
export const productoEliminarObtener = () => ({
  type: PRODUCTO_ELIMINAR_OBTENER,
});

export const productoEliminarExito = (id) => ({
  type: PRODUCTO_ELIMINAR_EXITO,
  payload: id,
});

export const productoEliminarError = () => ({
  type: PRODUCTO_ELIMINAR_ERROR,
});

// Obtener el Producto a Editar
// función principal que despacha el inicio de la acción
export function productoEditarAction(id) {
  return (dispatch) => {
    // despachamos la acción de obtención declarada más abajo
    dispatch(productoObtenerAction());
    //obtener producto de la API con axios
    clienteAxios
      .get(`/libros/${id}`)
      .then((respuesta) => {
        console.log(respuesta.data);
        dispatch(productoEditarExito(respuesta.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(productoEditarObtenerError());
      });
  };
}

// Función para obtener el producto
export const productoObtenerAction = () => ({
  type: PRODUCTO_EDITAR_OBTENER,
});

// Función para manejar resultado ok
export const productoEditarExito = (producto) => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto,
});

export const productoEditarObtenerError = () => ({
  type: PRODUCTO_EDITAR_ERROR,
});

// Modifica un producto en la API y state
export function productoEditadoAction(producto) {
  return (dispatch) => {
    dispatch(productoEditadoComenzar());

    // Consultar la API
    clienteAxios
      .put(`/libros/${producto.id}`, producto)
      .then((respuesta) => {
        // console.log(respuesta);
        // llamo a la función de éxito + producto(payload)
        dispatch(productoEditadoExito(respuesta.data));
        Swal.fire('Almacenado', 'Producto actualizado!!', 'success')
      })
      .catch((error) => {
        // console.log(error);
        dispatch(productoEditadoError())
      });
  };
}

export const productoEditadoComenzar = () => ({
  type: PRODUCTO_EDITADO_COMENZAR,
});

// gestión de ok de editando, le paso payload como producto
export const productoEditadoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

// gestión de error de editando
export const productoEditadoError = () => ({
  type: PRODUCTO_EDITADO_ERROR
});