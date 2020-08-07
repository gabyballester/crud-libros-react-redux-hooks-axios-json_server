import {
  VALIDAR_FORMULARIO,
  VALIDAR_FORMULARIO_EXITO,
  VALIDAR_FORMULARIO_ERROR,
} from "../types";

// state inicial
const initialState = {
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VALIDAR_FORMULARIO:
      return {
        ...state, // copia del state
        error: null,
      };
    case VALIDAR_FORMULARIO_EXITO:
      return {
        ...state, // copia del state
        error: null,
      };
    case VALIDAR_FORMULARIO_ERROR:
      return {
        ...state, // copia del state
        error: true,
      };
    default:
      return state;
  }
}
