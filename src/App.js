import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import ProyectState from "./context/proyectos/proyectoState"; //context 1 - proyectos
import TareaState from "./context/tareas/tareaState"; //context 2 - tareas
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";

//AuthState es para la autenticacion y guarda el token

//revisar si tenemos token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token); //pasamos el token que obtenemos del localstorage
}

function App() {
  const history = createBrowserHistory(); //utilizamos rutas
  console.log(process.env.REACT_APP_BACKEND_URL); //para utilizar el history y navegar entre pantallas tambien con el history.push('ruta')
  return (
    <ProyectState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router history={history}>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                  <RutaPrivada exact path="/proyectos" component={Proyectos} />
                </Switch>
              </BrowserRouter>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectState>
  );
}

export default App;
