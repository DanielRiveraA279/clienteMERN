import React, { Fragment, useContext, useEffect } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext; //trae las tareas de un proyecto seleccionado por id
  
  //validar si no hay proyectos selecciondos
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  //destructuracion del array (proyecto)
  const [proyectoActual] = proyecto; //extraemos la primera posicion y ya podemos acceder por ej. proyectoActual.nombre

  //elimina un proyecto
  const onCLickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="Listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay Tarea</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map((item) => (
              <CSSTransition key={item.id} timeout={200} classNames="tarea">
                <Tarea tarea={item} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => onCLickEliminar()}
      >
        Eliminar Proyecto
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
