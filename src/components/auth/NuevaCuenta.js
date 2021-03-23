import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //En caso que ya exista el ususario que se intenta registrar nuevamente
  useEffect(() => {
    autenticado && props.history.push("/proyectos"); //si esta autenciado ya, lo redireccionamos a proyectos
    mensaje && mostrarAlerta(mensaje.msg, mensaje.categoria); //si hay mensaje que muestre el mensaje
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]); //actualizar nuevamente las propiedades

  //state para iniciar sesiòn
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
    nombre: "",
    confirmar: "",
  });

  //state para extraer usuario
  const { email, password, nombre, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value, //aqui extraemos nombre y value de un componente input
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validar campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return; //para que no ejecute la siguiente linea
    }

    //2 passwords sean iguales
    if (password !== confirmar) {
      mostrarAlerta("Los password no son iguales", "alerta-error");
      return; //para que no ejecute la siguiente linea
    }

    //pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear Cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="Tu Nombre"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Tu Email"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Tu Password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              value={confirmar}
              placeholder="Repite tu Password"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Iniciar Sesiòn
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
