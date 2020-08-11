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

// cada reducer tiene su propio state
const initialState = {
  productos: [], //tendremos un array de productos
  error: false, // tendremos un registro de error
  loading: false, // spinner para decir cargando
  producto: {},
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

    case DESCARGA_PRODUCTOS_INICIADA:
      return {
        ...state, // copia del state
        loading: true,
        producto: {},
      };

    case DESCARGA_PRODUCTOS_EXITOSA:
      // introduzco en el array de state el payload dentro de productos
      return {
        ...state,
        productos: action.payload,
        loading: false,
        error: false,
        producto: {},
      };

    case DESCARGA_PRODUCTOS_ERROR:
      return {
        ...state,
        productos: [],
        error: true,
        loading: false,
        producto: {},
      };

    case PRODUCTO_ELIMINAR_OBTENER:
      return {
        ...state, // copia del state
        error: null,
      };

    case PRODUCTO_ELIMINAR_EXITO:
      // introduzco en el array de state el payload dentro de productos
      return {
        ...state,
        error: null,
        // en caso de exito, eliminamos de state el id indicado
        productos: state.productos.filter(
          (producto) => producto.id !== action.payload
        ),
      };

    case PRODUCTO_ELIMINAR_ERROR:
      return { ...state, error: true };

    case PRODUCTO_EDITAR_OBTENER:
      // devuelve el estado y dispara la función principal
      return { ...state, error: null };

    case PRODUCTO_EDITAR_EXITO:
      return {
        ...state,
        error: null,
        producto: action.payload,
      };

    case PRODUCTO_EDITAR_ERROR:
      return {
        ...state,
        error: true,
      };

    case PRODUCTO_EDITADO_COMENZAR:
      return { ...state, error: null };

    case PRODUCTO_EDITADO_EXITO:
      return {
        ...state,
        error: null,
        // mapeo productos y verifico que el producto y payload tengan el mismo id
        productos: state.productos.map((producto) =>
          //ternario; si se cumple => añade el editado, si no => lo deja igual.
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        ),
      };

      case PRODUCTO_EDITADO_ERROR:
        return {
          ...state,
          error: true,
        };

    default:
      return state;
  }
}
