import clienteAxios from "./axios";

const tokenAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token; //se para por header el token para todas las operaciones
  } else {
    delete clienteAxios.defaults.headers.common["x-auth-token"]; //eliminamos el token del header
  }
};

export default tokenAuth;
