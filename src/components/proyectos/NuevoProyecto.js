import React, { Fragment, useState, useContext } from "react";
//importamos context
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //con esto ya tenemos acceso a todo el funcionamiento de context
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext; //destructuramos formulario que tiene context

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto, //copia del objeto(state) proyecto y sus propiedades
      [e.target.name]: e.target.value, //valor a remplazar o nuevo
    });
  };

  //cuando envia un proyecto el usuario
  const onSubmitProyecto = (e) => {
    e.preventDefault(); //prevenir accion por defecto
    //validar el proyecto
    if (nombre === "") {
      //ejecutamos funcion mostrarError() que pone a false
      mostrarError();
      return;
    }

    //agregar al state
    agregarProyecto(proyecto);

    //reiniciar el form ponienod vacio o seteando a vacio al hook state
    guardarProyecto({
      nombre: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={mostrarFormulario}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {
        errorFormulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null
      }
    </Fragment>
  );
};

export default NuevoProyecto;
