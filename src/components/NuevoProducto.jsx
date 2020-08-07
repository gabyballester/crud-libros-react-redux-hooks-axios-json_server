import React, { useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { crearNuevoProductoAction } from "../actions/productosActions";
import {
  validarFormularioAction,
  validacionExito,
  validacionError,
} from "../actions/validacionActions";

const NuevoProducto = ({ history }) => {
  //state inicial vacío
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState("");

  // Crear nuevo producto
  const dispatch = useDispatch(); // llamamos al dispatch
  // le pasamos producto y despachamos la acción de crear
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));
  // agrego validar formulario
  const validarFormulario = () => dispatch(validarFormularioAction());
  // agrego validación exito
  const exitoValidacion = () => dispatch(validacionExito());
  // agrego validación error
  const errorValidacion = () => dispatch(validacionError());

  //Obtener los datos del state
  const error = useSelector((state) => state.error.error);

  // Agregar nuevo producto
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    validarFormulario();
    // Validar formulario
    if (nombre.trim() === "" || precio.trim() === "") {
      errorValidacion(); // si validación es errónea
      return;
    }
    exitoValidacion(); // Si pasa la validación
    // hacemos aquí la llamada a agregar Producto
    agregarProducto({ nombre, precio });

    // redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold ">
              Agregar Nuevo Libro
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Libro"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Libro"
                  value={precio}
                  onChange={(e) => guardarPrecio(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {error ? (
              <div className="fontt-weight-bold alert alert-danger text-center mt-4">
                Todos los campos son obligatorios
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
