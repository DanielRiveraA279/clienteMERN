import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  //extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //en caso de que el password o usuario no exista
  useEffect(() => {
    autenticado && props.history.push("/proyectos"); //si esta autenciado ya, lo redireccionamos a proyectos
    mensaje && mostrarAlerta(mensaje.msg, mensaje.categoria); //si hay mensaje que muestre el mensaje
     //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]); //actualizar nuevamente las propiedades


  //state para iniciar sesiòn
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  //state para extraer usuario
  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value, //aqui extraemos nombre y value de un componente input
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validar campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    //pasarlo al action
    iniciarSesion({email, password});
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesiòn</h1>
        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sessiòn"
            />
          </div>
        </form>

        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Crear Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
