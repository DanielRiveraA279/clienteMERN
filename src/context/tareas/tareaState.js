import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

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
import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false, //si el user comete un error pasa a ser true
    tareaseleccionada: null,
  };

  //crear las funciones

  //obtener las tareas de un proyecto (id)
  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios("/api/tareas", {
        params: { proyecto },
      });

      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Agregar una tarea
  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea); //pasamos la tarea que vamos a agregar
      dispatch({
        type: AGREGAR_TAREAS,
        payload: resultado,
      });
    } catch (error) {}
  };

  //Valida y muestra un error
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

   //cambia el estado de cada tarea completoado o imcompleto
   const actualizarTarea = async(tarea) => {
    try {

      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea) //le mando la tarea para que la reescriba
      console.log(resultado.data.tarea);

      dispatch({
        type: ESTADO_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //eliminar tarea por id
  const eliminarTarea = async(id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error)
    }
  };

  //extreaer tarea para edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //elimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  //creamos dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
