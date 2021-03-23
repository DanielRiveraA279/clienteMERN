import {
  TAREAS_PROYECTO,
  AGREGAR_TAREAS,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types/index";

 //eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasproyecto: action.payload,
      };
    case AGREGAR_TAREAS:
      return {
        ...state,
        tareasproyecto: [action.payload, ...state.tareasproyecto],
        errortarea: false, //reseteamos a false para que no aparesca el error de validacion
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.filter(
          (item) => item._id !== action.payload
        ),
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.map((item) =>
          item._id === action.payload._id
            ? action.payload
            : state.tareasproyecto
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: action.payload,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaseleccionada: null,
      };
    default:
      return state;
  }
};
