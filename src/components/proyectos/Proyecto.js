import React, {useContext} from "react";
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const {proyectoActual} = proyectosContext;

  //obtener la funion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {obtenerTareas} = tareasContext;

  //funcion para agregar proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id); //fijar proyecto actual
    obtenerTareas(id); //fijar id del proyecto a la tarea para luego filtrar por proyecto
  }

  return (
    <li>
      <button 
        type="button" 
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
