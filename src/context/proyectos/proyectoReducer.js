//importamoss types
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };
    case OBTENER_PROYECTO:
      return {
        ...state,
        proyectos: action.payload,
      };
    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false, //para ocultar de nuevo el formulario
        errorFormulario: false, //cuando agregar nuevov proyecto reseteamos a false el valor para mensaje de error
      };
    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorFormulario: true,
      };
    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto: state.proyectos.filter((item) => item._id === action.payload), //filtra el registro que se esta comparando y se asigna el registro en proyecto
      };
    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(
          (item) => item._id !== action.payload
        ), //filtra el registro menos el del id que le ingresamos ese lo saca por ser distinto como esta en la condicion
        proyecto: null, //singular
      };
    case PROYECTO_ERROR:
      return {
         ...state,
         mensaje: action.payload
      }
    default:
      return state;
  }
};
