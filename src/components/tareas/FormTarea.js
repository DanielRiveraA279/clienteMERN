import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  //effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]); //ejecuta de vuelta el componente

  //state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });
  //extraer nombre
  const { nombre } = tarea;

  //validar si no hay proyectos selecciondos
  if (!proyecto) return null;

  //destructuracion del array (proyecto)
  const [proyectoActual] = proyecto; //extraemos la primera posicion y ya podemos acceder por ej. proyectoActual.nombre

  //Leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validar
    if (nombre.trim() === "") {
      validarTarea(); //ejecuta funcion que cambia a true en el state errortarea
      return; //y ya no retorna nada
    }

    //si es edicion o si es nueva tarea
    if (tareaseleccionada === null) {
      //agregar nueva tarea al state
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {

      //actualiza tarea existente
      actualizarTarea(tarea);
      //elimina tarea seleccionada del state
      limpiarTarea();
    }

    //obtener las tareas actuales y la agregada
    obtenerTareas(proyectoActual._id);

     //reiniciar el form
     guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
