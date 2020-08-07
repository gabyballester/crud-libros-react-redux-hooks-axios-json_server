// Importo los types de types
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

// cada reducer tiene su propio state
const initialState = {
  productos: [], //tendremos un array de productos
  error: false, // tendremos un registro de error
  loading: false, // spinner para decir cargando
};

// definimos el reducer
// le pasamos el estado inicial y las acciones
export default function (state = initialState, action) {
  /** creamos un switch para rastrear el type y disparar 
        una acción u otra*/
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state, // copia del state
      };

    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state, // copia del state
        /** enviamos array de productos y la acción a ejcutar
         * con su payload (objeto con nombre y precio) que
         * insertará dicho producto en el array pasado */

        productos: [...state.productos, action.payload],
      };

    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state, // copia del state
        error: true,
      };

    default:
      return state;
  }
}
