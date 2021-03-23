import React, { useReducer } from "react";
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertaReducer, initialState);

  //funciones
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });
  };

  //limpiar el alerta en 5 segundos
  setTimeout(() => {
    dispatch({
      type: OCULTAR_ALERTA,
    });
  }, 5000);

  return (
    <alertaContext.Provider
      value={{ alerta: state.alerta, mostrarAlerta: mostrarAlerta }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
