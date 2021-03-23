import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token"; //esto es para pasarle el token por header

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"), //almacenamos en el localstorage como state inicial
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //las funciones
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      console.log(respuesta.data); //el array trae [0]token, [1]mensaje de exito

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data[0], //capturo el token data[0] -- (posicion del objeto token)
      });
      //Obtener usuario
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg, //accedo a la respuesta del backend
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    //leemos el token del localstorage
    const token = localStorage.getItem("token");

    if (token) {
      console.log("mi token: " + token);
      tokenAuth(token); //lo pasamos a la funcion asi envie por header el token
    }
    try {
      //despues de enviar el token, consulto a la api la data del usuario
      const respuesta = await clienteAxios.get("/api/auth");
      console.log(respuesta);

      //enviamos al reducer la data del usuario autenticado
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log("Error Token: " + error.response); //para mostrar el error del backend
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //Cuando el usuario inicia session
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data[0], //pasamos el token
      });
      //Obtener usuario autenticado
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg, //accedo a la respuesta del backend
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  //cierra la sesion del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
