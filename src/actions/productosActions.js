// Importo los types de types
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
  } from "../types";

  // Función principal - Crear un nuevo producto
  export function crearNuevoProductoAction(producto){
      return(dispatch)=>{ //dispatch llama a las otras funciones
        dispatch(nuevoProducto()) // llamamos a la función nuevoProducto
      }
  }

  export const nuevoProducto = () => ({
      type: AGREGAR_PRODUCTO
  })